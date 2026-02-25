# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # 개발 서버 실행
npm run build    # TypeScript 체크 + 프로덕션 빌드
npm run lint     # ESLint 실행
npm run preview  # 빌드된 결과물 미리보기
```

## Path Aliases

- `@/*` → `src/*`
- `@lib/*` → `src/lib/*`
- `@app/*` → `src/app/*`

## Architecture

```
src/
├── lib/           # 공통 라이브러리 (비즈니스 로직 무관)
│   ├── apis/
│   │   ├── axios/     # Axios 인스턴스 (`api`로 export, timeout: 10초)
│   │   ├── tanstack/  # React Query 설정 (staleTime: 5분, gcTime: 10분, retry: 1)
│   │   └── queries/   # Query/Mutation 훅 (도메인별 폴더)
│   ├── constants/     # 상수 (도메인별 폴더: time/ 등)
│   ├── hooks/         # 커스텀 훅
│   ├── stores/        # Zustand 스토어
│   ├── utils/         # 유틸리티 함수
│   └── types/         # 공통 타입 정의
├── app/           # 애플리케이션 레이어
│   ├── components/    # UI 컴포넌트 (도메인별: layout/ 등)
│   ├── containers/    # 비즈니스 로직 컨테이너
│   ├── pages/         # 페이지 컴포넌트 (도메인별 구조)
│   └── router/        # React Router 설정 (createBrowserRouter, routes.tsx에서 라우트 정의)
```

**App 부트스트랩**: `main.tsx` → `App.tsx`(QueryClientProvider + RouterProvider) → `routes.tsx`(GlobalLayout이 Outlet으로 감싸는 구조)

## Code Conventions

### Component Structure (도메인별 폴더)

```
{domain}/
├── index.ts                      # barrel export
└── {ComponentName}/
    └── {ComponentName}.tsx
```

### Query Hook Structure (도메인별 폴더)

```
queries/
└── {domain}/
    ├── index.ts                          # barrel export
    ├── keys.ts                           # Query Key Factory
    └── {useQueryName}/
        ├── {useQueryName}.ts             # 훅 구현
        └── {useQueryName}.type.ts        # 요청/응답 타입
```

**Query Key Factory 패턴**:
```ts
const all = ["{domain}"] as const
const domainKeys = {
  all,
  detail: [...all, "detail"],
} as const
export default domainKeys
```

### Barrel Export Pattern

```ts
// 도메인 index.ts
export { default as ComponentName } from './ComponentName/ComponentName'

// 루트 index.ts
export * from './domain'
```

### Component Definition

```tsx
// Arrow function + export default 분리
const ComponentName = () => {
  return <div>...</div>
}

export default ComponentName
```

### TypeScript

- `verbatimModuleSyntax: true` — 타입 import 시 반드시 `import type` 사용
- strict 모드: `noUnusedLocals`, `noUnusedParameters` 활성화

### Prettier (코드 스타일)

- 쌍따옴표(`"`) 사용 (singleQuote: false)
- `arrowParens: "avoid"` — 화살표 함수 단일 파라미터 시 괄호 생략: `x => x`
- `singleAttributePerLine: true` — JSX 속성 한 줄에 하나씩
- `bracketSameLine: true` — JSX 닫는 괄호를 같은 줄에

### Import Order (Prettier plugin)

1. CSS 파일
2. React 관련
3. `@` alias (lib, app)
4. 상대 경로 (`../`, `./`)
5. Third-party 모듈

각 그룹 사이 빈 줄 삽입 (`importOrderSeparation: true`)

## Tech Stack

- React 19 + TypeScript + Vite 7
- TanStack Query v5 (서버 상태)
- Zustand v5 (클라이언트 상태)
- Tailwind CSS 4 (@tailwindcss/vite 플러그인)
- Motion (애니메이션)
- React Router DOM 7 (createBrowserRouter)

## Environment Variables

- `VITE_API_URL` - API 서버 주소 (기본값: `http://localhost:8000`)
