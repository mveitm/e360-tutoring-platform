import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

interface LocalEnvLoadResult {
  localEnvFilePresent: boolean
  loadedKeyCount: number
}

const ENV_KEY_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/

function candidateEnvPaths(): string[] {
  return [
    resolve(process.cwd(), '.env'),
    resolve(process.cwd(), 'nextjs_space', '.env'),
    resolve(process.cwd(), '..', '.env'),
  ]
}

function parseEnvLine(line: string): [string, string] | null {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) return null

  const assignment = trimmed.startsWith('export ')
    ? trimmed.slice('export '.length).trim()
    : trimmed
  const equalsIndex = assignment.indexOf('=')
  if (equalsIndex <= 0) return null

  const key = assignment.slice(0, equalsIndex).trim()
  if (!ENV_KEY_PATTERN.test(key)) return null

  let value = assignment.slice(equalsIndex + 1).trim()
  const firstCharacter = value[0]
  if (
    (firstCharacter === '"' || firstCharacter === "'") &&
    value.endsWith(firstCharacter)
  ) {
    value = value.slice(1, -1)
  }

  return [key, value]
}

export function loadLocalEnvPrivate(): LocalEnvLoadResult {
  const envPath = candidateEnvPaths().find((candidate) => existsSync(candidate))
  if (!envPath) return { localEnvFilePresent: false, loadedKeyCount: 0 }

  const content = readFileSync(envPath, 'utf8')
  let loadedKeyCount = 0

  for (const line of content.split(/\r?\n/)) {
    const parsed = parseEnvLine(line)
    if (!parsed) continue

    const [key, value] = parsed
    if (process.env[key] === undefined) {
      process.env[key] = value
      loadedKeyCount += 1
    }
  }

  return { localEnvFilePresent: true, loadedKeyCount }
}
