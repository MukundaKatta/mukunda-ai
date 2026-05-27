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
LLMS_FULL_FILE = ROOT / "public" / "llms-full.txt"
PACKAGES_HTML_FILE = ROOT / "public" / "packages.html"
PROJECTS_TSX_FILE = ROOT / "src" / "components" / "sections" / "Projects.tsx"

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


def fetch_npm_full() -> list[dict]:
    """Full npm listing with name + description + URL for every published package."""
    data = _http_json(
        f"https://registry.npmjs.org/-/v1/search?text=maintainer:{NPM_USER}&size=250"
    )
    if not data:
        return []
    out = []
    for o in data.get("objects", []):
        p = o.get("package", {})
        name = p.get("name") or ""
        if not name:
            continue
        out.append({
            "name": name,
            "description": (p.get("description") or "").strip(),
            "url": f"https://www.npmjs.com/package/{name}",
        })
    return sorted(out, key=lambda x: x["name"].lower())


def fetch_pypi_full() -> list[dict]:
    """Probe the hardcoded PYPI_PACKAGES list; for each that resolves, fetch the
    description from the JSON API."""
    out = []
    for name in PYPI_PACKAGES:
        try:
            with urlopen(
                f"https://pypi.org/pypi/{name}/json", timeout=15
            ) as r:  # noqa: S310
                meta = json.loads(r.read().decode("utf-8"))
            info = meta.get("info") or {}
            out.append({
                "name": name,
                "description": (info.get("summary") or "").strip(),
                "url": f"https://pypi.org/project/{name}/",
            })
        except (HTTPError, URLError):
            # Skip on transient failure; we'd rather omit one than poison the dump.
            continue
    return sorted(out, key=lambda x: x["name"].lower())


def fetch_crates_full() -> list[dict]:
    user = _http_json(f"https://crates.io/api/v1/users/{GH_USER}") or {}
    user_id = (user.get("user") or {}).get("id")
    if not user_id:
        return []
    out: list[dict] = []
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
        for c in items:
            name = c.get("name")
            if not name:
                continue
            out.append({
                "name": name,
                "description": (c.get("description") or "").strip(),
                "url": f"https://crates.io/crates/{name}",
            })
        if len(items) < 100:
            break
        page += 1
    return sorted(out, key=lambda x: x["name"].lower())


def fetch_mcp_registry_full() -> list[dict]:
    """Full MCP Registry listing for io.github.MukundaKatta/* servers."""
    prefix = f"io.github.{GH_USER}".lower()
    seen: dict[str, dict] = {}
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
            srv = srv or entry
            name = (srv.get("name") or "").lower()
            if not name.startswith(prefix):
                continue
            seen[name] = {
                "name": srv.get("name") or name,
                "description": (srv.get("description") or "").strip(),
                "url": srv.get("websiteUrl") or f"https://registry.modelcontextprotocol.io/v0/servers?search={srv.get('name')}",
            }
        cursor = (data.get("metadata") or {}).get("next_cursor") or ""
        if not cursor:
            break
    return sorted(seen.values(), key=lambda x: x["name"].lower())


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


def _html_escape(s: str) -> str:
    return (s.replace("&", "&amp;").replace("<", "&lt;")
             .replace(">", "&gt;").replace('"', "&quot;"))


def render_llms_full(npm: list[dict], pypi: list[dict], crates: list[dict],
                     mcp: list[dict]) -> str:
    """Plaintext dump of every package — name + description + URL — grouped by
    ecosystem. Designed for AI crawlers that pull /llms-full.txt as the
    authoritative complete inventory."""
    lines = [
        "# Mukunda Rao Katta — complete package inventory",
        "",
        "> Every open-source package authored by Mukunda Rao Katta across npm, PyPI,",
        "> crates.io, and the official Model Context Protocol Registry. Auto-refreshed",
        "> from registry APIs every 3 days. See /llms.txt for the curated summary.",
        "",
        f"Totals: {len(npm)} npm + {len(pypi)} PyPI + {len(crates)} crates.io + {len(mcp)} MCP Registry servers",
        "",
    ]
    for title, items in [
        (f"## npm — @mukundakatta ({len(npm)} packages)", npm),
        (f"## PyPI ({len(pypi)} packages)", pypi),
        (f"## crates.io — MukundaKatta ({len(crates)} crates)", crates),
        (f"## MCP Registry — io.github.MukundaKatta ({len(mcp)} servers)", mcp),
    ]:
        lines.extend(["", title, ""])
        if not items:
            lines.append("- _(none discovered this run)_")
            continue
        for item in items:
            desc = item["description"] or "(no description)"
            lines.append(f"- [{item['name']}]({item['url']}): {desc}")
    return "\n".join(lines) + "\n"


def render_packages_html(npm: list[dict], pypi: list[dict], crates: list[dict],
                          mcp: list[dict]) -> str:
    """Static HTML mirror of the package inventory — fully crawlable without JS.
    Lightweight inline styles, no scripts, no fonts. Linked from llms.txt and
    the portfolio's main JSON-LD."""
    total = len(npm) + len(pypi) + len(crates) + len(mcp)

    def section(title: str, items: list[dict], registry_name: str) -> str:
        rows = []
        for item in items:
            name = _html_escape(item["name"])
            desc = _html_escape(item["description"] or "")
            url = _html_escape(item["url"])
            rows.append(
                f'<li><a href="{url}">{name}</a>'
                + (f' <span class="d">{desc}</span>' if desc else "")
                + "</li>"
            )
        return (
            f'<section><h2>{_html_escape(title)} <small>({len(items)} on {registry_name})</small></h2>'
            f'<ul>{"".join(rows) or "<li><em>(none discovered this run)</em></li>"}</ul></section>'
        )

    body_sections = "".join([
        section("npm packages", npm, "registry.npmjs.org"),
        section("PyPI packages", pypi, "pypi.org"),
        section("crates.io crates", crates, "crates.io"),
        section("MCP Registry servers", mcp, "registry.modelcontextprotocol.io"),
    ])

    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Mukunda Rao Katta — complete package inventory ({total} packages)</title>
<link rel="canonical" href="https://mukundakatta.dev/packages.html" />
<meta name="description" content="Static, crawler-readable inventory of every open-source package authored by Mukunda Rao Katta across npm, PyPI, crates.io, and the official MCP Registry. {total} packages total. Auto-refreshed from registry APIs." />
<meta name="robots" content="index,follow" />
<meta property="og:title" content="Mukunda Rao Katta — Open-Source Package Inventory" />
<meta property="og:description" content="{total} packages: {len(npm)} on npm, {len(pypi)} on PyPI, {len(crates)} on crates.io, {len(mcp)} MCP Registry servers." />
<meta property="og:url" content="https://mukundakatta.dev/packages.html" />
<style>
body{{font:16px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:880px;margin:2rem auto;padding:0 1rem;color:#222;background:#fff}}
h1{{font-size:1.75rem;margin:0 0 .25rem}}
h2{{font-size:1.15rem;margin:2rem 0 .5rem;border-bottom:1px solid #ccc;padding-bottom:.25rem}}
small{{color:#777;font-weight:normal;font-size:.85rem}}
ul{{padding-left:1.25rem;margin:0}}
li{{margin:.2rem 0}}
a{{color:#0a58ca;text-decoration:none}}
a:hover{{text-decoration:underline}}
.d{{color:#555}}
.meta{{color:#666;font-size:.9rem}}
nav a{{margin-right:.75rem}}
</style>
</head>
<body>
<h1>Mukunda Rao Katta — package inventory</h1>
<p class="meta">{total} open-source packages across {len(npm)} npm + {len(pypi)} PyPI + {len(crates)} crates.io + {len(mcp)} MCP Registry servers. Auto-refreshed every 3 days from registry APIs.</p>
<nav><a href="/">Home</a><a href="/llms.txt">llms.txt</a><a href="/llms-full.txt">llms-full.txt</a><a href="https://github.com/MukundaKatta">GitHub</a></nav>
{body_sections}
<hr/>
<p class="meta">Source: <a href="https://github.com/MukundaKatta/mukunda-ai">github.com/MukundaKatta/mukunda-ai</a> · Generated by scripts/refresh_seo_stats.py</p>
</body>
</html>
"""


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
        # src/components/sections/Projects.tsx — CTA button counts.
        # data-* attrs are stable anchors that don't render visually.
        (
            PROJECTS_TSX_FILE,
            r'data-package-total>(\d+)<',
            f'data-package-total>{stats["npm"] + stats["pypi"] + stats["crates"] + stats["mcp_registry"]}<',
        ),
        (
            PROJECTS_TSX_FILE,
            r'data-npm-count>(\d+)<',
            f'data-npm-count>{stats["npm"]}<',
        ),
        (
            PROJECTS_TSX_FILE,
            r'data-pypi-count>(\d+)<',
            f'data-pypi-count>{stats["pypi"]}<',
        ),
        (
            PROJECTS_TSX_FILE,
            r'data-crates-count>(\d+)<',
            f'data-crates-count>{stats["crates"]}<',
        ),
        (
            PROJECTS_TSX_FILE,
            r'data-mcp-count>(\d+)<',
            f'data-mcp-count>{stats["mcp_registry"]}<',
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
    print("Fetching full package inventories...")
    npm = fetch_npm_full()
    pypi = fetch_pypi_full()
    crates = fetch_crates_full()
    mcp = fetch_mcp_registry_full()
    print(f"  npm: {len(npm)}  pypi: {len(pypi)}  crates: {len(crates)}  mcp: {len(mcp)}")

    print("Fetching aggregate stats...")
    stats = {
        "npm": len(npm),
        "pypi": len(pypi),
        "crates": len(crates),
        "mcp_registry": len(mcp),
        "hf_spaces": fetch_hf_count("spaces"),
        "hf_datasets": fetch_hf_count("datasets"),
        "hf_models": fetch_hf_count("models"),
        "mcp_stack": fetch_repo_directory_count(f"{GH_USER}/mcp-stack", "packages"),
        **{f"ext_{k}": v for k, v in fetch_ext_pr_stats().items()},
    }
    print(json.dumps(stats, indent=2))

    # Write the static crawler-readable inventories
    LLMS_FULL_FILE.write_text(render_llms_full(npm, pypi, crates, mcp), encoding="utf-8")
    print(f"wrote {LLMS_FULL_FILE.relative_to(ROOT)}")
    PACKAGES_HTML_FILE.write_text(render_packages_html(npm, pypi, crates, mcp), encoding="utf-8")
    print(f"wrote {PACKAGES_HTML_FILE.relative_to(ROOT)}")

    summary = apply_rules(build_rules(stats))
    print(json.dumps(summary, indent=2))

    if summary["rules_missed"]:
        sys.exit(
            f"{summary['rules_missed']} pattern(s) did not match — README phrasing"
            " may have changed; update refresh_seo_stats.py rules."
        )


if __name__ == "__main__":
    main()
