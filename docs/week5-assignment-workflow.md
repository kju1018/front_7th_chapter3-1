
# Chapter 3-1 과제 실행 워크플로우 (프로젝트 작업용)

> 전제: `setting-workFlow.md`에 있는 환경/라이브러리 세팅은 이미 완료되었다고 가정합니다.  
> 아래 체크리스트는 **과제를 통과하기 위해 실제로 구현/분석/문서화해야 하는 작업**만 정리한 것입니다.

---

## 1. Before 패키지 분석 (레거시 이해)

- [ ] `pnpm dev:before`로 앱 실행해서 전체 화면 흐름 파악하기
- [ ] `PostManagement` 페이지 기능/UX 정리
  - 어떤 데이터가 보이는지 (리스트, 상세, 폼 등)
  - 주요 사용자 액션 (등록/수정/삭제, 필터링 등)
- [ ] 코드 레벨에서 문제점 분석
  - [ ] 컴포넌트 API 불일치 사례 수집  
    - 예: `FormInput`, `FormSelect`, `FormTextarea` props 이름/패턴 비교
  - [ ] 스타일링 방식 혼재 사례 수집  
    - 인라인 스타일, CSS Modules, 하드코딩 색상값 등
  - [ ] 타입 안전성/접근성 문제 정리  
    - 느슨한 타입, ARIA 부족, 키보드 네비게이션 미비 등
- [ ] 정리 결과를 `docs/Week 5 - Assignment - Summary.md`의  
  **「Before 패키지에서 발견한 문제점」** 섹션에 bullet로 작성

---

## 2. After 패키지 구조 설계 (디자인 시스템 관점)

- [ ] `packages/after`의 구조/역할 다시 확인
  - `src/components/ui` : 순수 UI 컴포넌트
  - `src/tokens` : 디자인 토큰
  - `src/hooks` : 공용 훅 (상태/로직 분리용)
  - `src/stories` : Storybook stories
- [ ] “폴더 구조 vs Atomic Design 개념” 정리
  - Atomic Design은 개념으로만 참고, 실제 폴더 구조는 단순 `components/ui`로 가져가는 방향 확정
- [ ] 이 과제에서 사용할 컴포넌트/토큰/훅들의 대략적인 목록을 메모

---

## 3. 디자인 토큰 정의 및 정리

- [ ] `src/tokens`에서 공통 토큰 정의/정리
  - [ ] 색상 팔레트 (primary, secondary, background, border, success, error 등)
  - [ ] 타이포그래피 (폰트 패밀리, 폰트 크기, line-height 등)
  - [ ] spacing/레이아웃 관련 값 (padding, gap 등)
- [ ] Tailwind 설정과 토큰이 일관되게 동작하는지 샘플 컴포넌트로 확인
- [ ] 하드코딩된 스타일을 최대한 토큰 기반으로 교체할 기준 정하기

---

## 4. 공통 UI 컴포넌트 구현 (Button → Form 계열 → Layout 순)

> 각 컴포넌트는 가능한 한 “순수 UI”에 집중하고, 상태/비즈니스 로직은 상위에서 주입받도록 설계합니다.

- [ ] Button 컴포넌트 구현/정리
  - [ ] `variant`/`size` 등 CVA 기반 variants 정의
  - [ ] disabled/로딩/아이콘 포함 등 필요한 상태 정의
- [ ] Input/Select/Textarea 등 Form 필드 컴포넌트
  - [ ] label, help text, error message 표기 방식 통일
  - [ ] props 이름/동작을 일관되게 설계
- [ ] Card, Table, Modal 등 레이아웃/컨테이너 컴포넌트
  - [ ] shadcn/ui 컴포넌트를 기반으로 우리의 토큰/Tailwind 규칙에 맞게 커스터마이징
- [ ] 접근성(a11y) 고려
  - [ ] ARIA 속성, role, 키보드 포커스 흐름 점검

---

## 5. PostManagement 페이지 마이그레이션 (핵심 기능)

- [ ] Before의 `PostManagement` 페이지를 기준으로 요구 기능 정의
  - 목록 조회, 생성/수정/삭제, 필터링/정렬 등
- [ ] After 패키지에 `PostManagement` 페이지 구현 (또는 기존 파일 리팩터링)
  - [ ] UI 레이어는 `components/ui`의 새 컴포넌트로 구성
  - [ ] 비즈니스 로직/데이터 처리/상태 관리는 별도 훅 또는 상위 컴포넌트로 분리
- [ ] 기존 UX를 유지하면서, 다음을 개선했는지 확인
  - [ ] 컴포넌트 API 일관성
  - [ ] 스타일 일관성 (Tailwind + 토큰)
  - [ ] 타입 안정성 (props 타입, VariantProps 등)
  - [ ] 접근성 (키보드 네비게이션, ARIA)

---

## 6. Storybook 스토리 작성 (문서화)

- [ ] 주요 UI 컴포넌트별 Story 작성
  - [ ] Button
  - [ ] Input / Select / Textarea
  - [ ] Form 컴포넌트 (필요 시 RHF+Zod 포함)
  - [ ] Card / Table / Modal 등
- [ ] 각 컴포넌트에 대해
  - [ ] 대표 variants/size 조합을 Story로 분리
  - [ ] `args`, `controls`, `tags: ['autodocs']` 등 설정
- [ ] Storybook 실행 (`pnpm storybook`) 후 UI, Controls 동작 확인
  - [ ] 컴포넌트가 독립적으로 잘 렌더링되는지
  - [ ] 상태/스타일이 스토리에서 모두 확인 가능한지

---

## 7. (선택) React Hook Form + Zod 적용

> 심화 과제 또는 본인이 폼을 더 탄탄하게 만들고 싶을 때 진행

- [ ] Post 생성/수정 폼을 RHF + Zod로 리팩터링
  - [ ] Zod 스키마 정의
  - [ ] `react-hook-form`으로 폼 상태/검증 연결
- [ ] 해당 폼에 대한 Storybook Story 작성
  - [ ] 유효/무효 입력 사례를 눈으로 확인할 수 있도록 구성

---

## 8. 문서화 및 회고 (제출 준비)

- [ ] `README.md`에 before/after 비교 정리
  - [ ] 컴포넌트 API 차이와 개선점
  - [ ] 스타일링 방식 변화 (CSS/인라인 → Tailwind + 토큰)
  - [ ] 타입/접근성 개선 요약
- [ ] `docs/Week 5 - Assignment - Summary.md` 작성/보완
  - [ ] Before에서 발견한 문제점
  - [ ] 개편 과정에서 집중한 부분
  - [ ] 사용한 기술 스택 경험
  - [ ] 어려웠던 점과 해결 방법
  - [ ] 리뷰받고 싶은 내용/질문

---

## 9. 최종 셀프 체크 (통과 기준 관점)

- [ ] after 패키지에 **일관된 디자인 시스템**이 구현되어 있는가?
- [ ] `PostManagement` 페이지가 새 디자인 시스템을 사용하도록 **완전히 마이그레이션** 되었는가?
- [ ] 주요 컴포넌트에 대해 Storybook stories가 존재하고, 상태/variants를 확인할 수 있는가?
- [ ] README와 Summary 문서에 before/after 비교와 회고가 잘 정리되어 있는가?
