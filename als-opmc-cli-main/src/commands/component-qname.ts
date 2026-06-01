import { resolveFileUpward } from '../utils/discovery';
import { readYaml } from '../utils/yaml';

export async function componentQname(argv: { style: string }): Promise<void> {
  const cwd = process.cwd();

  const componentPath = resolveFileUpward(
    cwd,
    'component.yaml',
    'module.yaml',
    'Error: no component.yaml found — module.yaml encountered first'
  );
  if (!componentPath) {
    console.error('Error: could not resolve component.yaml in scope');
    process.exit(1);
  }

  const componentDir = require('path').dirname(componentPath);

  const modulePath = resolveFileUpward(
    componentDir,
    'module.yaml',
    'product.yaml',
    'Error: no module.yaml found in scope of this product'
  );
  if (!modulePath) {
    console.error('Error: could not resolve module.yaml in scope');
    process.exit(1);
  }

  const moduleDir = require('path').dirname(modulePath);

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

  const productDir = require('path').dirname(productPath);

  const orgPath = resolveFileUpward(productDir, 'org.yaml', '', '');
  if (!orgPath) {
    console.error('Error: could not resolve org.yaml in scope');
    process.exit(1);
  }

  const component = readYaml(componentPath);
  const module = readYaml(modulePath);
  const product = readYaml(productPath);
  const org = readYaml(orgPath);

  if (!component?.symbol || !module?.symbol || !product?.symbol || !org?.symbol) {
    console.error('Error: missing symbol in one or more OPMC files');
    process.exit(1);
  }

  const sep = argv.style === 'dotted' ? '.' : '-';
  console.log(`${org.symbol}${sep}${product.symbol}${sep}${module.symbol}${sep}${component.symbol}`);
}
