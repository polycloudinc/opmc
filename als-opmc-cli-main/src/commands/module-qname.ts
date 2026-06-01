import { resolveFileUpward } from '../utils/discovery';
import { readYaml } from '../utils/yaml';
import * as path from 'path';

export async function moduleQname(argv: { style: string }): Promise<void> {
  const cwd = process.cwd();

  const modulePath = resolveFileUpward(
    cwd,
    'module.yaml',
    'product.yaml',
    'Error: no module.yaml found — product.yaml encountered first'
  );
  if (!modulePath) {
    console.error('Error: could not resolve module.yaml in scope');
    process.exit(1);
  }

  const moduleDir = path.dirname(modulePath);

  const productPath = resolveFileUpward(
    moduleDir,
    'product.yaml',
    'org.yaml',
    'Error: no product.yaml found in scope of this org'
  );
  if (!productPath) {
    console.error('Error: could not resolve product.yaml in scope');
    process.exit(1);
  }

  const productDir = path.dirname(productPath);

  const orgPath = resolveFileUpward(productDir, 'org.yaml', '', '');
  if (!orgPath) {
    console.error('Error: could not resolve org.yaml in scope');
    process.exit(1);
  }

  const module = readYaml(modulePath);
  const product = readYaml(productPath);
  const org = readYaml(orgPath);

  if (!module?.symbol || !product?.symbol || !org?.symbol) {
    console.error('Error: missing symbol in one or more OPMC files');
    process.exit(1);
  }

  const sep = argv.style === 'dotted' ? '.' : '-';
  console.log(`${org.symbol}${sep}${product.symbol}${sep}${module.symbol}`);
}
