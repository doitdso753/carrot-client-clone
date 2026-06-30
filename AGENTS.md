# AGENTS.md

## 프로젝트 개요

이 프로젝트는 **React 19 + TypeScript + Vite** 기반의 프론트엔드 애플리케이션이다.

- Frontend: React 19, TypeScript
- 상태 관리: TanStack React Query
- 스타일링: Tailwind CSS
- 코드 품질: ESLint, Prettier
- 빌드: Vite

목표는 유지보수성과 타입 안정성, 일관된 UI 및 명확한 데이터 흐름을 갖춘 코드를 작성하는 것이다.

---

## 기본 원칙

- 모든 코드는 TypeScript로 작성한다.
- 복잡한 함수는 반환 타입을 명시한다.
- 컴포넌트는 하나의 책임만 가진다.
- 중복 코드보다 재사용 가능한 구조를 우선한다.

---

## 부칙

- AI의 모든 응답은 한국어와 존댓말로 작성한다.
- 한국어 주석을 작성하고 코드 변경 시 함께 수정한다.
- 사용자가 요청한 범위 외 파일은 수정하지 않는다.
- 요구사항이 불명확하면 반드시 질문 후 작업한다.
- 추측성 수정과 임시 코드는 작성하지 않는다.
- 디버그 로그는 작업 완료 후 반드시 삭제한다.
- 보안에 취약한 구현은 사용하지 않는다.
- 복잡하거나 최신 정보가 필요한 문제는 최신 자료를 확인 후 적용한다.
- `docs/` 폴더가 존재하면 모든 문서를 숙지하고 규칙을 따른다.

---

## 네이밍 규칙

- 파일: `kebab-case`
- 컴포넌트: `PascalCase`
- Hook: `use + PascalCase`
- 함수/변수: `camelCase`
- Type: `PascalCase`
- Props: `ComponentNameProps`
- 상수: `UPPER_SNAKE_CASE`
- Boolean: `is`, `has`
- 이벤트 핸들러: `handle + PascalCase`

---

## Import 규칙

- 상대 경로(`../`, `../../`) 대신 절대 경로 Alias(`@`)를 사용한다.
- Alias는 `src`를 기준으로 한다.
- 같은 디렉터리의 파일만 상대 경로(`./`)를 사용할 수 있다.

---

## 코드 품질

- ESLint 에러 없이 커밋한다.
- Prettier로 코드 포맷을 유지한다.
- 사용하지 않는 변수와 Import를 제거한다.
- React Hooks 규칙을 준수한다.
