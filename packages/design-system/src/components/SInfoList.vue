<script setup lang="ts">
import type { InfoItem } from './types'

withDefaults(
  defineProps<{
    items: InfoItem[]
    /** grid: 480px 이상에서 2열 */
    layout?: 'stack' | 'grid'
  }>(),
  { layout: 'stack' },
)
</script>

<template>
  <dl class="s-info-list" :class="`s-info-list--${layout}`">
    <div v-for="item in items" :key="item.key" class="s-info-list__item">
      <span v-if="item.icon" class="s-info-list__icon" aria-hidden="true">
        <component :is="item.icon" :size="18" />
      </span>
      <div class="s-info-list__text">
        <dt>{{ item.label }}</dt>
        <dd>
          <a v-if="item.href" :href="item.href">{{ item.value }}</a>
          <template v-else>{{ item.value }}</template>
        </dd>
      </div>
    </div>
  </dl>
</template>

<style scoped>
.s-info-list {
  display: grid;
  gap: var(--space-2-5);
  margin: 0;
}

@media (min-width: 480px) {
  .s-info-list--grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.s-info-list__item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  min-width: 0;
  padding: var(--space-3-5) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--color-surface-alt);
}

.s-info-list__icon {
  display: grid;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  place-items: center;
  border-radius: var(--radius-sm);
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

.s-info-list__text {
  display: grid;
  min-width: 0;
  gap: var(--space-0-5);
}

dt {
  color: var(--color-text-subtle);
  font-size: var(--fs-xs);
  font-weight: var(--fw-extrabold);
}

dd {
  margin: 0;
  color: var(--color-text);
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  line-height: var(--lh-snug);
  overflow-wrap: anywhere;
}

dd a {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
