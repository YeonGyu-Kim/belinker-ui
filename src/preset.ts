import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin.js';
import animate from 'tailwindcss-animate';

const presetDir = path.dirname(fileURLToPath(import.meta.url));

function componentClassNames() {
  const files = [
    'index.js',
    'components/Button.tsx',
    'components/Tooltip.tsx',
  ];
  const classes = new Set<string>();

  for (const file of files) {
    const fullPath = path.join(presetDir, file);
    if (!fs.existsSync(fullPath)) continue;

    const source = fs.readFileSync(fullPath, 'utf8');
    const literals = source.match(/(['"`])(?:\\.|(?!\1)[\s\S])*\1/g) ?? [];

    for (const literal of literals) {
      for (const token of literal.slice(1, -1).split(/\s+/)) {
        if (
          token.length > 80 ||
          !/^[!A-Za-z0-9_:[\]/.%=-]+$/.test(token)
        ) {
          continue;
        }

        const isUtility =
          token.includes('-') ||
          token.includes(':') ||
          token.includes('[') ||
          token.startsWith('!') ||
          token === 'border' ||
          token === 'rounded';

        if (isUtility) classes.add(token);
      }
    }
  }

  return [...classes];
}

/**
 * 앱 tailwind 설정에는 presets: [belinkerPreset] 만 추가한다.
 * 앱 content가 preset content를 덮어쓰므로, 컴포넌트 클래스는 safelist로 항상 만든다.
 * font-pretendard는 앱이 --font-pretendard 변수를 지정해야 한다.
 */
export const belinkerPreset = {
  darkMode: ['class'],
  safelist: componentClassNames(),
  theme: {
    extend: {
      screens: {
        underDesktop: { max: '1279px' },
        underLaptop: { max: '1023px' },
        underTablet: { max: '767px' },
        underMobile: { max: '479px' },
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      fontSize: {
        '3xl': ['2.5rem', { lineHeight: '140%' }],
        '2xl': ['1.5rem', { lineHeight: '140%' }],
        xl: ['1.25rem', { lineHeight: '140%' }],
        lg: ['1.125rem', { lineHeight: '160%' }],
        md: ['1rem', { lineHeight: '160%' }],
        sm: ['0.875rem', { lineHeight: '160%' }],
        base: ['0.875rem', { lineHeight: '160%' }],
      },
      colors: {
        naver: '#03C75A',
        kakao: '#FEE500',
        google: '#0000008A',
        landing: {
          blue: {
            tint: '#35508C',
            tint01: '#536EAA',
            tint02: '#8999BC',
            hover: '#112B66',
          },
          gray: {
            '01': '#F4F5FB',
            '05': '#8094B1',
            '06': '#677B9B',
          },
          skyblue: {
            DEFAULT: '#1E96D0',
          },
        },
        gray: {
          DEFAULT: '#64748B',
          light: '#B5BFCD',
          outline: '#E2E8F0',
          icon: '#9CA7BC',
          bg: '#F1F5F9',
          bglight: '#F9FAFC',
          hover: '#E2E8F0',
          extralight: '#C4CDDF',
        },
        blue: {
          DEFAULT: '#143379',
          select: '#3D74EE',
          light: '#F7F9FF',
          extralight: '#ECF1FD',
          hover: '#3565CE',
          mixed: '#7FA3F4',
          clicked: '#CEDDFF',
        },
        skyblue: {
          DEFAULT: '#5FBDFF',
          select: '#C4E1F8',
          cell: '#D6E4EF',
        },
        dark: {
          DEFAULT: '#020817',
        },
        navy: {
          DEFAULT: '#1B2D53',
          dark: '#111C33',
        },
        yellow: {
          DEFAULT: '#FBCD3B',
          search: '#FFF4D1',
          searchHidden: '#EEE1AF',
          extralight: '#FFFBEC',
          light: '#FFF3C8',
          dark: '#745C12',
        },
        purple: {
          DEFAULT: '#6B25D9',
          bg: '#F0E7FE',
          hover: '#E0D0FC',
        },
        green: {
          DEFAULT: '#4DC776',
        },
        border: '#E2E8F0',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: '#ED4D4D',
          hover: '#D74545',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderColor: {
        DEFAULT: '#E2E8F0',
      },
      borderRadius: {
        DEFAULT: '6px',
        lg: '6px',
        md: '4px',
        sm: '2px',
      },
      boxShadow: {
        tooltip: '0px 1px 6px 0px rgba(39, 52, 68, 0.16)',
      },
    },
  },
  plugins: [
    animate,
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--background': '0 0% 100%',
          '--foreground': '222.2 84% 4.9%',
          '--card': '0 0% 100%',
          '--card-foreground': '222.2 84% 4.9%',
          '--popover': '0 0% 100%',
          '--popover-foreground': '222.2 84% 4.9%',
          '--primary': '222.2 47.4% 11.2%',
          '--primary-foreground': '210 40% 98%',
          '--secondary': '210 40% 96.1%',
          '--secondary-foreground': '222.2 47.4% 11.2%',
          '--muted': '210 40% 96.1%',
          '--muted-foreground': '215.4 16.3% 46.9%',
          '--accent': '210 40% 96.1%',
          '--accent-foreground': '222.2 47.4% 11.2%',
          '--destructive': '0 84.2% 60.2%',
          '--destructive-foreground': '210 40% 98%',
          '--border': '214 32% 91%',
          '--input': '214.3 31.8% 91.4%',
          '--ring': '222.2 84% 4.9%',
        },
        '.dark': {
          '--background': '222.2 84% 4.9%',
          '--foreground': '210 40% 98%',
          '--card': '222.2 84% 4.9%',
          '--card-foreground': '210 40% 98%',
          '--popover': '222.2 84% 4.9%',
          '--popover-foreground': '210 40% 98%',
          '--primary': '210 40% 98%',
          '--primary-foreground': '222.2 47.4% 11.2%',
          '--secondary': '217.2 32.6% 17.5%',
          '--secondary-foreground': '210 40% 98%',
          '--muted': '217.2 32.6% 17.5%',
          '--muted-foreground': '215 20.2% 65.1%',
          '--accent': '217.2 32.6% 17.5%',
          '--accent-foreground': '210 40% 98%',
          '--destructive': '0 62.8% 30.6%',
          '--destructive-foreground': '210 40% 98%',
          '--border': '217.2 32.6% 17.5%',
          '--input': '217.2 32.6% 17.5%',
          '--ring': '212.7 26.8% 83.9%',
        },
      });
    }),
  ],
} satisfies Partial<Config>;

export default belinkerPreset;
