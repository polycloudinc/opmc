import * as fs from 'fs';
import * as path from 'path';

export function readYaml(filePath: string): Record<string, string> | null {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf-8');
  const result: Record<string, string> = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf(':');
    if (idx === -1) continue;
    const key = trimmed.substring(0, idx).trim();
    const value = trimmed.substring(idx + 1).trim();
    result[key] = value;
  }
  return result;
}

export function writeYaml(filePath: string, data: Record<string, string>): void {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(data)) {
    lines.push(`${key}: ${value}`);
  }
  fs.writeFileSync(filePath, lines.join('\n') + '\n', 'utf-8');
}

export function updateYaml(filePath: string, updates: Record<string, string>): void {
  const existing = readYaml(filePath) || {};
  const merged = { ...existing, ...updates };
  writeYaml(filePath, merged);
}
