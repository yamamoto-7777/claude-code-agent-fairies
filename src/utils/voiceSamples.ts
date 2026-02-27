/**
 * Generate 3 voice sample paths from a base voiceSamplePath.
 *
 * @example
 * generateVoiceSamplePaths("/sound/hika-sample.mp3")
 * // => ["/sound/hika-sample.mp3", "/sound/hika-sample2.mp3", "/sound/hika-sample3.mp3"]
 */
export function generateVoiceSamplePaths(
  basePath: string | undefined
): string[] {
  if (!basePath) return []
  const match = basePath.match(/^(.+-sample)(\.mp3)$/)
  if (!match) return [basePath]
  const [, prefix, ext] = match
  return [basePath, `${prefix}2${ext}`, `${prefix}3${ext}`]
}
