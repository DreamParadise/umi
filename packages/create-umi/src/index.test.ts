import { rimraf } from '@umijs/utils';
import { existsSync } from 'fs';
import { join } from 'path';
import runGenerator from './index';
import { prompts } from '@umijs/utils';

const fixtures = join(__dirname, '..', 'fixtures');

let oldCwd = process.cwd();

beforeEach(() => {
  oldCwd = process.cwd();
});

afterEach(() => {
  process.chdir(oldCwd);
});

test('generate app', async () => {
  const cwd = join(fixtures, 'app');
  await runGenerator({
    cwd,
    args: {
      _: [],
      $0: '',
      default: true,
    },
  });
  expect(existsSync(join(cwd, 'src', 'pages', 'index.tsx'))).toEqual(true);
  rimraf.sync(cwd);
});

test('generate plugin', async () => {
  const cwd = join(fixtures, 'plugin');
  await runGenerator({
    cwd,
    args: {
      plugin: true,
      _: [],
      $0: '',
      default: true,
    },
  });
  expect(existsSync(join(cwd, 'src', 'index.ts'))).toEqual(true);
  rimraf.sync(cwd);
});

test('generate max', async () => {
  prompts.inject(['max', 'pnpm', 'https://registry.npmjs.org/']);
  const cwd = join(fixtures, 'max');
  await runGenerator({
    cwd,
    args: {
      _: [],
      $0: '',
    },
  });

  expect(existsSync(join(cwd, 'src/pages/Home/index.tsx'))).toEqual(true);
  rimraf.sync(cwd);
});
