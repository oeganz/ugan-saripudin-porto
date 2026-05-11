export function calculateReadingTime(content: string): number {
  // Strip HTML tags
  const text = content.replace(/<[^>]*>/g, '')
  const trimmed = text.trim()

  if (!trimmed) {
    return 0
  }

  // Count words
  const words = trimmed.split(/\s+/).length

  // Average reading speed: 200 words per minute
  const minutes = Math.ceil(words / 200)

  return minutes
}
