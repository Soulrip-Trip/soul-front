# Soulrip

> **Discover Solo → Plan Solo → Share Solo**
> 혼자 떠나는 서울에서 나에게 맞는 장소와 여행 경험을 발견하고 공유하는 **AI 기반 Solo Travel Hub**이다.

Soulrip은 서울의 공공 관광 데이터를 혼자 여행하는 사용자의 관점에서 재구성한 지역 정보 서비스이다.

관광지 목록을 단순히 나열하는 데 그치지 않고 사용자가 서울의 장소를 발견하고, AI 챗봇을 통해 여행 선택지를 구체화하며, 실제 경험을 익명 커뮤니티에서 공유할 수 있도록 설계하였다.

---

## Project Overview

| 항목                 | 내용                         |
| ------------------ | -------------------------- |
| Project            | Soulrip                    |
| Region             | Seoul                      |
| Development Period | n일                         |
| Team               | 3명                         |
| Frontend           | Vue.js 3, TypeScript, Vite, FSD, npm workspaces |
| Backend            | FastAPI                    |
| Database           | SQLite                     |
| AI                 | OpenAI API                 |
| Development Tools  | VS Code, GitHub Copilot    |
| Data               | 서울 지역 공공 관광 데이터            |

---

## Background

서울에는 관광지, 문화시설, 레포츠, 쇼핑, 숙박, 여행코스, 축제 등 다양한 지역 정보가 존재한다.

하지만 혼자 서울을 여행하거나 서울을 처음 방문하는 사용자의 입장에서는 정보가 여러 데이터와 서비스에 분산되어 있어 현재 상황과 취향에 맞는 장소를 찾기 어렵다.

특히 기존 관광 정보 서비스는 장소 자체에 대한 정보 제공에는 충실하지만, **혼자 방문하기 좋은지**, **어떤 장소를 선택하면 좋을지**, **다른 혼행 사용자는 어떤 경험을 했는지**와 같은 실제 여행 상황에 대한 연결은 부족하다고 판단하였다.

Soulrip은 이러한 문제를 다음 세 단계로 해결하고자 하였다.

```text
Discover Solo
      ↓
Plan Solo
      ↓
Share Solo
```

---

## Target User

Soulrip의 핵심 사용자는 다음과 같다.

1. 혼자 서울을 여행하는 사용자
2. 서울을 처음 방문하는 관광객
3. 회원가입 없이 서울 지역 정보를 탐색하고 경험을 공유하고 싶은 사용자

가장 중요한 사용자 경험은 **혼자 여행하는 상황에서도 부담 없이 장소를 발견하고 여행 선택지를 좁혀갈 수 있도록 하는 것**이다.

---

## Service Concept

### Discover Solo

서울 공공데이터를 기반으로 혼자 방문하기 좋은 장소와 콘텐츠를 탐색하는 단계이다.

사용자는 관광지, 문화시설, 레포츠, 쇼핑, 숙박, 여행코스, 축제·공연·행사 등의 데이터를 카테고리와 검색을 통해 탐색할 수 있다.

### Plan Solo

사용자가 현재 상황이나 관심사를 자연어로 입력하고 AI를 통해 여행 선택지를 구체화하는 단계이다.

예를 들어 다음과 같은 질문을 할 수 있다.

```text
혼자 조용히 걷기 좋은 곳 추천해줘.

오늘 갈 수 있는 축제 있어?

서울에서 혼자 문화생활하기 좋은 곳 알려줘.
```

지역 정보 챗봇은 제공된 서울 데이터를 기반으로 사용자의 질문에 적합한 정보를 탐색할 수 있도록 지원한다.

### Share Solo

직접 방문한 장소와 혼행 경험을 익명으로 공유하는 단계이다.

별도의 회원가입이나 로그인 없이 게시글을 작성할 수 있으며, 다른 사용자의 실제 경험을 참고하여 다음 여행 선택에 활용할 수 있다.

---

## Core Features

### Place Discovery

서울 지역의 다양한 장소 정보를 탐색하는 기능이다.

주요 데이터는 다음과 같다.

* 관광지
* 레포츠
* 문화시설
* 쇼핑
* 숙박
* 여행코스
* 축제·공연·행사

장소 탐색 경험에서는 이미지 중심의 카드 UI를 사용하여 Instagram이나 Pinterest처럼 콘텐츠를 자연스럽게 탐색할 수 있도록 설계하였다.

---

### Festival Discovery

서울에서 진행되는 축제·공연·행사 정보를 확인할 수 있는 기능이다.

기간과 장소 등 행사 정보를 제공하여 여행 일정에 맞는 콘텐츠를 쉽게 탐색할 수 있도록 구성하였다.

---

### AI Local Guide

OpenAI API를 활용한 서울 지역 정보 챗봇이다.

다음과 같은 질문을 처리하는 것을 목표로 설계하였다.

* 관광지 추천
* 축제 일정 탐색
* 지역 정보 질의
* 여행 선택지 추천
* 커뮤니티 정보 탐색
* 이전 대화를 활용한 연속 질의

사용자가 여러 화면을 직접 탐색하지 않아도 자연어로 필요한 지역 정보를 찾을 수 있도록 하는 것이 핵심이다.

---

### Anonymous Community

회원가입 없이 이용할 수 있는 익명 커뮤니티이다.

다음 기능을 제공한다.

* 게시글 목록 조회
* 게시글 상세 조회
* 게시글 작성
* 게시글 수정
* 게시글 삭제
* 수정용 비밀번호 기반 권한 확인
* 커뮤니티 데이터 DB 저장

익명성을 유지하면서 실제 혼행 경험과 장소 정보를 다른 사용자와 공유할 수 있도록 설계하였다.

---

## User Flow

| Stage         | User Experience               | Feature         |
| ------------- | ----------------------------- | --------------- |
| Discover Solo | 혼자 즐기기 좋은 서울의 장소와 콘텐츠를 탐색한다.  | 장소 탐색, 카테고리, 검색 |
| Plan Solo     | 관심사와 현재 상황에 맞는 여행 선택지를 구체화한다. | AI 지역 정보 챗봇     |
| Share Solo    | 실제 혼행 경험과 장소 정보를 공유한다.        | 익명 커뮤니티         |

Soulrip의 각 기능은 독립적인 기능으로 존재하기보다 하나의 여행 경험으로 이어지도록 구성하였다.

```text
장소 발견
   ↓
상세 정보 확인
   ↓
AI에게 추가 정보 질문
   ↓
실제 장소 방문
   ↓
커뮤니티에 경험 공유
   ↓
다른 사용자의 새로운 장소 발견
```

---

## MVP Strategy

프로젝트 개발 기간이 n일로 제한되어 있었기 때문에 모든 아이디어를 구현하기보다 **RFP 필수 요구사항과 사용자 가치가 높은 기능을 우선적으로 구현하는 것**을 목표로 하였다.

기능 범위는 MoSCoW 방식으로 관리하였다.

### Must Have

* 서울 지역 정보 탐색
* 익명 커뮤니티 CRUD
* 지역 정보 챗봇
* 공공데이터 활용
* 모바일 대응 UI
* 데이터 저장 및 조회

### Should Have

* 카테고리 기반 장소 탐색
* 검색 기능
* 축제 및 행사 탐색
* 여행 선택을 돕는 AI 응답
* 장소 상세 정보

### Could Have

* 복수 장소를 활용한 여행 동선 제안
* 사용자 상황 기반 추천 강화
* 추가적인 혼행 특화 콘텐츠

### Won't Have

n일이라는 개발 기간과 팀 리소스를 고려하여 다음과 같은 기능은 초기 MVP에서 제외하였다.

* 회원 시스템
* 복잡한 개인화 추천 모델
* 실시간 사용자 위치 기반 추천
* 자체 추천 AI 모델 학습
* 복잡한 소셜 네트워크 기능

---

## Feature Prioritization

기능을 선정할 때 단순한 아이디어의 흥미도보다는 다음 세 가지 기준을 사용하였다.

| Evaluation                | Description                  |
| ------------------------- | ---------------------------- |
| Implementation Difficulty | 현재 기술 스택에서 구현해야 하는 개발 부담     |
| Feasibility               | n일 내 안정적으로 구현할 수 있는 가능성      |
| User Impact               | 실제 사용자가 서비스 이용 중 체감할 수 있는 가치 |

RFP에서 지정한 필수 기능은 평가 점수와 관계없이 반드시 구현하는 것으로 정의하였다.

이를 통해 구현 가능한 범위 안에서 최대한 사용자 가치가 높은 MVP를 구성하였다.

---

## UI Direction

Soulrip의 UI는 혼행 서비스라는 특성을 살리면서도 전통적인 관광 서비스처럼 보이지 않는 것을 목표로 하였다.

### Design Keywords

* Hip
* Trendy
* Modern Seoul
* Image Driven
* Light / Dark Theme
* Mobile First

### Design System

| Item            | Direction            |
| --------------- | -------------------- |
| Main Color      | Blue                 |
| Theme           | Light / Dark (OS 설정 자동) |
| Font            | SUIT Variable        |
| Card            | 이미지 중심 카드            |
| Inspiration     | Instagram, Pinterest |
| Primary Content | 장소 탐색                |

장소를 검색 결과의 한 항목으로 보여주는 대신 사용자가 이미지를 보며 자연스럽게 서울의 장소를 발견할 수 있는 탐색 경험을 중요하게 고려하였다.

---

## Tech Stack

### Frontend

```text
Vue.js 3 (Composition API, <script setup>)
TypeScript
Vite
Vue Router
npm workspaces 모노레포 (library + packages)
Feature-Sliced Design
ESLint + oxlint + Prettier
husky + lint-staged + commitlint
```

### Backend

```text
FastAPI
SQLite
```

### AI

```text
OpenAI API
```

### Development

```text
VS Code
GitHub Copilot
Git / GitHub
```

---

## Getting Started

```bash
npm install          # 의존성 설치 + workspace 패키지 링크 + husky 훅 설치
cp .env.example .env # VITE_API_BASE_URL=http://localhost:8000/api/v1
npm run dev
```

| Script | 설명 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 타입 검사 + 프로덕션 빌드 |
| `npm run check` | Prettier 검사 + oxlint + ESLint + vue-tsc (CI용, 수정 없음) |
| `npm run lint` | oxlint + ESLint 자동 수정 |
| `npm run format` | Prettier 전체 포맷 |

---

## Frontend Architecture

npm workspaces 모노레포이다. 앱 코드(`src/`)는 **Feature-Sliced Design(FSD)**, 공통 코드는 `src` 바깥의 `library/`와 `packages/*`로 분리해 앱이 패키지처럼 가져다 쓴다.

```text
soul-frontend/
├─ library/                     @soulrip/library       도메인 무관 공통 라이브러리
│  └─ src/  date · pagination · async · storage · browser · string · url · geo · vue
├─ packages/
│  ├─ config/                   @soulrip/config        환경 변수, 언어 목록, 저장소 키, 페이지 크기
│  ├─ font-suit/                @soulrip/font-suit     SUIT Variable 웹폰트 (self-hosted, OFL)
│  ├─ design-system/            @soulrip/design-system 토큰 · 반응형 타이포 · 레이아웃 · S* 컴포넌트
│  └─ api/                      @soulrip/api           HTTP 코어 + 도메인별 API
│     └─ src/domains/  place · festival · post · comment · like · chat · insight
│                      (각 도메인 = <domain>.types.ts + <domain>.api.ts + index.ts)
└─ src/                         Feature-Sliced Design
   ├─ app/        진입점, 라우터, 루트 레이아웃
   ├─ pages/      서버 도메인별 페이지  home · place · festival · post · not-found
   ├─ widgets/    app-header · mobile-tab-bar · app-footer · chatbot · today-insight
   │              festival-calendar · location-map · post-comments
   ├─ features/   place-filter · post-filter · festival-month-filter · post-like · post-delete
   │              post-editor · comment-create · place-bookmark · share-link · theme-toggle · language-switch
   ├─ entities/   place · festival · post · comment
   └─ shared/     i18n(7개 언어) · model(테마·언어) · config(라우트·내비) · lib · assets
```

### 관심사 분리

| 관심사 | 위치 |
|---|---|
| 타입 | `packages/api/src/domains/<domain>/<domain>.types.ts` |
| API 호출 | `packages/api/src/domains/<domain>/<domain>.api.ts` |
| 상태·로직 | 각 슬라이스의 `model/use*.ts` |
| 순수 함수 | 각 슬라이스의 `lib/*.ts`, 범용은 `library/` |
| 화면 | 각 슬라이스의 `ui/*.vue` |

### Import 규칙 (ESLint로 강제)

```ts
// 같은 슬라이스/폴더 내부 → 상대 경로
import { usePostLike } from '../model/usePostLike'

// 다른 슬라이스·레이어·패키지 → 절대 경로
import { PlaceCard } from '@/entities/place'
import { placeApi } from '@soulrip/api'
import { http } from '@soulrip/api/core'        // 패키지 내부의 다른 폴더도 패키지 이름으로
```

- 레이어 방향 `app → pages → widgets → features → entities → shared` (역방향 import 금지)
- 같은 레이어 슬라이스끼리 import 금지, 슬라이스는 `index.ts`(public API)로만 접근
- 패키지는 앱 코드(`@/...`)를 import 할 수 없음

---

## Design System & Responsive

전체 규칙은 [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md)에 있다.

### 글자 크기 — 화면 폭에 따라 자동 조절

**① 루트 글자 크기** (모든 rem이 함께 변함, % 단위라 사용자 브라우저 설정도 존중)

| 화면 폭 | 1rem | 대상 |
|---|---|---|
| ~359px | 14px (87.5%) | 갤럭시 폴드 접힘, iPhone SE 1세대 |
| 360~389px | 15px (93.75%) | 일반 안드로이드, iPhone mini |
| 390~1439px | 16px (100%) | 최신 스마트폰 ~ 노트북 |
| 1440~1919px | 17px (106.25%) | 와이드 모니터 |
| 1920px~ | 18px (112.5%) | FHD 이상 |

**② 제목 크기 토큰** (본문은 1rem 고정, 제목만 단계적으로)

| 토큰 | ~359 | 360~479 | 480~767 | 768~1023 | 1024~ |
|---|---|---|---|---|---|
| 히어로 `--fs-display` | 2.25rem | 2.5rem | 3rem | 3.5rem | 4.5rem |
| 페이지 제목 `--fs-h1` | 1.625rem | 1.75rem | 2rem | 2.375rem | 2.75rem |
| 섹션 제목 `--fs-h2` | 1.3125rem | 1.375rem | 1.5rem | 1.75rem | 2rem |
| 카드 제목 `--fs-h3` | 1.125rem | 1.125rem | 1.1875rem | 1.25rem | 1.3125rem |

입력창은 항상 16px 이상이라 iOS에서 포커스 시 화면이 확대되지 않는다.

### 화면 폭별 배치

| 폭 | 주요 변화 |
|---|---|
| **~479px** | 하단 탭바 내비게이션, 챗봇 전체 화면, 모달은 바텀시트, 카드 1열, CTA 버튼 가로 100%, 필터 칩 가로 스크롤, 달력은 점 표시 |
| **480px~** | 카드 2열, 폼 입력 2열, 페이지 번호 3개 → 5개, AI 인사이트 사진 표시 |
| **768px~** | 탭바 → 상단 메뉴, 챗봇 플로팅 패널, 모달 중앙 다이얼로그, 게시글 2열, 섹션 헤더 버튼 오른쪽, 달력에 축제 이름 표시 |
| **1024px~** | 홈 히어로 2단, 상세 화면 본문 + 사이드(sticky) 2단, 축제 달력 + 선택일 패널 2단, 카드 3열 |
| **1280px~** | 게시글 3열, 헤더에 `Seoul` 칩 |
| **1440px~** | 카드 4열, 루트 글자 17px |

### 디자인 시스템 구성

- **토큰**: 의미 기반 색상(라이트/다크), 간격, 반경, 그림자, z-index, 모션
- **폰트**: SUIT Variable (일본어·중국어는 시스템 폰트로 자연스럽게 폴백)
- **컴포넌트**: `SButton` `SIconButton` `SCard` `SBadge` `STag` `SChipGroup` `SField` `SInput` `STextarea` `SSelect` `SSearchField` `SPagination` `SSkeleton` `SEmptyState` `SModal` `SSectionHeader` `SInfoList` `SImage` `SMediaHero` `SAvatar` `SSpinner`

---

## Internationalization

외국인 여행자도 사용할 수 있도록 **모든 UI 문구를 7개 언어**로 제공한다.

| 코드 | 언어 | 코드 | 언어 |
|---|---|---|---|
| `ko` | 한국어 | `fr` | Français |
| `en` | English | `es` | Español |
| `ja` | 日本語 | `de` | Deutsch |
| `zh` | 中文(简体) | | |

- 첫 방문 시 **브라우저 언어를 자동 감지**하고, 선택한 언어는 저장된다.
- 사전: `src/shared/i18n/locales/*.ts` — `ko.ts`가 스키마이며 다른 언어에 키가 빠지면 **타입 오류**가 난다.
- 날짜·월·요일·숫자는 `Intl`로 각 언어 형식에 맞게 표시한다. (예: `10월` / `Oct` / `10月` / `oct.`)
- 문서 제목, 접근성 라벨(aria-label), 디자인 시스템 내부 문구까지 번역된다.
- 장소명·축제 설명 등 **백엔드 데이터는 서버가 주는 언어 그대로** 표시된다. 챗봇에는 현재 언어가 전달된다.

---

## Conventions

브랜치·커밋·PR 규칙은 [`CONTRIBUTING.md`](CONTRIBUTING.md)에 있다.

```text
브랜치  <type>/<설명>            feat/place-bookmark, fix/42-comment-count
커밋    <type>(<scope>): <제목>   feat(place): 장소 목록 URL 쿼리 동기화
```

| 시점 | 자동 검사 (husky) |
|---|---|
| commit | 브랜치 이름 검사(main 직접 커밋 차단) → lint-staged(oxlint · ESLint · Prettier) |
| commit-msg | commitlint (Conventional Commits) |
| push | 브랜치 이름 검사 → `npm run type-check` |

---

## Gamification — 서울 혼행 여정 지도

홈 화면에 **서울 25개 자치구 지도**가 있다. 구를 누르면 그 구 이름으로 장소를 검색해 **무작위 최대 10곳**을 오른쪽 목록에 보여주고, 다른 구를 누르면 그 구에 맞게 바뀐다.

| 상태 | 오른쪽 목록 |
|---|---|
| 구 선택 안 함 (ALL) | 검색어 없이 받아 **여러 구가 골고루 섞이도록** 최대 10곳 |
| 구 선택 | `q=<구 이름>`으로 검색한 결과 중 무작위 최대 10곳 (같은 구를 다시 누르면 ALL) |
| API 연결 실패 | 25개 구 대표 명소 **예시 데이터** + "예시 데이터" 안내 |
| **전체 보기** | 서울 탐색 페이지(`/explore?q=<구 이름>`)로 이동해 그 구 전체 검색 결과 표시 |

- **구 소개**: 구를 선택하면 지도 아래에 구 이름(제목)과 관광 소개글이 7개 언어로 나온다. 둘러본 구는 지도에서 색으로 채워진다.
- **미션 5개** (앱에서 실제로 하면 자동 완료 → 어느 화면에서든 완료 알림)

| # | 미션 | 완료 조건 |
|---|---|---|
| 01 | 장소 탐색 | 장소 상세 페이지 열기 |
| 02 | 북마크 | 장소 북마크 |
| 03 | 축제 확인 | 축제 상세 페이지 열기 |
| 04 | AI 챗봇 | 챗봇 답변 받기 |
| 05 | 경험 공유 | 좋아요 · 댓글 · 새 글 중 하나 |

- 레벨: 혼행 준비생(0) → 입문자(1~2) → 탐험가(3~4) → **서울 혼행 마스터(5)**
- 진행 상황은 로그인 없이 브라우저(localStorage)에 저장, "처음부터 다시"로 초기화
- 반응형: 1024px 이상 지도(고정) | 추천 목록 2단 / 미만은 지도 → 구 선택 칩(가로 스크롤) → 목록
- 구 이름은 7개 언어로 표시(Gangnam-gu, 江南区 …), 검색은 데이터 기준인 한국어 이름으로 한다.
- 지도 경계: 통계청(KOSTAT) 센서스용 행정구역경계(2013) 간소화 데이터를 SVG로 변환 (`seoul-map.generated.ts`)

코드: `src/entities/district`(구 목록·지도·예시 데이터·탐험 상태), `src/entities/journey`(미션·레벨), `src/widgets/journey-map`(지도 + 추천 목록 + 진행 현황), `src/widgets/journey-toast`

---

## Changelog

### 2026-10-13 — 자치구 소개글

- 지도 아래 "둘러본 구 n / 25" 수치를 없애고, 선택한 구의 이름과 관광 소개글을 표시 (25개 구 × 7개 언어)

### 2026-10-13 — 서울 자치구 여정 지도

- 여정 지도를 서울 25개 자치구 SVG 지도로 교체: 구 선택 → 구 이름 검색 → 무작위 최대 10곳 추천
- 선택 없음(ALL)은 여러 구 골고루, API 실패 시 예시 데이터, "전체 보기"는 서울 탐색 검색으로 이동
- 둘러본 구 색칠(탐험 n/25), 미션은 진행 현황 칩으로 이동
- `@soulrip/library`에 `shuffle`, `pickSpread` 추가

### 2026-10-13 — 혼행 여정 지도(게이미피케이션)

- 홈에 도면형 여정 지도 + 5단계 미션 + 스탬프·레벨·완료 알림 추가
- 장소·북마크·축제·챗봇·커뮤니티 행동과 미션 자동 연결
- 챗봇 열림 상태를 전역 공유해 지도에서 바로 열 수 있게 변경
- `@soulrip/library/vue`에 `useScrollSpy` 추가
- 헤더 로고 이미지 제거(텍스트만), 히어로 제목 밑줄 제거, 챗봇 고양이 이미지 잘림 수정

### 2026-10-13 — 프론트엔드 구조 개편

**구조**

- `src/views · components · services · types · composables` → **FSD 레이어**(`app/pages/widgets/features/entities/shared`)로 재구성
- 페이지를 서버 도메인별(`home`, `place`, `festival`, `post`, `not-found`)로 배치
- 공통 코드를 `src` 바깥 workspace 패키지로 분리: `@soulrip/library`, `@soulrip/config`, `@soulrip/font-suit`, `@soulrip/design-system`, `@soulrip/api`
- API를 도메인별(place / festival / post / comment / like / chat / insight) **타입 · 요청 파일로 분리**, 오류는 `ApiError`로 통일
- 각 슬라이스를 `ui`(화면) / `model`(상태·로직) / `lib`(순수 함수)로 관심사 분리

**디자인 시스템 · 반응형**

- 디자인 토큰, 라이트/다크 테마(OS 설정 자동 + 첫 화면 깜빡임 방지), SUIT 폰트, 공통 컴포넌트 21종
- 폭별 루트 글자 크기 + 제목 타입 스케일, 브레이크포인트 7단계
- 모바일 하단 탭바, 전체 화면 챗봇, 바텀시트 모달, 가로 스크롤 없는 모바일 축제 달력, safe-area(노치) 대응
- 다크 모드에서 흰 배경이 남던 화면(목록·폼·상세·달력) 수정

**다국어**

- DOM 텍스트를 사후 치환하던 방식 → **타입 검사되는 7개 언어 사전**으로 교체, 전 화면 번역
- 브라우저 언어 자동 감지, `Intl` 기반 날짜·숫자 포맷, 일본어·중국어 줄바꿈 처리

**화면 보완**

- 장소·게시글·축제 목록의 검색/필터/페이지를 **URL 쿼리와 동기화** (새로고침·뒤로가기·공유 유지)
- 홈 인기 키워드가 실제 검색으로 연결되도록 수정, 존재하지 않던 `/chat` 링크 제거
- 홈 섹션을 독립 로딩(한 섹션 실패가 전체를 막지 않음), 통계를 API 실제 개수로 표시
- 장소 목록 페이지네이션 추가, 축제 달력은 한 달치를 별도 요청(기존: 목록 12개만 표시)
- 축제 상세 "동행 모집하기" → 글쓰기 화면에 유형·장소·날짜 미리 채움
- 좋아요 상태 조회 실패가 게시글 전체 오류로 번지던 문제 수정
- 챗봇: 추천 후속 질문·관련 장소 링크 표시, 대화 초기화, 언어 전환 시 인사말 즉시 번역
- 404 페이지, 본문 바로가기 링크, 라우트별 문서 제목, 폼 라벨·오류 접근성 연결

**개발 환경**

- ESLint(flat config, FSD import 규칙) + oxlint + Prettier + EditorConfig
- husky + lint-staged + commitlint, 브랜치 이름 검사, PR 템플릿

---

## Project Planning with Generative AI

Soulrip은 개발 과정뿐 아니라 **프로젝트 기획 단계에서도 생성형 AI를 적극적으로 활용한 프로젝트**이다.

다만 AI가 생성한 결과를 그대로 사용하는 방식이 아니라 프로젝트 제약조건과 RFP를 기준으로 결과를 검토하고 다시 프롬프트를 수정하는 반복적인 방식으로 활용하였다.

전체 과정은 다음과 같다.

```text
RFP 분석
   ↓
요구사항 구조화
   ↓
MoSCoW 우선순위 정의
   ↓
기능 후보 평가
   ↓
MVP 범위 결정
   ↓
WBS 작성
   ↓
UI 방향 정의
   ↓
서비스 컨셉 고도화
```

---

## Prompt Engineering Process

### 1. RFP Analysis

가장 먼저 AI에게 PM 역할을 부여하고 RFP의 요구사항을 분석하도록 하였다.

```text
20년 이상의 프로젝트 관리 경험을 가진 PM의 관점에서
첨부한 개발 의뢰서(RFP)를 분석해줘.

요구사항을
[구분(필수/선택/제약), 항목, 상세 내용, 근거 조항, 검토 의견]
형태로 구조화해줘.
```

특히 `반드시`, `금지`, `절대`와 같은 표현을 별도의 제약조건으로 분류하여 필수 구현 사항이 일반 아이디어와 섞이지 않도록 하였다.

---

### 2. Requirement Prioritization

분석된 요구사항은 MoSCoW 방식으로 다시 정리하였다.

```text
Must
Should
Could
Won't
```

이를 통해 RFP 요구사항과 추가 아이디어를 동일한 우선순위로 다루지 않고, 구현 범위를 명확하게 결정하였다.

---

### 3. Feature Evaluation

기능 아이디어를 평가할 때 다음 프로젝트 조건을 AI에게 명시하였다.

```text
개발 기간: n일
개발 인원: 신입 개발자 중심 3명
Frontend: Vue.js 3
Backend: FastAPI
Database: SQLite
AI: OpenAI API
Development Tool: VS Code Copilot
```

각 기능은 다음 기준으로 평가하였다.

```text
Implementation Difficulty
Feasibility
User Impact
```

단순히 좋은 기능을 추천하도록 하는 것이 아니라 **현재 팀이 실제로 구현할 수 있는 기능인지 판단하도록 프롬프트의 제약조건을 강화하였다.**

---

### 4. MVP Definition

RFP 분석과 기능 평가 결과를 결합하여 MVP를 정의하였다.

이 과정에서 AI의 초기 결과에서 필수 기능인 익명 커뮤니티와 지역 정보 챗봇이 충분히 반영되지 않은 경우 추가 프롬프트를 통해 이를 수정하였다.

즉 AI의 첫 번째 답변을 최종 결과로 사용하지 않고 요구사항과 비교하면서 지속적으로 수정하였다.

---

### 5. WBS Planning

확정된 MVP를 기반으로 n일간의 WBS를 구성하였다.

작업은 다음 기준으로 분리하였다.

```text
Planning
Design
Development
Deployment
Testing
Documentation
Presentation
```

Frontend와 Backend 작업을 병렬로 진행할 수 있도록 선행 관계를 정의하고 제한된 개발 기간에 맞춰 일정의 우선순위를 조정하였다.

---

### 6. UI Direction

서비스 디자인을 바로 생성하도록 요청하는 대신 먼저 AI가 UI 설계에 필요한 정보를 질문하도록 구성하였다.

이후 다음과 같은 디자인 조건을 전달하였다.

```text
Mood: Hip & Trendy
Region Image: Modern Seoul
Main Color: Blue
Theme: Light
Font: Pretendard
Primary User: Solo Traveler
Home Priority: Place Discovery
Card Style: Instagram / Pinterest
```

이를 통해 임의의 UI를 생성하도록 하는 대신 서비스 타깃과 컨셉을 디자인 결과에 반영하도록 하였다.

---

### 7. Service Concept Refinement

초기에는 서울 관광 정보 서비스에 가까웠지만 이후 서비스의 차별성을 높이기 위해 **Solo Travel이라는 사용자 상황을 중심으로 서비스를 다시 정의하였다.**

추가 데이터를 만드는 대신 기존에 제공받은 데이터를 혼행 관점에서 재해석하였다.

```text
관광지
레포츠
문화시설
쇼핑
숙박
여행코스
축제·공연·행사
```

이를 기반으로 Soulrip의 핵심 사용자 흐름인

```text
Discover Solo → Plan Solo → Share Solo
```

를 정의하였다.

---

## Prompt Design Principles

프롬프트 작성 시 다음 정보를 가능한 한 구체적으로 제공하였다.

### Role

```text
20년 이상의 프로젝트 관리 경험을 가진 PM
```

AI가 단순한 아이디어 생성이 아니라 요구사항 분석과 프로젝트 의사결정을 수행하도록 역할을 지정하였다.

### Constraints

```text
n일 개발
3인 팀
Vue.js 3
FastAPI
SQLite
VS Code Copilot
OpenAI API
```

제약조건을 명확하게 제공하여 현실적으로 구현하기 어려운 기능이 과도하게 추천되지 않도록 하였다.

### Context

```text
서울
혼자 여행하는 사용자
서울 공공 관광 데이터
익명 서비스
```

서비스가 해결해야 하는 문제와 타깃 사용자를 함께 제공하였다.

### Output Format

```text
Requirement Table
MoSCoW
Feature Evaluation
MVP
WBS
Gantt Chart
```

결과의 형식을 미리 지정하여 팀 문서에 바로 활용할 수 있도록 하였다.

---

## Iterative Prompt Improvement

Soulrip의 기획 과정에서 가장 중요하게 사용한 방식은 **프롬프트를 한 번 작성하고 끝내는 것이 아니라 결과를 검토하고 다시 수정하는 것**이었다.

예를 들어 초기 결과에서 다음 문제가 발생하였다.

* RFP 필수 기능 누락
* 프로젝트 기간에 비해 과도한 기능 제안
* 제공 데이터 범위를 벗어난 기능 추천
* 서비스 타깃과 연결되지 않은 일반적인 관광 기능 제안

이 경우 프롬프트에 추가 제약조건을 넣어 다시 결과를 생성하였다.

전체 과정은 다음과 같다.

```text
요구사항 분석
      ↓
제약조건 반영
      ↓
AI 결과 생성
      ↓
결과 검토
      ↓
누락 및 오류 확인
      ↓
프롬프트 보완
      ↓
재생성
      ↓
최종 기획 의사결정
```

생성형 AI를 의사결정의 주체로 사용하는 것이 아니라 **기획자가 판단하기 위한 분석 도구로 활용하는 방식**을 목표로 하였다.

---

## What We Learned

### AI에게 프로젝트 맥락을 충분히 제공해야 한다

기술 스택이나 기간을 제공하지 않으면 실제 프로젝트에서 구현하기 어려운 기능이 쉽게 추천된다.

따라서 기간, 팀 구성, 기술 스택, 데이터 범위와 같은 현실적인 조건을 프롬프트에 함께 제공하는 것이 중요하였다.

### AI의 첫 번째 결과를 그대로 사용하지 않는다

AI의 응답에서도 RFP 필수 기능이 누락되는 경우가 있었다.

따라서 원본 요구사항과 AI 결과를 비교하고 누락된 요구사항을 다시 입력하는 과정이 필요하였다.

### 기능보다 사용자 흐름을 먼저 정의하는 것이 중요하다

초기에는 관광지, 지도, 챗봇, 커뮤니티가 각각 독립적인 기능처럼 구성되어 있었다.

서비스 컨셉을 혼행으로 좁힌 이후

```text
Discover → Plan → Share
```

라는 사용자 흐름을 기준으로 기능을 다시 연결하면서 Soulrip의 서비스 정체성이 명확해졌다.

### 생성형 AI는 기획을 대신하는 도구가 아니다

Soulrip에서는 AI가 생성한 결과를 그대로 결정사항으로 사용하지 않았다.

```text
AI가 선택한다
```

가 아니라

```text
AI가 분석한다
→ 팀이 검토한다
→ 필요한 조건을 추가한다
→ 다시 분석한다
→ 팀이 최종 결정한다
```

라는 방식으로 활용하였다.

---

## Result

Soulrip은 제한된 n일의 개발 기간 동안 RFP의 필수 요구사항을 구현하면서도 **혼자 서울을 여행하는 사용자라는 명확한 타깃을 중심으로 서비스 기능을 연결한 프로젝트**이다.

특히 생성형 AI를 단순 코드 생성 도구뿐 아니라 요구사항 분석, 기능 평가, MVP 정의, 일정 계획, UI 방향 탐색, 서비스 컨셉 구체화 과정까지 활용하였다.

이를 통해 다음과 같은 AI 협업 프로세스를 경험하였다.

> **Context 제공 → AI 분석 → 결과 검증 → Prompt 보완 → 의사결정 → 구현**

Soulrip의 핵심은 많은 기능을 구현하는 것이 아니라 제한된 데이터와 개발 기간 안에서 **사용자의 여행 흐름을 하나의 경험으로 연결하는 것**에 있다.
