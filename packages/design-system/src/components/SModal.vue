<script setup lang="ts">
import { nextTick, ref, useId, watch } from 'vue'
import { X } from 'lucide-vue-next'
import { useEventListener, useScrollLock } from '@soulrip/library/vue'
import { useDsMessages } from '@soulrip/design-system/locale'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    /** 진행 중(삭제 요청 등)에는 바깥 클릭·ESC로 닫히지 않게 한다. */
    persistent?: boolean
  }>(),
  { description: '' },
)

const open = defineModel<boolean>('open', { required: true })

const messages = useDsMessages()
const titleId = `modal-title-${useId()}`
const descriptionId = `modal-desc-${useId()}`
const panel = ref<HTMLElement | null>(null)
let returnFocus: HTMLElement | null = null

useScrollLock(open)

useEventListener(
  () => (open.value ? window : null),
  'keydown',
  (event) => {
    if (event.key === 'Escape') requestClose()
  },
)

function requestClose() {
  if (props.persistent) return
  open.value = false
}

watch(open, async (isOpen) => {
  if (isOpen) {
    returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    await nextTick()
    const target = panel.value?.querySelector<HTMLElement>(
      'input, textarea, select, button:not(.s-modal__close), [href]',
    )
    ;(target ?? panel.value)?.focus()
  } else {
    returnFocus?.focus()
    returnFocus = null
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="s-modal">
      <div v-if="open" class="s-modal" @click.self="requestClose">
        <section
          ref="panel"
          class="s-modal__panel"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          :aria-describedby="description ? descriptionId : undefined"
          tabindex="-1"
        >
          <span class="s-modal__grabber" aria-hidden="true" />

          <header class="s-modal__header">
            <h2 :id="titleId" class="s-modal__title">{{ title }}</h2>
            <button
              class="s-modal__close"
              type="button"
              :aria-label="messages.modal.close"
              :disabled="persistent"
              @click="requestClose"
            >
              <X :size="20" />
            </button>
          </header>

          <p v-if="description" :id="descriptionId" class="s-modal__description">
            {{ description }}
          </p>

          <div class="s-modal__body">
            <slot />
          </div>

          <footer v-if="$slots.actions" class="s-modal__actions">
            <slot name="actions" />
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/*
 * 768px 미만: 화면 아래에서 올라오는 바텀시트 (한 손 조작)
 * 768px 이상: 화면 중앙 다이얼로그
 */
.s-modal {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: var(--color-overlay);
}

.s-modal__panel {
  width: 100%;
  max-height: 90dvh;
  padding: var(--space-3) var(--gutter) calc(var(--space-5) + var(--safe-bottom));
  overflow-y: auto;
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);
  outline: none;
}

.s-modal__grabber {
  display: block;
  width: 2.5rem;
  height: 0.3125rem;
  margin: 0 auto var(--space-3);
  border-radius: var(--radius-pill);
  background: var(--color-border-strong);
}

@media (min-width: 768px) {
  .s-modal {
    align-items: center;
    padding: var(--space-6);
  }

  .s-modal__panel {
    width: min(28rem, 100%);
    padding: var(--space-7);
    border-radius: var(--radius-2xl);
  }

  .s-modal__grabber {
    display: none;
  }
}

.s-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.s-modal__title {
  font-size: var(--fs-h3);
}

.s-modal__close {
  display: grid;
  width: var(--tap-target);
  height: var(--tap-target);
  margin-right: calc(var(--space-2) * -1);
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: var(--color-text-muted);
  background: transparent;
}

.s-modal__close:hover:not(:disabled) {
  background: var(--color-surface-hover);
}

.s-modal__description {
  margin-top: var(--space-1);
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
  line-height: var(--lh-body);
}

.s-modal__body {
  display: grid;
  gap: var(--space-3);
  margin-top: var(--space-5);
}

.s-modal__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2-5);
  margin-top: var(--space-6);
}

/* Transition */
.s-modal-enter-active,
.s-modal-leave-active {
  transition: opacity var(--duration-base) var(--ease-standard);
}

.s-modal-enter-active .s-modal__panel,
.s-modal-leave-active .s-modal__panel {
  transition: transform var(--duration-slow) var(--ease-out);
}

.s-modal-enter-from,
.s-modal-leave-to {
  opacity: 0;
}

.s-modal-enter-from .s-modal__panel,
.s-modal-leave-to .s-modal__panel {
  transform: translateY(100%);
}

@media (min-width: 768px) {
  .s-modal-enter-from .s-modal__panel,
  .s-modal-leave-to .s-modal__panel {
    transform: translateY(12px) scale(0.98);
  }
}
</style>
