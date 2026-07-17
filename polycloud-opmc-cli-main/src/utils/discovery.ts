import * as fs from 'fs';
import * as path from 'path';

export function resolveFileUpward(
  startDir: string,
  targetFile: string,
  errorIfFile: string,
  errorIfMessage: string
): string | null {
  let currentDir = path.resolve(startDir);
  const root = path.parse(currentDir).root;

  while (true) {
    const targetPath = path.join(currentDir, targetFile);
    if (fs.existsSync(targetPath)) {
      return targetPath;
    }

    if (errorIfFile) {
      const errorPath = path.join(currentDir, errorIfFile);
      if (fs.existsSync(errorPath)) {
        console.error(errorIfMessage);
        return null;
      }
    }

    if (currentDir === root) break;

    const parent = path.dirname(currentDir);
    try {
      fs.accessSync(parent, fs.constants.R_OK);
    } catch {
      return null;
    }
    if (parent === currentDir) break;
    currentDir = parent;
  }

  return null;
}

export function findFileUpward(
  startDir: string,
  filename: string,
  stopFilenames: string[] = []
): string | null {
  let currentDir = path.resolve(startDir);
  const root = path.parse(currentDir).root;

  while (true) {
    const filePath = path.join(currentDir, filename);
    if (fs.existsSync(filePath)) {
      return filePath;
    }

    if (stopFilenames.length > 0) {
      for (const stopFile of stopFilenames) {
        if (fs.existsSync(path.join(currentDir, stopFile))) {
          return null;
        }
      }
    }

    if (currentDir === root) break;

    const parent = path.dirname(currentDir);
    try {
      fs.accessSync(parent, fs.constants.R_OK);
    } catch {
      return null;
    }
    if (parent === currentDir) break;
    currentDir = parent;
  }

  return null;
}

export function findOrgFile(startDir: string): string | null {
  return findFileUpward(startDir, 'org.yaml');
}

export function findProductFile(startDir: string): string | null {
  return findFileUpward(startDir, 'product.yaml', ['org.yaml']);
}

export function findModuleFile(startDir: string): string | null {
  return findFileUpward(startDir, 'module.yaml', ['product.yaml']);
}

export function findComponentFile(startDir: string): string | null {
  return findFileUpward(startDir, 'component.yaml', ['module.yaml']);
}
