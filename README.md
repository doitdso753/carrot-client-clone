# Carrot Client Clone

당근마켓 웹 사이트를 클론 코딩하는 React 기반 프론트엔드 프로젝트입니다.

현재 프로젝트는 Vite 환경에서 구성되어 있으며, 당근마켓의 주요 화면과 공통 레이아웃을 구현하는 것을 목표로 합니다.

## 기술 스택

### Frontend

- Frontend: React 19, TypeScript
- 상태 관리: TanStack React Query
- 스타일링: Tailwind CSS
- 코드 품질: ESLint, Prettier
- 빌드 및 개발 환경: Vite

## 빠른 시작

### 패키지 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm start
```

개발 서버가 실행되면 브라우저에서 `http://localhost:5173`으로 접속합니다.

### 개발 서버 실행

```bash
npm run dev
```

### 프로덕션 빌드

```bash
npm run build
```

### 프로덕션 빌드 미리보기

```bash
npm run preview
```

## 레이아웃 구조

목록과 상세 페이지는 RootLayout과 HeaderWithSearch를 조합합니다.
- RootLayout: 전체 화면의 배경과 최소 높이를 설정합니다.
- HeaderWithSearch: 검색창과 카테고리 메뉴를 제공합니다. activeCategoryCode에 해당 서비스의 카테고리 코드를 전달합니다.

주황 배경색은 목록과 상세 페이지가 공유하는 컴포넌트입니다.

### 목록 페이지

```mermaid
flowchart LR
    Root["RootLayout"] --> Header["검색창 · 카테고리 메뉴<br/>HeaderWithSearch"]
    Root --> Main["목록 페이지 본문 영역"]
    Main --> Title["지역, 서비스명, 검색 결과 제목<br/>ServiceListTitle"]
    Main --> Body["검색 필터와 목록을 배치하는 영역"]
    Body --> Filter["지역, 서비스별 검색 조건<br/>SearchFilter"]
    Body --> Items["서비스별 목록 영역"]

    classDef shared fill:#fff0e6,stroke:#f97316,color:#222
    class Root,Header shared
```

| 영역 | 사용하는 컴포넌트 |
| --- | --- |
| 서비스별 목록 | `CardList`, `CarCardList`, `CommunityList`, `GroupList`, `LocalProfileBoardList` |

### 동네업체 목록 레이아웃

동네업체 목록은 배경 지도 위에 목록 패널을 배치합니다.

```mermaid
flowchart TB
    Root["RootLayout"]
    Root --> Map["업체 탐색용 배경 지도<br/>KakaoMap"]
    Root --> Panel["지도 위에 표시하는 업체 목록 패널"]
    Panel --> Header["검색창, 카테고리 메뉴<br/>HeaderWithSearch"]
    Panel --> Content["제목, 검색 필터, 업체 목록<br/>LocalProfileContent"]
    Root --> Controls["지도 조작 영역<br/>현재 지도 범위 재검색, 지도 메뉴"]

    classDef shared fill:#fff0e6,stroke:#f97316,color:#222
    class Root,Header shared
```

### 상세 페이지

```mermaid
flowchart LR
    Root["RootLayout"] --> Header["검색창, 카테고리 메뉴<br/>HeaderWithSearch"]
    Root --> Main["서비스별 상세 본문 영역"]

    classDef shared fill:#fff0e6,stroke:#f97316,color:#222
    class Root,Header shared
```

| 영역 | 사용하는 컴포넌트 |
| --- | --- |
| 서비스별 상세 본문 | `BuySellDetail`, `CarDetail`, `CommunityDetail`, `GroupDetail`, `LocalProfileDetail` |
| 모임 게시판 | `GroupBoardContent`, `GroupBoardDetail` |

## 목록 페이지 데이터 흐름

목록 페이지는 **조회 조건 구성 → 데이터 조회 → 결과 표시** 순서로 동작합니다.
현재는 샘플 데이터를 클라이언트에서 필터링합니다.

```mermaid
flowchart TB
    Input["사용자 입력<br/>지역, 검색어, 필터, 정렬"]
    Params["조회 조건 구성"]
    Fetch["목록 조회"]
    State["화면 상태 처리"]
    View["목록 결과 표시"]
    Next["추가 목록 요청<br/>페이지 이동, 더 보기"]

    Input --> Params
    Params --> Fetch
    Fetch --> State
    State --> View
    View --> Next
    Next --> Params
```

| 단계 | 현재 구현                    | 서버 연동 시 처리 방식         |
| --- |--------------------------|--------------------|
| 사용자 입력 | 검색창, 지역 선택, 검색 필터        |                    |
| 조회 조건 구성 | Context, URL, 페이지별 상태 활용 | API 조회 파라미터로 구성    |
| 목록 조회 | 조회 조건에 맞는 샘플 데이터 필터링     | 조회 Hook에서 API 요청   |
| 상태 처리 | 필터링 결과와 빈 결과 처리          | 로딩, 오류, 성공, 빈 결과 처리 |
| 목록 표시 | 서비스별 목록 컴포넌트             |        |
| 추가 조회 | 서비스별 구현에 따름              | 페이지 또는 커서 기반 조회    |


## 커밋 메시지 컨벤션

커밋 메시지는 아래 형식을 사용합니다.

```text
type: subject
```

### Type

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락 등 동작에 영향이 없는 변경
- `refactor`: 기능 변경 없이 코드 구조 개선
- `test`: 테스트 코드 추가 또는 수정
- `chore`: 빌드 설정, 패키지 관리 등 기타 작업

### 예시

```text
feat: 헤더 메뉴 UI 구현
fix: 로고 이미지 경로 수정
docs: README 빠른 시작 명령어 추가
```
