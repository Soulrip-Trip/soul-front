<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { getPageWindow } from '@soulrip/library/pagination'
import { useBreakpoint } from '@soulrip/design-system/composables'
import { useDsMessages } from '@soulrip/design-system/locale'

const props = defineProps<{
  totalPages: number
  /** 접근성 이름. 비우면 기본 문구 사용 */
  label?: string
}>()

const page = defineModel<number>('page', { required: true })

const messages = useDsMessages()
const { smUp } = useBreakpoint()

/** 480px 미만에서는 3개, 이상에서는 5개 페이지 번호를 보여준다. */
const pages = computed(() => getPageWindow(page.value, props.totalPages, smUp.value ? 5 : 3))

function go(target: number) {
  if (target < 1 || target > props.totalPages || target === page.value) return
  page.value = target
}
</script>

<template>
  <nav v-if="totalPages > 1" class="s-pagination" :aria-label="label || messages.pagination.label">
    <button
      class="s-pagination__item s-pagination__arrow"
      type="button"
      :disabled="page <= 1"
      :aria-label="messages.pagination.prev"
      @click="go(page - 1)"
    >
      <ChevronLeft :size="18" />
    </button>

    <button
      v-for="pageNumber in pages"
      :key="pageNumber"
      class="s-pagination__item"
      :class="{ 'is-active': pageNumber === page }"
      type="button"
      :aria-label="messages.pagination.page(pageNumber)"
      :aria-current="pageNumber === page ? 'page' : undefined"
      @click="go(pageNumber)"
    >
      {{ pageNumber }}
    </button>

    <button
      class="s-pagination__item s-pagination__arrow"
      type="button"
      :disabled="page >= totalPages"
      :aria-label="messages.pagination.next"
      @click="go(page + 1)"
    >
      <ChevronRight :size="18" />
    </button>
  </nav>
</template>

<style scoped>
.s-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1-5);
  margin-top: var(--space-8);
}

@media (min-width: 768px) {
  .s-pagination {
    gap: var(--space-2);
    margin-top: var(--space-10);
  }
}

.s-pagination__item {
  display: inline-grid;
  min-width: var(--tap-target);
  height: var(--tap-target);
  place-items: center;
  padding: 0 var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  background: var(--color-surface);
  font-size: var(--fs-sm);
  font-weight: var(--fw-extrabold);
  transition:
    color var(--duration-base) var(--ease-standard),
    background-color var(--duration-base) var(--ease-standard),
    border-color var(--duration-base) var(--ease-standard);
}

.s-pagination__arrow {
  padding: 0;
}

@media (hover: hover) {
  .s-pagination__item:not(:disabled, .is-active):hover {
    color: var(--color-primary);
    border-color: var(--color-border-strong);
    background: var(--color-primary-softer);
  }
}

.s-pagination__item.is-active {
  color: var(--color-on-primary);
  border-color: var(--color-primary);
  background: var(--color-primary);
  box-shadow: var(--shadow-primary);
}

.s-pagination__item:disabled {
  opacity: 0.4;
}
</style>
