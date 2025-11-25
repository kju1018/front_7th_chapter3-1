# Chapter 3-1 환경 구축 체크리스트 (Tailwind v4 최신 권장)

Tailwind v4 + Vite 기준, 최신 권장 흐름으로 정리했습니다. after 패키지에서 Vite 플러그인 방식(`@tailwindcss/vite`)을 사용하며, shadcn CLI는 v4 미지원이라 스킵합니다.

---

## 0. 사전 준비 (루트)
- [ ] Node 18+ 확인 (`node -v`)
- [ ] pnpm 설치/버전 확인 (`pnpm -v`)

## 1. 루트 의존성 설치
- [ ] 워크스페이스 전체 설치
  ```bash
  pnpm install
  ```
- [ ] 공통 스크립트 확인: `pnpm dev:before`, `pnpm dev:after`, `pnpm storybook`

## 2. before 패키지 기본 동작 확인
- [ ] 이동: `cd packages/before`
- [ ] 개발 서버: `pnpm dev` (또는 루트 `pnpm dev:before`)
- [ ] 테스트: `pnpm test` (또는 루트 `pnpm test:before`)

## 3. after 패키지 기본 동작 확인
- [ ] 이동: `cd packages/after`
- [ ] 개발/테스트: `pnpm dev`, `pnpm test`

## 4. Tailwind v4 세팅 (Vite 플러그인 방식, after)
- [ ] 패키지 설치 (after에서 실행)
  ```bash
  pnpm add -D tailwindcss @tailwindcss/vite
  ```
  - 별도 PostCSS 설정 없이 Vite 플러그인으로 사용
- [ ] `tailwind.config.js` 생성/확인
  ```js
  // packages/after/tailwind.config.js
  export default {
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: { extend: {} },
    plugins: [],
  };
  ```
- [ ] `vite.config.ts`에 플러그인 추가
  ```ts
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  import tailwindcss from '@tailwindcss/vite';

  export default defineConfig({
    plugins: [react(), tailwindcss()],
  });
  ```
- [x] 글로벌 CSS에 Tailwind 베이스 추가 (예: `packages/after/src/index.css`)
  ```css
  @import "tailwindcss/base";
  @import "tailwindcss/components";
  @import "tailwindcss/utilities";
  ```

## 5. Variants/유틸 설치 (after)
- [ ] 클래스/아이콘 유틸 설치 (after에서 실행)
  ```bash
  pnpm add class-variance-authority tailwind-merge lucide-react
  ```
- [ ] 필요하면 `cn` 헬퍼를 `src/lib/cn.ts` 등에 추가(선택)

## 6. shadcn/ui (v4에서는 CLI 미지원)
- [ ] CLI는 스킵; 필요하면 shadcn 문서의 수동 설치 가이드로 컴포넌트 복사
- [ ] 또는 Tailwind를 v3으로 내릴 때만 CLI(`pnpm dlx shadcn-ui@latest init/add ...`) 사용 가능

## 7. Storybook 세팅 (after, 선택)
- [ ] 필요 시 after에서 초기화
  ```bash
  pnpm dlx storybook@latest init --type react-vite --package-manager pnpm
  ```
- [ ] `packages/after/package.json`에 `storybook`, `build-storybook` 스크립트 확인
- [ ] 루트에서 `pnpm storybook` 실행 확인

## 8. 선택: 폼/검증 라이브러리 (after)
- [ ] 필요 시 설치
  ```bash
  pnpm add react-hook-form zod @hookform/resolvers
  ```

## 9. 최종 체크
- [ ] `pnpm dev:before`, `pnpm dev:after` 동작
- [ ] `pnpm storybook` 동작(세팅했다면)
- [ ] Tailwind/variants 적용 후 `pnpm test:after` 실행

## 10. Extra setup support (on request)
- [ ] Tailwind v4 Vite plugin template (@tailwindcss/vite) install/cleanup help
- [ ] ESLint/Prettier/Vitest/Storybook init help
- [ ] cn helper and variants pattern starter files
- [ ] shadcn components added manually (CLI skipped or v3 path)