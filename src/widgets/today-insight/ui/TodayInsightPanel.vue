<script setup lang="ts">
import { RefreshCw, Sparkles } from 'lucide-vue-next'
import { SButton, SEmptyState, SImage } from '@soulrip/design-system'
import { useI18n } from '@/shared/i18n'
import { useTodayInsight } from '../model/useTodayInsight'

const { t } = useI18n()
const { insight, cards, loading, error, load } = useTodayInsight()
</script>

<template>
  <!--
    ~479px : 카드 = 아이콘 + 텍스트 (사진 숨김)
    480px~ : 카드 = 아이콘 + 텍스트 + 오른쪽 사진(4.5rem)
  -->
  <section class="insight" aria-labelledby="insight-title">
    <header class="insight__header">
      <h2 id="insight-title" class="insight__title">
        <Sparkles :size="20" aria-hidden="true" />
        {{ t.home.insight.title }}
      </h2>
      <SButton v-if="insight" variant="ghost" size="sm" :loading="loading" @click="load">
        <RefreshCw v-if="!loading" :size="15" aria-hidden="true" />
        {{ loading ? t.home.insight.loading : t.home.insight.reload }}
      </SButton>
    </header>

    <SEmptyState
      v-if="!insight && loading"
      tone="loading"
      :title="t.home.insight.loadingTitle"
      :description="t.home.insight.loadingDescription"
      class="insight__state"
    />

    <SEmptyState
      v-else-if="!insight && error"
      tone="error"
      :title="t.home.insight.errorTitle"
      :description="error"
      class="insight__state"
    >
      <template #actions>
        <SButton @click="load">{{ t.common.retry }}</SButton>
      </template>
    </SEmptyState>

    <SEmptyState
      v-else-if="!insight"
      :title="t.home.insight.emptyTitle"
      :description="t.home.insight.emptyDescription"
      class="insight__state"
    >
      <template #icon>
        <Sparkles :size="28" />
      </template>
      <template #actions>
        <SButton @click="load">
          <Sparkles :size="16" aria-hidden="true" />
          {{ t.home.insight.load }}
        </SButton>
      </template>
    </SEmptyState>

    <template v-else>
      <ul class="insight__list" :class="{ 'is-refreshing': loading }" :aria-busy="loading">
        <li v-for="card in cards" :key="card.key" class="insight__card">
          <span class="insight__icon" :class="`insight__icon--${card.tone}`" aria-hidden="true">
            <component :is="card.icon" :size="22" />
          </span>
          <div class="insight__text">
            <span class="insight__label">{{ card.label }}</span>
            <strong>{{ card.headline }}</strong>
            <p>{{ card.description }}</p>
          </div>
          <SImage
            class="insight__image"
            :src="card.image"
            :alt="card.headline"
            ratio="1"
            hide-fallback-label
          />
        </li>
      </ul>
      <p v-if="error" class="insight__refresh-error" role="alert">
        {{ t.home.insight.refreshFailed }}
      </p>
    </template>
  </section>
</template>

<style scoped>
.insight {
  min-width: 0;
  padding: var(--space-5) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
}

@media (min-width: 480px) {
  .insight {
    padding: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .insight {
    padding: var(--space-7);
  }
}

.insight__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}

.insight__title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--fs-h3);
}

.insight__title svg {
  color: var(--color-primary);
}

.insight__state {
  min-height: 18rem;
  border-style: solid;
  border-color: transparent;
  background: var(--color-surface-alt);
}

.insight__list {
  display: grid;
  gap: var(--space-3);
  transition: opacity var(--duration-base);
}

.insight__list.is-refreshing {
  opacity: 0.55;
  pointer-events: none;
}

.insight__card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3-5);
  border-radius: var(--radius-lg);
  background: var(--color-surface-alt);
}

@media (min-width: 480px) {
  .insight__card {
    grid-template-columns: auto minmax(0, 1fr) 4.5rem;
    gap: var(--space-4);
  }
}

.insight__icon {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  border-radius: var(--radius-md);
}

.insight__icon--yellow {
  color: var(--tone-yellow);
  background: var(--tone-yellow-soft);
}

.insight__icon--blue {
  color: var(--tone-blue);
  background: var(--tone-blue-soft);
}

.insight__icon--green {
  color: var(--tone-green);
  background: var(--tone-green-soft);
}

.insight__icon--pink {
  color: var(--tone-pink);
  background: var(--tone-pink-soft);
}

.insight__text {
  display: grid;
  min-width: 0;
  gap: var(--space-0-5);
}

.insight__label {
  color: var(--color-primary);
  font-size: var(--fs-xs);
  font-weight: var(--fw-extrabold);
}

.insight__text strong {
  font-size: var(--fs-sm);
  line-height: var(--lh-snug);
}

.insight__text p {
  color: var(--color-text-muted);
  font-size: var(--fs-xs);
  line-height: var(--lh-body);
}

.insight__image {
  display: none;
  border-radius: var(--radius-md);
}

@media (min-width: 480px) {
  .insight__image {
    display: block;
  }
}

.insight__refresh-error {
  margin-top: var(--space-3);
  color: var(--color-danger);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
}
</style>
