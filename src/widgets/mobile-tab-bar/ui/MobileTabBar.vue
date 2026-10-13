<script setup lang="ts">
import { useRoute } from 'vue-router'
import { TAB_NAV, isNavActive } from '@/shared/config'
import { useI18n } from '@/shared/i18n'

const route = useRoute()
const { t } = useI18n()
</script>

<template>
  <!-- 768px 미만에서만 보이는 하단 탭바. 엄지로 닿기 쉬운 위치에 주요 메뉴를 둔다. -->
  <nav class="tab-bar ds-hide-desktop" :aria-label="t.nav.mainMenu">
    <RouterLink
      v-for="item in TAB_NAV"
      :key="item.to"
      :to="item.to"
      class="tab-bar__item"
      :class="{ 'is-active': isNavActive(route.path, item.to) }"
      :aria-current="isNavActive(route.path, item.to) ? 'page' : undefined"
    >
      <span class="tab-bar__icon">
        <component :is="item.icon" :size="21" :stroke-width="2.1" aria-hidden="true" />
      </span>
      <span class="tab-bar__label ds-ellipsis">{{ t.nav[item.labelKey] }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.tab-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-tabbar);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  height: calc(var(--tabbar-height) + var(--safe-bottom));
  padding: 0 max(var(--space-2), env(safe-area-inset-right, 0px)) var(--safe-bottom)
    max(var(--space-2), env(safe-area-inset-left, 0px));
  border-top: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-surface) 94%, transparent);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.tab-bar__item {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-0-5);
  color: var(--color-text-subtle);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
}

.tab-bar__icon {
  display: grid;
  width: 3rem;
  height: 1.75rem;
  place-items: center;
  border-radius: var(--radius-pill);
  transition: background-color var(--duration-base) var(--ease-standard);
}

.tab-bar__label {
  max-width: 100%;
  padding: 0 var(--space-1);
}

.tab-bar__item.is-active {
  color: var(--color-primary);
  font-weight: var(--fw-extrabold);
}

.tab-bar__item.is-active .tab-bar__icon {
  background: var(--color-primary-soft);
}
</style>
