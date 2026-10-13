<script setup lang="ts">
import { MapPin } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { LanguageSwitch } from '@/features/language-switch'
import { ThemeToggle } from '@/features/theme-toggle'
import { HEADER_NAV, isNavActive, paths } from '@/shared/config'
import { useI18n } from '@/shared/i18n'

const route = useRoute()
const { t } = useI18n()
</script>

<template>
  <!--
    ~767px   : Soulrip + 언어 + 테마. 메뉴는 하단 탭바(MobileTabBar)로 이동한다.
    768px~   : Soulrip + 상단 메뉴(아이콘+텍스트) + 언어(코드) + 테마
    1024px~  : 언어 버튼이 언어 이름 전체로 바뀐다.
    1280px~  : 'Seoul' 위치 칩이 추가된다.
  -->
  <header class="app-header">
    <div class="ds-container app-header__inner">
      <RouterLink class="app-header__brand" :to="paths.home()" :aria-label="t.nav.homeLink">
        <span class="app-header__name">Soulrip</span>
      </RouterLink>

      <nav class="app-header__nav" :aria-label="t.nav.mainMenu">
        <RouterLink
          v-for="item in HEADER_NAV"
          :key="item.to"
          :to="item.to"
          class="app-header__link"
          :class="{ 'is-active': isNavActive(route.path, item.to) }"
          :aria-current="isNavActive(route.path, item.to) ? 'page' : undefined"
        >
          <component :is="item.icon" :size="18" aria-hidden="true" />
          <span class="ds-ellipsis">{{ t.nav[item.labelKey] }}</span>
        </RouterLink>
      </nav>

      <div class="app-header__actions">
        <span class="app-header__chip">
          <MapPin :size="15" aria-hidden="true" />
          Seoul
        </span>
        <LanguageSwitch />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  border-bottom: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-surface) 92%, transparent);
  box-shadow: 0 4px 18px color-mix(in srgb, var(--color-primary) 6%, transparent);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  padding-top: env(safe-area-inset-top, 0px);
}

.app-header__inner {
  display: flex;
  height: var(--header-height);
  align-items: center;
  gap: var(--space-3);
}

@media (min-width: 1024px) {
  .app-header__inner {
    gap: var(--space-6);
  }
}

/* ---- Brand ---- */
.app-header__brand {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  min-height: var(--tap-target);
}

.app-header__name {
  color: var(--color-primary);
  font-size: 1.375rem;
  font-weight: var(--fw-extrabold);
  letter-spacing: -0.03em;
}

@media (min-width: 1024px) {
  .app-header__name {
    font-size: 1.5rem;
  }
}

/* ---- Nav (768px 이상) ---- */
.app-header__nav {
  display: none;
}

@media (min-width: 768px) {
  .app-header__nav {
    display: flex;
    min-width: 0;
    flex: 1;
    align-items: center;
    gap: var(--space-1);
  }
}

.app-header__link {
  display: inline-flex;
  min-width: 0;
  height: 2.5rem;
  align-items: center;
  gap: var(--space-1-5);
  padding: 0 var(--space-3);
  border-radius: var(--radius-pill);
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
  font-weight: var(--fw-extrabold);
  white-space: nowrap;
  transition:
    color var(--duration-base) var(--ease-standard),
    background-color var(--duration-base) var(--ease-standard);
}

.app-header__link svg {
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .app-header__link {
    height: 2.625rem;
    padding: 0 var(--space-4);
    font-size: 0.9375rem;
  }
}

@media (hover: hover) {
  .app-header__link:not(.is-active):hover {
    color: var(--color-primary);
    background: var(--color-primary-soft);
  }
}

.app-header__link.is-active {
  color: var(--color-on-primary);
  background: var(--color-primary);
  box-shadow: var(--shadow-primary);
}

/* ---- Actions ---- */
.app-header__actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: var(--space-2);
  margin-left: auto;
}

.app-header__chip {
  display: none;
}

@media (min-width: 1280px) {
  .app-header__chip {
    display: inline-flex;
    height: 2.5rem;
    align-items: center;
    gap: var(--space-1-5);
    padding: 0 var(--space-3-5);
    border-radius: var(--radius-pill);
    color: var(--color-primary);
    background: var(--color-primary-soft);
    font-size: var(--fs-sm);
    font-weight: var(--fw-extrabold);
  }
}
</style>
