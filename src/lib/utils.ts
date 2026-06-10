import { clsx, type ClassValue } from 'clsx'

/**
 * Join conditional class names into a single string.
 *
 * A thin wrapper around {@link https://github.com/lukeed/clsx | clsx} that accepts
 * any mix of strings, arrays, and objects (where truthy values are kept) and returns
 * the merged `className`. Falsy entries are dropped, which makes it convenient for
 * toggling Tailwind classes inline.
 *
 * @param inputs - Class-name fragments: strings, arrays, or `{ class: boolean }` maps.
 * @returns The combined, space-separated class string.
 *
 * @example
 * ```ts
 * cn('px-2', isActive && 'bg-indigo-500', { 'opacity-50': disabled })
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
