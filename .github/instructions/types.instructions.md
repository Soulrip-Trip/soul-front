---
name: Soulrip Domain Types
description: API 도메인 타입에 적용하는 규칙이다
applyTo: "packages/api/src/**/*.types.ts,packages/api/src/core/types.ts"
---

# Type Rules

- API 응답·요청 타입은 해당 도메인 폴더의 `<domain>.types.ts`에 둔다. 공통 페이지네이션 타입은 `core/types.ts`에 있다.
- `PlaceCategory`, `PostType`처럼 값의 종류가 정해진 도메인에는 유니온 타입을 사용한다. 언어 타입 `Lang`은 `@soulrip/config`에 있다.
- 백엔드에서 null이 가능한 필드는 `| null`로 명시한다.
- 실제 백엔드 필드명을 그대로 반영한다.
- `any`를 쓰지 않는다.
- 화면 전용 파생 타입(카드 뷰 모델 등)은 API 패키지가 아니라 해당 슬라이스의 `model`/`lib`에 둔다.
- 기존 타입을 좁히기 전에 모든 사용 위치를 찾고 실제 API 데이터가 새 조건을 만족하는지 확인한다.
