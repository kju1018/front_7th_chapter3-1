# Week 5 과제 실행 순서 (summary.md 기반)

> 전제: 환경 세팅 완료 상태. 아래 체크리스트를 순서대로 따라가며 과제 요구사항을 충족한다.

---

## 1) Before 패키지 진단
- [ ] `pnpm dev:before`로 전체 UX 흐름 확인 (리스트/상세/폼/액션)
- [ ] 컴포넌트 API 불일치, 스타일링 혼재, 타입/접근성 문제 사례를 수집
- [ ] 발견 내용을 `docs/summary.md`의 **Before 패키지에서 발견한 문제점**에 bullet로 기록

## 2) After 기본 구조 정리
- [ ] `packages/after` 디렉터리 역할 재점검 (ui 컴포넌트, hooks, tokens 등)
- [ ] 사용할 컴포넌트/훅/토큰 대략 목록 메모 (Button, Form 필드, Card/Table 등)

## 3) 디자인 시스템 세팅 (Tailwind v4 + 토큰)
- [ ] `src/styles/index.css`에 디자인 토큰(@theme) 정리 및 필요시 추가(색상/타이포/spacing 등)
- [ ] dark mode 변수를 `.dark`에서 오버라이드하도록 구성
- [ ] 샘플 컴포넌트로 토큰 적용 여부 확인

## 4) shadcn/ui 컴포넌트 반영
- [ ] 필요한 shadcn 컴포넌트(Button, Input, Select, Card, Table 등) 소스 추가/정리
- [ ] Tailwind 토큰과 맞도록 스타일 커스터마이징

## 5) CVA 기반 variants 설계
- [ ] Button 등 핵심 컴포넌트에 `variant`/`size` 등 variants 정의
- [ ] Form 필드들(label/help/error 표시 방식 포함) props 패턴 통일

## 6) PostManagement 리팩터링/마이그레이션
- [ ] Before 기능 요구(목록/CRUD/필터 등)를 정리하고 After에 동일 기능 구현
- [ ] UI는 `components/ui`의 새 컴포넌트 사용, 비즈니스 로직은 훅/상위로 분리
- [ ] 타입 안정성, 스타일 일관성, a11y 개선 확인

## 7) 스토리/문서화
- [ ] 주요 UI 컴포넌트 Storybook 작성(Button, Form 필드, Card/Table/Modal 등)
- [ ] variants/상태별 스토리로 동작 확인 (`pnpm storybook`)
- [ ] README에 before/after 비교 요약, `docs/summary.md` 회고 섹션 채우기

## 8) 심화(선택)
- [ ] Dark Mode 완전 지원 검증
- [ ] 추가 디자인 토큰(타이포 스케일, 섀도우, 애니메이션) 고도화
- [ ] 필요 시 RHF + Zod로 Post 폼 리팩터링 및 스토리 추가
