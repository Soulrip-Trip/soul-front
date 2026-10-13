<script setup lang="ts">
import { computed } from 'vue'
import { Compass, MapPin, MessageCircle, PartyPopper, Sparkles } from 'lucide-vue-next'
import { SButton } from '@soulrip/design-system'
import { TodayInsightPanel } from '@/widgets/today-insight'
import { paths } from '@/shared/config'
import { useI18n } from '@/shared/i18n'

const props = defineProps<{
  /** null이면 아직 불러오는 중 */
  totals: { places: number | null; festivals: number | null; posts: number | null }
}>()

const { t, locale } = useI18n()

const stats = computed(() => {
  const format = (value: number | null) =>
    value === null
      ? '—'
      : new Intl.NumberFormat(locale.value, { notation: 'compact' }).format(value)

  return [
    {
      key: 'places',
      icon: MapPin,
      tone: 'blue',
      value: format(props.totals.places),
      label: t.value.home.stats.places,
    },
    {
      key: 'festivals',
      icon: PartyPopper,
      tone: 'pink',
      value: format(props.totals.festivals),
      label: t.value.home.stats.festivals,
    },
    {
      key: 'posts',
      icon: MessageCircle,
      tone: 'orange',
      value: format(props.totals.posts),
      label: t.value.home.stats.posts,
    },
  ]
})
</script>

<template>
  <!--
    ~1023px : 소개 문구(가운데 정렬) → AI 인사이트 패널이 세로로 쌓인다.
    1024px~ : 왼쪽 소개 문구 | 오른쪽 AI 인사이트 2단.
    통계 타일: ~479px 세로형(아이콘 위, 숫자 아래) 3열 / 480px~ 가로형 3열
    CTA 버튼: ~479px 가로 100% 2줄 / 480px~ 한 줄
  -->
  <section class="home-hero">
    <div class="ds-container home-hero__layout">
      <div class="home-hero__copy">
        <span class="home-hero__badge">
          <Sparkles :size="15" aria-hidden="true" />
          {{ t.home.hero.badge }}
        </span>

        <h1 class="ds-display home-hero__title">
          {{ t.home.hero.title1 }}
          <span class="home-hero__highlight">{{ t.home.hero.title2 }}</span>
        </h1>

        <p class="ds-lead home-hero__description">{{ t.home.hero.description }}</p>

        <div class="home-hero__actions">
          <SButton size="lg" :to="paths.placeList()" block-on-mobile>
            <Compass :size="18" aria-hidden="true" />
            {{ t.home.hero.exploreCta }}
          </SButton>
          <SButton size="lg" variant="outline" :to="paths.postList()" block-on-mobile>
            <MessageCircle :size="18" aria-hidden="true" />
            {{ t.home.hero.communityCta }}
          </SButton>
        </div>

        <dl class="home-hero__stats" :aria-label="t.home.stats.label">
          <div v-for="stat in stats" :key="stat.key" class="home-hero__stat">
            <span class="home-hero__stat-icon" :class="`tone-${stat.tone}`" aria-hidden="true">
              <component :is="stat.icon" :size="20" />
            </span>
            <!-- 마크업은 dt → dd 순서, 화면에는 숫자가 위로 오도록 column-reverse -->
            <div>
              <dt>{{ stat.label }}</dt>
              <dd>{{ stat.value }}</dd>
            </div>
          </div>
        </dl>
      </div>

      <TodayInsightPanel />
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-8) var(--space-10);
  background:
    radial-gradient(
      60rem 30rem at 85% -10%,
      color-mix(in srgb, var(--color-primary) 14%, transparent),
      transparent 70%
    ),
    radial-gradient(
      30rem 20rem at -5% 40%,
      color-mix(in srgb, var(--color-accent) 22%, transparent),
      transparent 70%
    ),
    var(--color-bg);
}

@media (min-width: 768px) {
  .home-hero {
    padding-block: var(--space-12) var(--space-14);
  }
}

.home-hero__layout {
  display: grid;
  gap: var(--space-8);
}

@media (min-width: 1024px) {
  .home-hero__layout {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    align-items: start;
    gap: var(--space-12);
  }
}

.home-hero__copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

@media (min-width: 1024px) {
  .home-hero__copy {
    align-items: flex-start;
    padding-top: var(--space-6);
    text-align: left;
  }
}

.home-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1-5);
  padding: var(--space-1-5) var(--space-3-5);
  border-radius: var(--radius-pill);
  color: var(--color-primary);
  background: var(--color-primary-soft);
  font-size: var(--fs-sm);
  font-weight: var(--fw-extrabold);
}

.home-hero__title {
  margin-top: var(--space-5);
}

.home-hero__highlight {
  position: relative;
  display: block;
  width: fit-content;
  margin-inline: auto;
  color: var(--color-primary);
}

@media (min-width: 1024px) {
  .home-hero__highlight {
    margin-inline: 0;
  }
}

.home-hero__highlight::after {
  position: absolute;
  right: 0;
  bottom: -0.15em;
  left: 0;
  height: 0.12em;
  border-radius: var(--radius-pill);
  content: '';
  background: color-mix(in srgb, var(--color-primary) 40%, transparent);
  transform: rotate(-1deg);
}

.home-hero__description {
  max-width: 34rem;
  margin-top: var(--space-6);
  white-space: pre-line;
  word-break: var(--word-break);
}

.home-hero__actions {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-7);
}

@media (min-width: 1024px) {
  .home-hero__actions {
    justify-content: flex-start;
  }
}

/* ---- Stats ---- */
.home-hero__stats {
  display: grid;
  width: 100%;
  max-width: 40rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-2);
  margin: var(--space-8) 0 0;
}

@media (min-width: 480px) {
  .home-hero__stats {
    gap: var(--space-3);
  }
}

.home-hero__stat {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--color-surface) 92%, transparent);
  box-shadow: var(--shadow-sm);
  text-align: center;
}

@media (min-width: 480px) {
  .home-hero__stat {
    flex-direction: row;
    gap: var(--space-3);
    padding: var(--space-3-5);
    text-align: left;
  }
}

.home-hero__stat > div {
  display: flex;
  min-width: 0;
  flex-direction: column-reverse;
}

.home-hero__stat-icon {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  place-items: center;
  border-radius: var(--radius-md);
}

.tone-blue {
  color: var(--tone-blue);
  background: var(--tone-blue-soft);
}

.tone-pink {
  color: var(--tone-pink);
  background: var(--tone-pink-soft);
}

.tone-orange {
  color: var(--tone-orange);
  background: var(--tone-orange-soft);
}

.home-hero__stat dd {
  margin: 0;
  font-size: 1.375rem;
  font-weight: var(--fw-extrabold);
  line-height: 1.1;
}

.home-hero__stat dt {
  overflow: hidden;
  color: var(--color-text-subtle);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
