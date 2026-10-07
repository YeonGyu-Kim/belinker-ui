import type { Config } from 'tailwindcss';

import { belinkerPreset } from './src/preset';

const config = {
  presets: [belinkerPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './stories/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],
} satisfies Config;

export default config;
