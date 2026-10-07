import { readFile, writeFile } from 'node:fs/promises';

import { defineConfig } from 'tsup';

const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  /^@radix-ui\//,
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
  'tailwindcss',
  'tailwindcss/plugin',
  'tailwindcss/plugin.js',
  'node:fs',
  'node:path',
  'node:url',
  'tailwindcss-animate',
];

export default defineConfig([
  {
    entry: { index: 'src/index.ts' },
    format: ['esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: false,
    treeshake: true,
    external,
    outDir: 'dist',
    // esbuild는 배너의 "use client"를 버려서, 번들이 나온 뒤에 직접 붙인다.
    async onSuccess() {
      const file = new URL('./dist/index.js', import.meta.url);
      const content = await readFile(file, 'utf8');
      if (!content.startsWith('"use client"')) {
        await writeFile(file, `"use client";\n${content}`);
      }
    },
  },
  {
    entry: { preset: 'src/preset.ts' },
    format: ['esm'],
    dts: true,
    sourcemap: true,
    clean: false,
    splitting: false,
    external,
    outDir: 'dist',
    platform: 'node',
  },
]);
