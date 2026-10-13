<script setup lang="ts">
import { useI18n } from '@/shared/i18n'
import { DISTRICTS, type DistrictId } from '../config/districts'
import { SEOUL_DISTRICT_SHAPES, SEOUL_MAP_VIEWBOX } from '../config/seoul-map.generated'
import { districtName } from '../lib/district'
import { useDistrictExploration } from '../model/exploration'

defineProps<{
  /** 선택한 구. null이면 전체(ALL) */
  selected: DistrictId | null
  /** 지도 전체의 접근성 이름 */
  label: string
  /** 각 구의 접근성 이름 */
  districtLabel: (name: string, explored: boolean) => string
}>()
const emit = defineEmits<{ select: [id: DistrictId] }>()

const { lang } = useI18n()
const { isExplored } = useDistrictExploration()

function shapeOf(id: DistrictId) {
  return SEOUL_DISTRICT_SHAPES[id]!
}
</script>

<template>
  <!--
    서울 25개 자치구 지도 (SVG, 화면 폭에 맞춰 비율 유지)
    - 기본: 흰 면 + 파란 경계
    - 둘러본 구: 연한 파랑으로 채워짐 (탐험 게이미피케이션)
    - 선택한 구: 진한 파랑 + 흰 글자
    - 키보드: Tab으로 구 이동, Enter/Space로 선택
  -->
  <svg class="seoul-map" :viewBox="SEOUL_MAP_VIEWBOX" role="group" :aria-label="label">
    <path
      v-for="district in DISTRICTS"
      :key="district.id"
      class="seoul-map__district"
      :class="{
        'is-selected': selected === district.id,
        'is-explored': isExplored(district.id),
      }"
      :d="shapeOf(district.id).path"
      role="button"
      tabindex="0"
      :aria-pressed="selected === district.id"
      :aria-label="districtLabel(districtName(district, lang), isExplored(district.id))"
      @click="emit('select', district.id)"
      @keydown.enter.prevent="emit('select', district.id)"
      @keydown.space.prevent="emit('select', district.id)"
    />

    <!-- 라벨은 클릭을 가로채지 않도록 별도 레이어에 둔다. -->
    <g class="seoul-map__labels" aria-hidden="true">
      <text
        v-for="district in DISTRICTS"
        :key="district.id"
        class="seoul-map__label"
        :class="{ 'is-selected': selected === district.id }"
        :x="shapeOf(district.id).label[0]"
        :y="shapeOf(district.id).label[1]"
      >
        {{ districtName(district, lang, 'short') }}
      </text>
    </g>
  </svg>
</template>

<style scoped>
.seoul-map {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.seoul-map__district {
  fill: var(--color-surface);
  stroke: var(--color-primary);
  stroke-width: 1.5;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
  cursor: pointer;
  outline: none;
  transition:
    fill var(--duration-base) var(--ease-standard),
    filter var(--duration-base) var(--ease-standard);
}

.seoul-map__district.is-explored {
  fill: color-mix(in srgb, var(--color-primary) 18%, var(--color-surface));
}

@media (hover: hover) {
  .seoul-map__district:hover {
    fill: color-mix(in srgb, var(--color-primary) 30%, var(--color-surface));
  }
}

.seoul-map__district:focus-visible {
  stroke-width: 3;
  fill: color-mix(in srgb, var(--color-primary) 30%, var(--color-surface));
}

.seoul-map__district.is-selected {
  fill: var(--color-primary);
  filter: drop-shadow(0 6px 10px color-mix(in srgb, var(--color-primary) 45%, transparent));
}

.seoul-map__label {
  fill: var(--color-text);
  font-size: 26px;
  font-weight: var(--fw-bold);
  letter-spacing: -0.02em;
  text-anchor: middle;
  dominant-baseline: central;
  pointer-events: none;
  /* 경계선 위에서도 읽히도록 바탕색 테두리 */
  paint-order: stroke;
  stroke: var(--color-surface);
  stroke-width: 5px;
  stroke-linejoin: round;
}

.seoul-map__label.is-selected {
  fill: #fff;
  stroke: var(--color-primary);
}

/* 작은 화면: 지도가 작아지므로 라벨을 상대적으로 키운다 (~10px) */
@media (max-width: 479.98px) {
  .seoul-map__label {
    font-size: 30px;
  }
}
</style>
