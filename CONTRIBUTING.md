# Contributing — 브랜치 · 커밋 · PR 규칙

## 1. 처음 한 번

```bash
npm install                              # 의존성 + husky 훅 자동 설치 (prepare)
git config commit.template .gitmessage   # 커밋 메시지 템플릿 (선택)
```

## 2. 브랜치 전략 (GitHub Flow)

```text
main ─────●──────────●──────────●───────▶  항상 배포 가능한 상태, 직접 커밋 금지
           \        /  \        /
            feat/...    fix/...           작업 브랜치 → PR → 리뷰 → Squash merge
```

### 브랜치 이름

```text
<type>/<짧은-설명>
<type>/<이슈번호>-<짧은-설명>
```

| type | 용도 | 예시 |
|---|---|---|
| `feat` | 새 기능 | `feat/place-bookmark` |
| `fix` | 버그 수정 | `fix/42-comment-count` |
| `refactor` | 동작 변화 없는 구조 개선 | `refactor/fsd-design-system` |
| `style` | 포맷, 세미콜론 등 | `style/prettier` |
| `design` | UI/CSS 변경 | `design/mobile-tab-bar` |
| `docs` | 문서 | `docs/readme` |
| `test` | 테스트 | `test/date-utils` |
| `perf` | 성능 | `perf/lazy-images` |
| `build` / `ci` | 빌드·배포·CI | `ci/github-actions` |
| `chore` | 기타 설정·의존성 | `chore/deps` |
| `hotfix` | 운영 긴급 수정 | `hotfix/chat-crash` |
| `release` | 릴리스 준비 | `release/1.0.0` |

설명은 **영문 소문자 · 숫자 · `-` `_` `.`** 만 사용한다.
`husky pre-commit` / `pre-push`가 `scripts/check-branch-name.mjs`로 검사하고, **main에 직접 커밋하면 막힌다.**

## 3. 커밋 메시지 (Conventional Commits)

```text
<type>(<scope>): <subject>

<body — 무엇을, 왜>

<footer — Closes #12 / BREAKING CHANGE: ...>
```

- `type`: `feat` `fix` `refactor` `style` `design` `docs` `test` `perf` `build` `ci` `chore` `revert`
- `scope`(권장): `home` `place` `festival` `post` `comment` `like` `chat` `insight` `journey` `i18n` `app` `shared` `design-system` `api` `config` `library` `font` `deps` `lint` `docs`
- `subject`: 100자 이내, 마침표 없이, 명령형("추가", "수정"). 한글 사용 가능

```text
feat(place): 장소 목록 검색어를 URL 쿼리와 동기화
fix(post): 댓글 등록 후 commentCount가 갱신되지 않던 문제 수정
design(design-system): 모바일 모달을 바텀시트로 변경
docs: README에 반응형 규칙 추가
```

`husky commit-msg`에서 commitlint(`commitlint.config.ts`)가 검사한다.

## 4. 커밋 전 자동 검사 (lint-staged)

스테이징된 파일만 대상으로 실행된다.

| 파일 | 실행 |
|---|---|
| `*.ts`, `*.vue` | `oxlint --fix` → `eslint --fix` → `prettier --write` |
| `*.js`, `*.css`, `*.json`, `*.html`, `*.yml` | `prettier --write` |

push 전에는 `npm run type-check`가 실행된다.

> 긴급 상황에서 `--no-verify`로 우회했다면 PR 설명에 사유를 남긴다.

## 5. Pull Request

1. 작업 브랜치에서 `npm run check && npm run build` 통과 확인
2. PR 제목도 커밋 규칙과 같은 형식 (`feat(place): ...`)
3. `.github/pull_request_template.md` 체크리스트 작성 — 특히 **360 / 768 / 1440px 화면**, **7개 언어 문구**
4. 리뷰 1명 이상 승인 후 **Squash and merge** (PR 제목이 main의 커밋 메시지가 된다)
5. 병합 후 작업 브랜치 삭제

## 6. 코드 규칙 요약

- 구조·import 규칙: `AGENTS.md` §3~5 (ESLint가 강제)
- 디자인·반응형: `docs/DESIGN_SYSTEM.md`
- 사용자 노출 문구는 `src/shared/i18n/locales`의 7개 언어 파일에 함께 추가
