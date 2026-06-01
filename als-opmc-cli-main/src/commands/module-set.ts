import * as path from 'path';
import { findFileUpward, findProductFile } from '../utils/discovery';
import { readYaml, writeYaml } from '../utils/yaml';

export async function moduleSet(argv: { symbol?: string; name?: string }): Promise<void> {
  const cwd = process.cwd();

  if (!argv.symbol && !argv.name) {
    console.error('Error: at least one of --symbol or --name must be provided');
    process.exit(1);
  }

  const foundPath = findFileUpward(cwd, 'module.yaml', ['product.yaml']);

  if (foundPath) {
    const existing = readYaml(foundPath) || {};
    const merged: Record<string, string> = { ...existing };
    if (argv.symbol !== undefined) merged.symbol = argv.symbol;
    if (argv.name !== undefined) merged.name = argv.name;
    writeYaml(foundPath, merged);
  } else {
    if (!findProductFile(cwd)) {
      console.warn('Warning: no product.yaml found in ancestry');
    }
    const newPath = path.join(cwd, 'module.yaml');
    const data: Record<string, string> = {};
    if (argv.symbol !== undefined) data.symbol = argv.symbol;
    if (argv.name !== undefined) data.name = argv.name;
    writeYaml(newPath, data);
  }
}
