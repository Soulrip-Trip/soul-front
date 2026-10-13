<script setup lang="ts">
import { computed } from 'vue'
import { ExternalLink, MapPinned } from 'lucide-vue-next'
import { SBadge, SButton, SEmptyState } from '@soulrip/design-system'
import { osmEmbedUrl, osmViewUrl, type LatLng } from '@soulrip/library'
import { useI18n } from '@/shared/i18n'

const props = defineProps<{
  /** null이면 "위치 정보 없음" 상태를 보여준다. */
  coordinates: LatLng | null
  title: string
}>()

const { t } = useI18n()

const embedUrl = computed(() => (props.coordinates ? osmEmbedUrl(props.coordinates) : ''))
const viewUrl = computed(() => (props.coordinates ? osmViewUrl(props.coordinates) : ''))
</script>

<template>
  <!--
    지도 높이: ~479px 16rem / 480px~ 20rem / 768px~ 26rem
    헤더: 768px 미만에서 제목 아래로 "큰 지도 열기" 버튼이 가로 100%로 내려간다.
  -->
  <section class="location-map">
    <header class="location-map__header">
      <div>
        <SBadge>
          <MapPinned :size="15" aria-hidden="true" />
          {{ t.map.badge }}
        </SBadge>
        <h2 class="location-map__title ds-h2">{{ t.map.title(title) }}</h2>
      </div>
      <SButton
        v-if="coordinates"
        variant="secondary"
        size="sm"
        :href="viewUrl"
        external
        class="location-map__open"
      >
        {{ t.map.open }}
        <ExternalLink :size="15" aria-hidden="true" />
      </SButton>
    </header>

    <iframe
      v-if="coordinates"
      class="location-map__frame"
      :src="embedUrl"
      :title="t.map.iframeTitle(title)"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    />

    <SEmptyState
      v-else
      :title="t.map.emptyTitle"
      :description="t.map.emptyDescription"
      plain
      class="location-map__empty"
    >
      <template #icon>
        <MapPinned :size="28" />
      </template>
    </SEmptyState>
  </section>
</template>

<style scoped>
.location-map {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

@media (min-width: 768px) {
  .location-map {
    border-radius: var(--radius-2xl);
  }
}

.location-map__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5) var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .location-map__header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    padding: var(--space-6) var(--space-7);
  }
}

.location-map__title {
  margin-top: var(--space-2-5);
}

@media (max-width: 767.98px) {
  .location-map__open {
    width: 100%;
  }
}

.location-map__frame {
  display: block;
  width: 100%;
  height: 16rem;
  border: 0;
  background: var(--color-surface-alt);
}

@media (min-width: 480px) {
  .location-map__frame {
    height: 20rem;
  }
}

@media (min-width: 768px) {
  .location-map__frame {
    height: 26rem;
  }
}

.location-map__empty {
  border-radius: 0;
  background: var(--color-surface-alt);
}
</style>
