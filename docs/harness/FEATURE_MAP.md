# Soulrip Feature Map

| 도메인 | 주요 Route | Page | Widget / Feature / Entity | API (`@soulrip/api`) |
|---|---|---|---|---|
| Home | `/` | `pages/home` | `today-insight`, `PlaceCard`, `FestivalCard`, `PostCard` | `placeApi`, `festivalApi`, `postApi`, `insightApi` |
| Place | `/explore`, `/places/:id` | `pages/place` | `place-filter`, `place-bookmark`, `share-link`, `location-map`, `entities/place` | `placeApi` (`Place`, `PlaceCategory`) |
| Festival | `/festivals`, `/festivals/:id` | `pages/festival` | `festival-month-filter`, `festival-calendar`, `location-map`, `entities/festival` | `festivalApi` (`Festival`) |
| Post | `/community`, `/community/new`, `/community/:id`, `/community/:id/edit` | `pages/post` | `post-filter`, `post-editor`, `post-like`, `post-delete`, `post-comments`, `comment-create`, `entities/post`, `entities/comment` | `postApi`, `commentApi`, `likeApi` |
| Chat | 전역 위젯 | — | `widgets/chatbot` | `chatApi` |
| Journey (게이미피케이션) | 홈 `#journey` | `pages/home` | `widgets/journey-map`, `widgets/journey-toast`, `entities/journey` | — (localStorage) |
| App | 전역 | `pages/not-found` | `app-header`, `mobile-tab-bar`, `app-footer`, `theme-toggle`, `language-switch` | — |

## Change Impact Examples

### Add Place Filter

`PlaceCategory`(api types) → `PLACE_CATEGORY_CONTENT_TYPES`(place.api) → `PLACE_FILTERS`(entities/place) → `t.place.filters` 7개 언어 → `PlaceFilterBar`

### Add Festival API Field

`festival.types.ts` → `entities/festival/lib` → `FestivalCard` / `FestivalDetailPage`

### Add Community Post Type

`PostType`(post.types) → `POST_FILTER_TYPES` / `WRITABLE_POST_TYPES` / 아이콘(entities/post) → `t.post.types` 7개 언어

### Add Journey Mission

`JOURNEY_STEPS`(entities/journey/config) → `t.journey.steps` 7개 언어 → 완료 시점에 `completeJourneyStep(id)` 호출(해당 feature/page model)

### Add Supported Language

`Lang` + `LANGUAGES`(@soulrip/config) → `src/shared/i18n/locales/<code>.ts` 생성(`Messages` 타입) → `shared/i18n/index.ts` 등록 → 백엔드 chat language 지원 확인
