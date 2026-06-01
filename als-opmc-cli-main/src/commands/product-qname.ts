import { resolveFileUpward } from '../utils/discovery';
import { readYaml } from '../utils/yaml';
import * as path from 'path';

export async function productQname(argv: { style: string }): Promise<void> {
  const cwd = process.cwd();

  const productPath = resolveFileUpward(
    cwd,
    'product.yaml',
    'org.yaml',
    'Error: no product.yaml found — org.yaml encountered first'
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

  const product = readYaml(productPath);
  const org = readYaml(orgPath);

  if (!product?.symbol || !org?.symbol) {
    console.error('Error: missing symbol in one or more OPMC files');
    process.exit(1);
  }

  const sep = argv.style === 'dotted' ? '.' : '-';
  console.log(`${org.symbol}${sep}${product.symbol}`);
}
