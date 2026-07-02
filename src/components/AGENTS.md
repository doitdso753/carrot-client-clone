# components/
## 디렉토리 개요
재사용 가능한 작은 단위 UI 컴포넌트

## 코드 컨벤션
- 함수형 컴포넌트만 사용한다.
- export default function ComponentName()
- JSX가 복잡하거나 동일 UI가 반복되면 컴포넌트로 분리한다.
- Props 타입은 컴포넌트 위에 선언한다.
- 파생 상태는 `useState`로 저장하지 않는다.
- 불필요한 `useMemo`, `useCallback`은 사용하지 않는다.
- 범용 컴포넌트는 ui 폴더 안에 위치한다