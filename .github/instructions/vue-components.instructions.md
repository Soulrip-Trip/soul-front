---
name: Soulrip Vue Components
description: widgets/features/entities와 디자인 시스템 컴포넌트에 적용하는 규칙이다
applyTo: "src/widgets/**/*.vue,src/features/**/*.vue,src/entities/**/*.vue,packages/design-system/src/components/**/*.vue"
---

# Component Rules

- `<script setup lang="ts">`와 타입이 지정된 `defineProps` / `defineEmits` / `defineModel`을 사용한다.
- 새 UI를 만들기 전에 `@soulrip/design-system`의 `S*` 컴포넌트(SButton, SCard, SBadge, STag, SChipGroup, SField, SInput, STextarea, SSelect, SSearchField, SPagination, SSkeleton, SEmptyState, SModal, SSectionHeader, SInfoList, SImage, SMediaHero, SAvatar, SIconButton, SSpinner)를 재사용한다.
- 디자인 시스템 컴포넌트는 도메인·라우트·앱 i18n을 알지 못한다. 내부 문구는 `useDsMessages()`로 주입받는다.
- entities는 표시와 도메인 규칙, features는 사용자 행동 하나, widgets는 조합 블록을 담당한다.
- 요청·검증 로직은 같은 슬라이스의 `model/`로 분리한다.
- null 또는 빈 데이터를 정상 상태로 고려한다. 장소·축제 이미지와 좌표는 항상 존재하지 않는다.
- 문구는 `useI18n().t`에서 가져온다. 한국어를 템플릿에 하드코딩하지 않는다.
- 이미지에는 의미 있는 `alt`, 아이콘 전용 버튼에는 `SIconButton`(label)을 사용한다. 버튼 `type`을 명시한다.
- 안정적인 id가 있으면 index를 `key`로 쓰지 않는다.
- 반응형 동작을 바꾸면 템플릿 상단 주석(폭별 배치 설명)도 함께 갱신한다.
