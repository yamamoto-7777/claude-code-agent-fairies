/**
 * Prepend the Next.js basePath to a static asset path.
 *
 * `next/image` applies basePath automatically, but raw `<image href>` (SVG)
 * and `new Audio()` do not.  Use this helper for those cases.
 *
 * @example
 * getAssetPath("/images/hika.png")
 * // dev  -> "/images/hika.png"
 * // prod -> "/claude-code-agent-fairies/images/hika.png"
 */
export function getAssetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
  // Avoid double-prefixing if the path already starts with basePath
  if (base && path.startsWith(base)) return path
  return `${base}${path}`
}
