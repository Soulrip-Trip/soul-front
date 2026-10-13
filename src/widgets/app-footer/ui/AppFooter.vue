<script setup lang="ts">
import { HEADER_NAV } from '@/shared/config'
import { useI18n } from '@/shared/i18n'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <!--
    ~767px : 로고/소개 → 바로가기 → 저작권이 가운데 정렬로 쌓인다.
    768px~ : 왼쪽 로고/소개, 오른쪽 바로가기, 아래 저작권.
  -->
  <footer class="app-footer">
    <div class="ds-container app-footer__inner">
      <div class="app-footer__brand">
        <strong>Soulrip</strong>
        <p>{{ t.footer.tagline }}</p>
      </div>

      <nav class="app-footer__nav" :aria-label="t.footer.menu">
        <RouterLink v-for="item in HEADER_NAV" :key="item.to" :to="item.to">
          {{ t.nav[item.labelKey] }}
        </RouterLink>
      </nav>

      <p class="app-footer__copyright">© {{ year }} Soulrip</p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
}

.app-footer__inner {
  display: grid;
  gap: var(--space-4);
  padding-block: var(--space-8);
  text-align: center;
}

@media (min-width: 768px) {
  .app-footer__inner {
    grid-template-columns: 1fr auto;
    align-items: center;
    text-align: left;
  }
}

.app-footer__brand strong {
  color: var(--color-primary);
  font-size: 1.125rem;
  font-weight: var(--fw-extrabold);
}

.app-footer__brand p {
  margin-top: var(--space-1);
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
}

.app-footer__nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-1) var(--space-4);
}

.app-footer__nav a {
  display: inline-flex;
  min-height: var(--tap-target);
  align-items: center;
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
}

@media (hover: hover) {
  .app-footer__nav a:hover {
    color: var(--color-primary);
  }
}

.app-footer__copyright {
  color: var(--color-text-subtle);
  font-size: var(--fs-xs);
}

@media (min-width: 768px) {
  .app-footer__copyright {
    grid-column: 1 / -1;
    padding-top: var(--space-4);
    border-top: 1px solid var(--color-border);
  }
}
</style>
