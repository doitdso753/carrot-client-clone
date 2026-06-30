# store
## 디렉토리 개요
상태 관리

## 코드 컨벤션
- 서버 상태는 React Query로 관리한다.
- Query Key는 도메인별 객체로 관리한다.
- API 함수와 Query Hook을 분리한다.
- `select`는 화면 데이터 변환에만 사용한다.
- Mutation 성공 후 관련 Query를 갱신한다.