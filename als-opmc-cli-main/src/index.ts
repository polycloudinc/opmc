#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { orgSet } from './commands/org-set';
import { productSet } from './commands/product-set';
import { moduleSet } from './commands/module-set';
import { componentSet } from './commands/component-set';
import { componentQname } from './commands/component-qname';
import { moduleQname } from './commands/module-qname';
import { productQname } from './commands/product-qname';

yargs(hideBin(process.argv))
  .scriptName('opmc')
  .command(
    'org',
    'Organization commands',
    (y) =>
      y.command(
        'set',
        'Set organization identity',
        (s) =>
          s
            .option('symbol', { type: 'string', describe: 'Short identifier for the organization' })
            .option('name', { type: 'string', describe: 'Human-readable name for the organization' }),
        async (argv) => {
          await orgSet({ symbol: argv.symbol as string, name: argv.name as string });
        }
      )
      .demandCommand(1, 'Please specify an org subcommand')
  )
  .command(
    'product',
    'Product commands',
    (y) =>
      y
        .command(
          'set',
          'Set product identity',
          (s) =>
            s
              .option('symbol', { type: 'string', describe: 'Short identifier for the product' })
              .option('name', { type: 'string', describe: 'Human-readable name for the product' }),
          async (argv) => {
            await productSet({ symbol: argv.symbol as string, name: argv.name as string });
          }
        )
        .command(
          'qname',
          'Emit the fully qualified name of the product in scope',
          (s) =>
            s.option('style', {
              type: 'string',
              describe: 'Output style',
              choices: ['dashed', 'dotted'],
              demandOption: true,
            }),
          async (argv) => {
            await productQname({ style: argv.style as string });
          }
        )
        .demandCommand(1, 'Please specify a product subcommand')
  )
  .command(
    'module',
    'Module commands',
    (y) =>
      y
        .command(
          'set',
          'Set module identity',
          (s) =>
            s
              .option('symbol', { type: 'string', describe: 'Short identifier for the module' })
              .option('name', { type: 'string', describe: 'Human-readable name for the module' }),
          async (argv) => {
            await moduleSet({ symbol: argv.symbol as string, name: argv.name as string });
          }
        )
        .command(
          'qname',
          'Emit the fully qualified name of the module in scope',
          (s) =>
            s.option('style', {
              type: 'string',
              describe: 'Output style',
              choices: ['dashed', 'dotted'],
              demandOption: true,
            }),
          async (argv) => {
            await moduleQname({ style: argv.style as string });
          }
        )
        .demandCommand(1, 'Please specify a module subcommand')
  )
  .command(
    'component',
    'Component commands',
    (y) =>
      y
        .command(
          'set',
          'Set component identity',
          (s) =>
            s
              .option('symbol', { type: 'string', describe: 'Short identifier for the component' })
              .option('name', { type: 'string', describe: 'Human-readable name for the component' }),
          async (argv) => {
            await componentSet({ symbol: argv.symbol as string, name: argv.name as string });
          }
        )
        .command(
          'qname',
          'Emit the fully qualified name of the component in scope',
          (s) =>
            s.option('style', {
              type: 'string',
              describe: 'Output style',
              choices: ['dashed', 'dotted'],
              demandOption: true,
            }),
          async (argv) => {
            await componentQname({ style: argv.style as string });
          }
        )
        .demandCommand(1, 'Please specify a component subcommand')
  )
  .demandCommand(1, 'Please specify a command')
  .strict()
  .help()
  .parse();
