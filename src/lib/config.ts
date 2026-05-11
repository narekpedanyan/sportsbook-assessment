function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) throw new Error(`Missing environment variable: ${key}`)
  return value
}

export const config = {
  apiUrl: requireEnv('NEXT_PUBLIC_API_URL'),
} as const
