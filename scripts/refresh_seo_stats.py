"""Refresh the SEO/AI-discoverability numbers in index.html and public/llms.txt.

The portfolio site embeds counts in places where HTML comment markers can't be
used (meta description attribute, JSON string bodies inside JSON-LD), so this
script uses anchored regex replacements on well-known surrounding phrases
instead. Patterns are intentionally narrow to avoid false-positive matches.

Run via:
    GH_TOKEN=$(gh auth token) python3 scripts/refresh_seo_stats.py

Or via the scheduled GitHub Actions workflow at .github/workflows/refresh-seo-stats.yml.
"""
from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
INDEX_FILE = ROOT / "index.html"
LLMS_FILE = ROOT / "public" / "llms.txt"

GH_USER = "MukundaKatta"
NPM_USER = "mukundakatta"
HF_USER = "mukunda1729"
MCP_REGISTRY = "https://registry.modelcontextprotocol.io/v0/servers"

GH_TOKEN = os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN")
if not GH_TOKEN:
    sys.exit("GH_TOKEN or GITHUB_TOKEN required")


# PyPI count needs an explicit list because pypi.org/user/<u>/ sits behind a
# JS challenge. Kept in sync with the same list in the profile-readme repo.
PYPI_PACKAGES = [
    "claude-skill-check", "mcp-config-check", "claude-hooks-check",
    "claude-commands-check", "llm-usage-report", "codex-skill-kit",
    "ai-eval-forge", "agent-run-diff", "mk-agentkit",
    "agentfit-py", "agentguard-firewall", "agentsnap-py", "agentvet-py",
    "agentcast-py", "partial-json-stream",
    "prompt-injection-shield-py", "llm-output-sanitizer-py",
    "system-prompt-leak-scan",
    "embedding-dedupe", "rag-quality-kit", "rag-staleness-auditor-py",
    "llm-cost-guard-py", "semantic-cache-key", "eval-flake-detector",
    "hallucination-risk-meter", "citation-integrity-check",
    "vector-poison-score",
    "agent-loop-breaker-py", "agent-regression-lens-py",
    "agent-trajectory-replay-py", "context-forge-py",
    "context-window-packer-py", "context-drift-detector-py",
    "tool-call-contracts-py", "tool-permission-gate-py",
    "tool-result-taint-py", "pii-sentry-py",
    "designlint-py", "skillint-py", "mcpcheck-py", "kavach-py",
    "eval-dataset-smith-py", "model-router-policy-py",
    "model-fallback-planner-py", "llm-trace-sampler-py",
    "llm-response-schema-lite-py",
    "ai-supply-chain-manifest-py", "consent-redaction-log-py",
    "retrieval-acl-filter-py", "prompt-token-trim-py",
    "prompt-version-diff-py", "jailbreak-corpus-mini-py",
    "openai-responses-testkit",
]


def _http_json(url: str, *, github: bool = False) -> object | None:
    headers = {"User-Agent": "mukundakatta-portfolio-refresh"}
    if github:
        headers["Authorization"] = f"bearer {GH_TOKEN}"
        headers["Accept"] = "application/vnd.github+json"
    try:
        with urlopen(Request(url, headers=headers), timeout=30) as r:  # noqa: S310
            return json.loads(r.read().decode("utf-8"))
    except (HTTPError, URLError, TimeoutError):
        return None


def fetch_npm_count() -> int:
    data = _http_json(
        f"https://registry.npmjs.org/-/v1/search?text=maintainer:{NPM_USER}&size=250"
    )
    if not data:
        return 0
    return len(data.get("objects", []))


def fetch_pypi_count() -> int:
    """Count PyPI packages that resolve in PYPI_PACKAGES — same logic as the
    profile-readme refresh script for consistency."""
    found = 0
    for name in PYPI_PACKAGES:
        try:
            with urlopen(
                f"https://pypi.org/pypi/{name}/json", timeout=15
            ) as r:  # noqa: S310
                r.read()
            found += 1
        except HTTPError as err:
            if err.code != 404:
                # Treat transient errors as 'present' to avoid undercount.
                found += 1
        except URLError:
            pass
    return found


def fetch_crates_count() -> int:
    user = _http_json(f"https://crates.io/api/v1/users/{GH_USER}") or {}
    user_id = (user.get("user") or {}).get("id")
    if not user_id:
        return 0
    total = 0
    page = 1
    while True:
        data = _http_json(
            f"https://crates.io/api/v1/crates?user_id={user_id}&per_page=100&page={page}"
        )
        if not data:
            break
        items = data.get("crates", [])
        if not items:
            break
        total += len(items)
        if len(items) < 100:
            break
        page += 1
    return total


def fetch_mcp_registry_count() -> int:
    prefix = f"io.github.{GH_USER}".lower()
    seen: set[str] = set()
    cursor = ""
    for _ in range(20):
        url = f"{MCP_REGISTRY}?search={GH_USER}&limit=100"
        if cursor:
            url += f"&cursor={cursor}"
        data = _http_json(url)
        if not data:
            break
        for entry in data.get("servers", []):
            srv = entry.get("server") if isinstance(entry, dict) else None
            name = ((srv or entry).get("name") or "").lower()
            if name.startswith(prefix):
                seen.add(name)
        cursor = (data.get("metadata") or {}).get("next_cursor") or ""
        if not cursor:
            break
    return len(seen)


def fetch_hf_count(kind: str) -> int:
    data = _http_json(f"https://huggingface.co/api/{kind}?author={HF_USER}&limit=500")
    return len(data) if isinstance(data, list) else 0


def fetch_ext_pr_stats() -> dict[str, int]:
    def issue_count(q: str) -> int:
        d = _http_json(
            "https://api.github.com/search/issues?per_page=1&q=" + q.replace(" ", "+"),
            github=True,
        ) or {}
        return d.get("total_count", 0)

    base = f"is:pr author:{GH_USER} -user:{GH_USER}"
    merged = issue_count(f"{base} is:merged")

    # Distinct external repos with merged PRs (cap at 1000 results via REST API)
    seen: set[str] = set()
    for page in range(1, 11):
        d = _http_json(
            f"https://api.github.com/search/issues?per_page=100&page={page}"
            f"&q={(base + ' is:merged').replace(' ', '+')}",
            github=True,
        ) or {}
        items = d.get("items", [])
        if not items:
            break
        for it in items:
            if (u := it.get("repository_url")):
                seen.add(u)
        if len(items) < 100:
            break
    return {"merged": merged, "merged_repos": len(seen)}


def fetch_repo_directory_count(repo: str, path: str) -> int:
    data = _http_json(
        f"https://api.github.com/repos/{repo}/contents/{path}", github=True
    )
    if not isinstance(data, list):
        return 0
    return sum(1 for e in data if e.get("type") in {"dir", "file"})


# Each rule is (file_path, pattern, replacement_template).
# Pattern must contain exactly one capture group around the digit(s) to replace.
# Replacement_template uses {} for the new value, escapes literal braces with {{}}.
def build_rules(stats: dict[str, int]) -> list[tuple[Path, str, str]]:
    return [
        # index.html — meta description
        (
            INDEX_FILE,
            r"across (\d+) npm packages",
            f"across {stats['npm']} npm packages",
        ),
        (
            INDEX_FILE,
            r"(\d+) PyPI projects",
            f"{stats['pypi']} PyPI projects",
        ),
        (
            INDEX_FILE,
            r"(\d+) crates\.io crates",
            f"{stats['crates']} crates.io crates",
        ),
        (
            INDEX_FILE,
            r"and (\d+) MCP Registry servers",
            f"and {stats['mcp_registry']} MCP Registry servers",
        ),
        (
            INDEX_FILE,
            r"(\d+)\+ merged upstream PRs across (\d+)\+ external repos",
            f"{stats['ext_merged']}+ merged upstream PRs across {stats['ext_merged_repos']}+ external repos",
        ),
        # index.html — JSON-LD mcp-stack project description
        (
            INDEX_FILE,
            r'"description": "(\d+) MCP servers in the official Model Context Protocol Registry',
            f'"description": "{stats["mcp_stack"]} MCP servers in the official Model Context Protocol Registry',
        ),
        # public/llms.txt
        (
            LLMS_FILE,
            r"\): (\d+) published packages \(",
            f"): {stats['npm']} published packages (",
        ),
        (
            LLMS_FILE,
            r"\): (\d+) published Python packages",
            f"): {stats['pypi']} published Python packages",
        ),
        (
            LLMS_FILE,
            r"\): (\d+) published Rust crates",
            f"): {stats['crates']} published Rust crates",
        ),
        (
            LLMS_FILE,
            r"\): (\d+) servers under `io\.github\.MukundaKatta",
            f"): {stats['mcp_registry']} servers under `io.github.MukundaKatta",
        ),
        (
            LLMS_FILE,
            r"\): (\d+) Spaces, (\d+) Datasets, (\d+) Model",
            f"): {stats['hf_spaces']} Spaces, {stats['hf_datasets']} Datasets, {stats['hf_models']} Model",
        ),
        (
            LLMS_FILE,
            r"\): (\d+)\+ merged across (\d+)\+ external repos",
            f"): {stats['ext_merged']}+ merged across {stats['ext_merged_repos']}+ external repos",
        ),
        (
            LLMS_FILE,
            r"mcp-stack\): (\d+) MCP servers \(",
            f"mcp-stack): {stats['mcp_stack']} MCP servers (",
        ),
    ]


def apply_rules(rules: list[tuple[Path, str, str]]) -> dict[str, int]:
    by_file: dict[Path, list[tuple[str, str]]] = {}
    for path, pat, repl in rules:
        by_file.setdefault(path, []).append((pat, repl))

    summary: dict[str, int] = {"matched": 0, "rules_applied": 0, "rules_missed": 0}
    for path, edits in by_file.items():
        text = path.read_text(encoding="utf-8")
        new_text = text
        for pat, repl in edits:
            updated, n = re.subn(pat, repl, new_text, count=1)
            if n:
                summary["rules_applied"] += 1
                summary["matched"] += n
                new_text = updated
            else:
                summary["rules_missed"] += 1
                print(f"warning: pattern not found in {path.name}: {pat!r}")
        if new_text != text:
            path.write_text(new_text, encoding="utf-8")
            print(f"wrote {path.relative_to(ROOT)}")

    return summary


def main() -> None:
    print("Fetching counts...")
    stats = {
        "npm": fetch_npm_count(),
        "pypi": fetch_pypi_count(),
        "crates": fetch_crates_count(),
        "mcp_registry": fetch_mcp_registry_count(),
        "hf_spaces": fetch_hf_count("spaces"),
        "hf_datasets": fetch_hf_count("datasets"),
        "hf_models": fetch_hf_count("models"),
        "mcp_stack": fetch_repo_directory_count(f"{GH_USER}/mcp-stack", "packages"),
        **{f"ext_{k}": v for k, v in fetch_ext_pr_stats().items()},
    }
    print(json.dumps(stats, indent=2))

    summary = apply_rules(build_rules(stats))
    print(json.dumps(summary, indent=2))

    if summary["rules_missed"]:
        sys.exit(
            f"{summary['rules_missed']} pattern(s) did not match — README phrasing"
            " may have changed; update refresh_seo_stats.py rules."
        )


if __name__ == "__main__":
    main()
