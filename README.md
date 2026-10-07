# @yeongyu-kim/ui

Belinker 앱에서 같이 쓰는 React 컴포넌트 패키지입니다. 공개 export는 `Button`과 Tailwind preset `belinkerPreset`입니다.

`react`와 `react-dom`은 peerDependency입니다. 앱이 이미 가진 React를 그대로 씁니다. `class-variance-authority`, Radix, `clsx`, `tailwind-merge`, `tailwindcss-animate`는 이 패키지 의존성입니다. Tailwind 3는 앱에 이미 있어야 해서 peerDependency로 둡니다.

## 앱에서 설치

지금은 GitHub 계정 `YeonGyu-Kim`의 GitHub Packages에 `@yeongyu-kim/ui`로 올립니다. 나중에 `belinker` 조직을 만들면 패키지 이름을 `@belinker/ui`로 바꿔 다시 배포합니다. 그때 앱의 설치 이름과 import도 같이 바꿉니다.

앱 루트 `.npmrc`:

```
@yeongyu-kim:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

`NODE_AUTH_TOKEN`에는 `read:packages` 권한이 있는 GitHub 토큰을 넣습니다. 저장소가 private이면 `repo` 권한도 필요합니다.

```bash
npm install @yeongyu-kim/ui
```

## Tailwind

색(`bg-blue-select`), 글자 크기(`text-md`), 폰트(`font-pretendard`), 브레이크포인트(`underDesktop`)는 preset에 있습니다. 앱 설정에는 preset만 추가합니다.

```ts
import type { Config } from 'tailwindcss';
import { belinkerPreset } from '@yeongyu-kim/ui/preset';

export default {
  presets: [belinkerPreset],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
} satisfies Config;
```

앱의 `content`는 앱 파일만 봐도 됩니다. preset이 Button, Tooltip이 쓰는 클래스를 safelist에 넣어서 `bg-blue-select` 같은 유틸리티가 앱 빌드에 포함됩니다. 앱이 직접 `safelist`를 쓰면 preset 목록이 가려지니, 그 경우에는 preset safelist를 이어 붙입니다.

`font-pretendard`는 CSS 변수 `--font-pretendard`를 읽습니다. Next.js라면 `next/font`로 Pretendard를 넣고 그 변수를 지정합니다.

## Button

```tsx
import { Button } from '@yeongyu-kim/ui';

export function SaveBar() {
  return (
    <Button variant="primary" size="md">
      저장
    </Button>
  );
}
```

| prop | 설명 |
| --- | --- |
| `buttonType` | `default` \| `icon` \| `text` |
| `variant` | 종류마다 다릅니다. default는 `primary` `secondary` `accent` `extract` `destructive` `landing` |
| `size` | default는 `xs`부터 `xl`, `landing` |
| `tooltipContent` | 문자열을 주면 호버 툴팁이 납니다 |
| `asChild` | Radix `Slot`으로 자식 요소에 스타일을 넘깁니다 |

## Storybook

[Storybook 10](https://storybook.js.org/docs) Controls에서 `size`, `variant`, `buttonType`을 바꾸면 캔버스의 버튼이 바로 바뀝니다. 이 저장소는 Node.js 22.12를 씁니다.

```bash
npm install
npm run storybook
```

http://localhost:6006

## 버전

[semver](https://semver.org/)를 따릅니다.

- 스타일만 고치면 patch (`1.0.0` → `1.0.1`)
- 동작은 같고 variant나 prop이 늘어나면 minor
- variant 이름이나 기존 prop이 바뀌거나 없어지면 major

`git push origin main`이 끝나면 patch, minor, major, 건너뛰기 중 하나를 묻습니다. `package.json`은 직접 고치지 않습니다.

- **patch, minor, major**를 고르면 Actions가 그 버전으로 올린 뒤 GitHub Packages에 등록하고, `main`에 버전 커밋을 남깁니다. 끝난 뒤 `git pull` 하면 로컬 `package.json` 버전이 맞춰집니다.
- **건너뛰기**는 방금 푸시한 코드만 남기고 npm에는 올리지 않습니다.

이 질문은 `npm install` 할 때 설치되는 이 저장소의 훅이 합니다. 다른 컴퓨터에서는 한 번 `npm install` 하면 됩니다.

## 로컬 빌드

```bash
npm run build
```

결과물은 ESM과 타입 선언입니다.

- `@yeongyu-kim/ui` → `dist/index.js`
- `@yeongyu-kim/ui/preset` → `dist/preset.js`
