<script setup lang="ts">
import { computed, type Ref } from 'vue'
import { MapPin, MessageCircle, PartyPopper } from 'lucide-vue-next'
import type { PaginationMeta } from '@soulrip/api'
import { FestivalCard } from '@/entities/festival'
import { PlaceCard } from '@/entities/place'
import { PostCard } from '@/entities/post'
import { paths } from '@/shared/config'
import { useI18n } from '@/shared/i18n'
import { useHomeFeed } from '../model/useHomeFeed'
import FeedSection from './FeedSection.vue'
import HomeHero from './HomeHero.vue'

const { t } = useI18n()
const { places, festivals, posts } = useHomeFeed()

/** 히어로 통계: 실제 API 전체 개수(meta.total). 로딩/실패 시 null → '—' */
interface TotalSource {
  loading: Readonly<Ref<boolean>>
  error: Readonly<Ref<string>>
  data: Readonly<Ref<{ meta: PaginationMeta }>>
}

function totalOf(state: TotalSource): number | null {
  return state.loading.value || state.error.value ? null : state.data.value.meta.total
}

const totals = computed(() => {
  return { places: totalOf(places), festivals: totalOf(festivals), posts: totalOf(posts) }
})
</script>

<template>
  <div class="home">
    <HomeHero :totals="totals" />

    <!--
      키워드 바: ~767px 제목 아래 가로 스크롤 한 줄 / 768px~ 제목과 칩이 한 줄(칩은 줄바꿈)
    -->
    <section class="home-keywords" :aria-label="t.home.keywords.title">
      <div class="ds-container">
        <div class="home-keywords__bar">
          <strong>{{ t.home.keywords.title }}</strong>
          <ul class="home-keywords__list">
            <li v-for="keyword in t.home.keywords.items" :key="keyword.query">
              <RouterLink :to="{ path: paths.placeList(), query: { q: keyword.query } }">
                {{ keyword.label }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <FeedSection
      :eyebrow="t.home.sections.places.eyebrow"
      :title="t.home.sections.places.title"
      :loading="places.loading.value"
      :error="places.error.value"
      :empty="places.data.value.items.length === 0"
      :placeholders="6"
      grid="cards"
      :cta-label="t.common.viewAll"
      :cta-to="paths.placeList()"
      @retry="places.run()"
    >
      <template #icon><MapPin :size="15" /></template>
      <li v-for="place in places.data.value.items" :key="place.id">
        <PlaceCard :place="place" />
      </li>
    </FeedSection>

    <FeedSection
      :eyebrow="t.home.sections.festivals.eyebrow"
      :title="t.home.sections.festivals.title"
      :loading="festivals.loading.value"
      :error="festivals.error.value"
      :empty="festivals.data.value.items.length === 0"
      :placeholders="3"
      grid="cards"
      :cta-label="t.home.sections.festivals.cta"
      :cta-to="paths.festivalList()"
      alt
      @retry="festivals.run()"
    >
      <template #icon><PartyPopper :size="15" /></template>
      <li v-for="festival in festivals.data.value.items" :key="festival.id">
        <FestivalCard :festival="festival" />
      </li>
    </FeedSection>

    <FeedSection
      :eyebrow="t.home.sections.posts.eyebrow"
      :title="t.home.sections.posts.title"
      :loading="posts.loading.value"
      :error="posts.error.value"
      :empty="posts.data.value.items.length === 0"
      :placeholders="4"
      grid="posts"
      :cta-label="t.home.sections.posts.cta"
      :cta-to="paths.postNew()"
      cta-variant="primary"
      @retry="posts.run()"
    >
      <template #icon><MessageCircle :size="15" /></template>
      <li v-for="post in posts.data.value.items" :key="post.id">
        <PostCard :post="post" />
      </li>
    </FeedSection>
  </div>
</template>

<style scoped>
.home-keywords {
  padding-block: var(--space-2) var(--space-4);
}

.home-keywords__bar {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-surface-alt);
}

@media (min-width: 768px) {
  .home-keywords__bar {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    padding: var(--space-5) var(--space-6);
  }
}

.home-keywords__bar strong {
  flex-shrink: 0;
  font-size: var(--fs-sm);
}

.home-keywords__list {
  display: flex;
  gap: var(--space-2);
  margin-inline: calc(var(--space-4) * -1);
  padding-inline: var(--space-4);
  overflow-x: auto;
  scrollbar-width: none;
}

.home-keywords__list::-webkit-scrollbar {
  display: none;
}

@media (min-width: 768px) {
  .home-keywords__list {
    flex-wrap: wrap;
    margin-inline: 0;
    padding-inline: 0;
    overflow: visible;
  }
}

.home-keywords__list li {
  flex-shrink: 0;
}

.home-keywords__list a {
  display: inline-flex;
  min-height: 2.25rem;
  align-items: center;
  padding: 0 var(--space-3-5);
  border-radius: var(--radius-pill);
  color: var(--color-text-muted);
  background: var(--color-surface);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
  white-space: nowrap;
  transition: color var(--duration-base) var(--ease-standard);
}

@media (hover: hover) {
  .home-keywords__list a:hover {
    color: var(--color-primary);
  }
}
</style>
