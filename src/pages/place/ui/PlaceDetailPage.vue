<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeft, Database, Layers, MapPin, Phone, Sparkles, Star, Tag } from 'lucide-vue-next'
import {
  SBadge,
  SButton,
  SCard,
  SEmptyState,
  SInfoList,
  SMediaHero,
  STag,
  type InfoItem,
} from '@soulrip/design-system'
import { BookmarkButton } from '@/features/place-bookmark'
import { ShareButton } from '@/features/share-link'
import { LocationMap } from '@/widgets/location-map'
import { paths } from '@/shared/config'
import { useI18n } from '@/shared/i18n'
import { usePlaceDetail } from '../model/usePlaceDetail'

const props = defineProps<{ id: string }>()

const { t } = useI18n()
const { place, view, loading, error, reload } = usePlaceDetail(() => props.id)

const visitorInfo = computed<InfoItem[]>(() => {
  if (!place.value || !view.value) return []
  const detail = t.value.place.detail

  return [
    {
      key: 'address',
      label: detail.address,
      value: view.value.address || t.value.common.none,
      icon: MapPin,
    },
    {
      key: 'district',
      label: detail.district,
      value: place.value.district || t.value.common.seoul,
      icon: Layers,
    },
    {
      key: 'phone',
      label: detail.phone,
      value: place.value.phone || t.value.common.none,
      icon: Phone,
      href: place.value.phone ? `tel:${place.value.phone.replace(/[^\d+]/g, '')}` : undefined,
    },
    {
      key: 'score',
      label: detail.soloScore,
      value:
        place.value.soloScore === null
          ? t.value.common.none
          : detail.scoreValue(place.value.soloScore),
      icon: Star,
    },
    { key: 'category', label: detail.category, value: view.value.category, icon: Tag },
  ]
})

const dataInfo = computed<InfoItem[]>(() =>
  place.value
    ? [
        {
          key: 'contentId',
          label: t.value.place.detail.contentId,
          value: place.value.contentId,
          icon: Database,
        },
        {
          key: 'contentType',
          label: t.value.place.detail.contentType,
          value: view.value?.category ?? t.value.common.none,
          icon: Layers,
        },
      ]
    : [],
)
</script>

<template>
  <div class="ds-page">
    <div class="ds-container">
      <SButton variant="ghost" size="sm" :to="paths.placeList()" class="detail-back">
        <ArrowLeft :size="16" aria-hidden="true" />
        {{ t.place.detail.back }}
      </SButton>

      <SEmptyState v-if="loading" tone="loading" :title="t.place.detail.loading" plain />

      <SEmptyState
        v-else-if="error || !place || !view"
        tone="error"
        :title="t.place.detail.errorTitle"
        :description="error"
      >
        <template #actions>
          <SButton variant="secondary" @click="reload">{{ t.common.retry }}</SButton>
          <SButton variant="ghost" :to="paths.placeList()">{{ t.common.backToList }}</SButton>
        </template>
      </SEmptyState>

      <template v-else>
        <SMediaHero :image="view.image" :alt="view.name">
          <SBadge tone="glass">
            <MapPin :size="14" aria-hidden="true" />
            {{ place.district || t.common.seoul }}
          </SBadge>
          <h1 class="ds-h1">{{ view.name }}</h1>
          <SBadge tone="solid" size="sm">{{ view.category }}</SBadge>
        </SMediaHero>

        <!--
          ~1023px : 본문 카드 → 혼행 팁 → 북마크/공유 → 데이터 정보 순서로 쌓인다.
          1024px~ : 왼쪽 본문 | 오른쪽 사이드(21.5rem, 스크롤 시 헤더 아래 고정)
        -->
        <div class="ds-split detail-body">
          <SCard as="article" padding="lg" class="detail-main">
            <h2 class="ds-h3">{{ t.place.detail.about }}</h2>
            <p class="detail-summary">{{ view.summary }}</p>

            <ul v-if="view.tags.length" class="detail-tags">
              <li v-for="tag in view.tags" :key="tag"><STag :label="tag" size="md" /></li>
            </ul>

            <h2 class="ds-h3 detail-subtitle">{{ t.place.detail.visitorInfo }}</h2>
            <SInfoList :items="visitorInfo" layout="grid" />
          </SCard>

          <aside class="ds-split__aside detail-aside">
            <SCard tone="soft" padding="md">
              <SBadge tone="solid" size="sm">
                <Sparkles :size="13" aria-hidden="true" />
                {{ t.place.detail.tipBadge }}
              </SBadge>
              <p class="detail-tip">{{ t.place.detail.tipTitle }}</p>
            </SCard>

            <div class="detail-actions">
              <BookmarkButton :place-id="place.contentId" />
              <ShareButton :title="view.name" :text="view.address" />
            </div>

            <SCard padding="md">
              <h2 class="ds-h3 detail-aside__title">{{ t.place.detail.dataInfo }}</h2>
              <SInfoList :items="dataInfo" />
            </SCard>
          </aside>
        </div>

        <LocationMap class="detail-map" :coordinates="view.coordinates" :title="view.name" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.detail-back {
  margin-bottom: var(--space-4);
  margin-left: calc(var(--space-3) * -1);
}

.detail-body {
  margin-top: var(--grid-gap);
}

.detail-main {
  display: grid;
  align-content: start;
  gap: var(--space-4);
}

.detail-summary {
  color: var(--color-text-muted);
  font-size: var(--fs-body);
  line-height: var(--lh-relaxed);
  word-break: var(--word-break);
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.detail-subtitle {
  margin-top: var(--space-4);
}

.detail-aside {
  display: grid;
  gap: var(--grid-gap);
}

.detail-tip {
  margin-top: var(--space-3);
  font-size: var(--fs-body);
  font-weight: var(--fw-bold);
  line-height: var(--lh-snug);
  word-break: var(--word-break);
}

/* 북마크 | 공유: 항상 2열 (버튼이 짧아 모바일에서도 충분) */
.detail-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2-5);
  padding-bottom: var(--space-4);
}

.detail-aside__title {
  margin-bottom: var(--space-3);
}

.detail-map {
  margin-top: var(--grid-gap);
}
</style>
