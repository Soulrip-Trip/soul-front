<script setup lang="ts">
import { computed } from 'vue'
import {
  ArrowLeft,
  CalendarDays,
  Database,
  Layers,
  MapPin,
  Phone,
  Sparkles,
  UsersRound,
} from 'lucide-vue-next'
import {
  SBadge,
  SButton,
  SCard,
  SEmptyState,
  SInfoList,
  SMediaHero,
  type InfoItem,
} from '@soulrip/design-system'
import { ShareButton } from '@/features/share-link'
import { LocationMap } from '@/widgets/location-map'
import { paths } from '@/shared/config'
import { useI18n } from '@/shared/i18n'
import { useFestivalDetail } from '../model/useFestivalDetail'

const props = defineProps<{ id: string }>()

const { t } = useI18n()
const { festival, view, loading, error, reload } = useFestivalDetail(() => props.id)

const visitorInfo = computed<InfoItem[]>(() => {
  if (!festival.value || !view.value) return []
  const detail = t.value.festival.detail

  return [
    { key: 'period', label: detail.period, value: view.value.period, icon: CalendarDays },
    {
      key: 'place',
      label: detail.place,
      value:
        [festival.value.location, festival.value.addressDetail].filter(Boolean).join(' ') ||
        t.value.common.none,
      icon: MapPin,
    },
    {
      key: 'district',
      label: detail.district,
      value: festival.value.district || t.value.common.none,
      icon: Layers,
    },
    {
      key: 'phone',
      label: detail.phone,
      value: festival.value.phone || t.value.common.none,
      icon: Phone,
      href: festival.value.phone ? `tel:${festival.value.phone.replace(/[^\d+]/g, '')}` : undefined,
    },
  ]
})

const dataInfo = computed<InfoItem[]>(() =>
  festival.value
    ? [
        {
          key: 'contentId',
          label: t.value.festival.detail.contentId,
          value: festival.value.contentId,
          icon: Database,
        },
      ]
    : [],
)
</script>

<template>
  <div class="ds-page">
    <div class="ds-container">
      <SButton variant="ghost" size="sm" :to="paths.festivalList()" class="detail-back">
        <ArrowLeft :size="16" aria-hidden="true" />
        {{ t.festival.detail.back }}
      </SButton>

      <SEmptyState v-if="loading" tone="loading" :title="t.festival.detail.loading" plain />

      <SEmptyState
        v-else-if="error || !festival || !view"
        tone="error"
        :title="t.festival.detail.errorTitle"
        :description="error"
      >
        <template #actions>
          <SButton variant="secondary" @click="reload">{{ t.common.retry }}</SButton>
          <SButton variant="ghost" :to="paths.festivalList()">{{ t.common.backToList }}</SButton>
        </template>
      </SEmptyState>

      <template v-else>
        <SMediaHero :image="view.image" :alt="view.name">
          <SBadge tone="glass">{{ festival.category || t.festival.fallbackCategory }}</SBadge>
          <h1 class="ds-h1">{{ view.name }}</h1>
          <!-- ~479px: 기간/장소가 두 줄 / 480px~: 한 줄 -->
          <div class="hero-meta">
            <span><CalendarDays :size="15" aria-hidden="true" />{{ view.period }}</span>
            <span v-if="festival.location"
              ><MapPin :size="15" aria-hidden="true" />{{ festival.location }}</span
            >
          </div>
        </SMediaHero>

        <div class="ds-split detail-body">
          <SCard as="article" padding="lg" class="detail-main">
            <h2 class="ds-h3">{{ t.festival.detail.about }}</h2>
            <p class="detail-description">
              {{ festival.description || t.festival.detail.noDescription }}
            </p>

            <h2 class="ds-h3 detail-subtitle">{{ t.festival.detail.visitorInfo }}</h2>
            <SInfoList :items="visitorInfo" layout="grid" />
          </SCard>

          <aside class="ds-split__aside detail-aside">
            <SCard tone="soft" padding="md" class="detail-tip">
              <SBadge tone="solid" size="sm">
                <Sparkles :size="13" aria-hidden="true" />
                {{ t.festival.detail.tipBadge }}
              </SBadge>
              <p>{{ t.festival.detail.tipTitle }}</p>
              <SButton :to="{ path: paths.postNew(), query: view.companionQuery }" block>
                <UsersRound :size="16" aria-hidden="true" />
                {{ t.festival.detail.companionCta }}
              </SButton>
            </SCard>

            <div class="detail-share">
              <ShareButton :title="view.name" :text="view.period" />
            </div>

            <SCard padding="md">
              <h2 class="ds-h3 detail-aside__title">{{ t.festival.detail.dataInfo }}</h2>
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

.hero-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-1-5) var(--space-4);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
}

@media (min-width: 480px) {
  .hero-meta {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.hero-meta span {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1-5);
}

.detail-body {
  margin-top: var(--grid-gap);
}

.detail-main {
  display: grid;
  align-content: start;
  gap: var(--space-4);
}

.detail-description {
  color: var(--color-text-muted);
  line-height: var(--lh-relaxed);
  white-space: pre-line;
  word-break: var(--word-break);
}

.detail-subtitle {
  margin-top: var(--space-4);
}

.detail-aside {
  display: grid;
  gap: var(--grid-gap);
}

.detail-tip {
  display: grid;
  justify-items: start;
  gap: var(--space-3);
}

.detail-tip p {
  font-weight: var(--fw-bold);
  line-height: var(--lh-snug);
  word-break: var(--word-break);
}

.detail-share {
  padding-bottom: var(--space-4);
}

.detail-aside__title {
  margin-bottom: var(--space-3);
}

.detail-map {
  margin-top: var(--grid-gap);
}
</style>
