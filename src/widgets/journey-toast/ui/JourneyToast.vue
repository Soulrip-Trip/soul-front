<script setup lang="ts">
import { computed, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { Trophy, X } from 'lucide-vue-next'
import { useJourney, type JourneyCompletion } from '@/entities/journey'
import { paths } from '@/shared/config'
import { useI18n } from '@/shared/i18n'

const VISIBLE_MS = 4000

const { t } = useI18n()
const { lastCompletion, done, total } = useJourney()

const current = shallowRef<JourneyCompletion | null>(null)
const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

const isMaster = computed(() => done.value >= total)

watch(lastCompletion, (completion) => {
  if (!completion) return

  current.value = completion
  visible.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (visible.value = false), VISIBLE_MS)
})

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <!--
    어느 화면에서든 미션을 완료하면 잠깐 나타나는 알림.
    ~767px : 하단 탭바 위, 화면 폭에 맞춤
    768px~ : 화면 아래 가운데, 최대 26rem
  -->
  <Teleport to="body">
    <Transition name="journey-toast">
      <div v-if="visible && current" class="journey-toast" role="status" aria-live="polite">
        <span class="journey-toast__icon" :class="{ 'is-master': isMaster }" aria-hidden="true">
          <Trophy :size="20" />
        </span>
        <div class="journey-toast__text">
          <strong>{{ isMaster ? t.journey.toastMaster : t.journey.toastTitle }}</strong>
          <span>{{ t.journey.toastBody(t.journey.steps[current.id].title, done, total) }}</span>
        </div>
        <RouterLink
          class="journey-toast__link"
          :to="{ path: paths.home(), hash: '#journey' }"
          @click="visible = false"
        >
          {{ t.journey.viewMap }}
        </RouterLink>
        <button
          type="button"
          class="journey-toast__close"
          :aria-label="t.ds.modal.close"
          @click="visible = false"
        >
          <X :size="16" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.journey-toast {
  position: fixed;
  right: var(--gutter);
  bottom: calc(var(--tabbar-height) + var(--safe-bottom) + var(--space-3));
  left: var(--gutter);
  z-index: var(--z-toast);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-3) var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);
}

@media (min-width: 768px) {
  .journey-toast {
    right: auto;
    bottom: var(--space-8);
    left: 50%;
    width: min(26rem, calc(100% - var(--gutter) * 2));
    transform: translateX(-50%);
  }
}

.journey-toast__icon {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  background: var(--color-success);
  animation: journey-toast-pop var(--duration-slow) var(--ease-out);
}

.journey-toast__icon.is-master {
  background: linear-gradient(135deg, var(--tone-yellow), var(--tone-orange));
}

.journey-toast__text {
  display: grid;
  flex: 1;
  min-width: 0;
}

.journey-toast__text strong {
  font-size: var(--fs-sm);
  word-break: var(--word-break);
}

.journey-toast__text span {
  overflow: hidden;
  color: var(--color-text-muted);
  font-size: var(--fs-xs);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.journey-toast__link {
  flex-shrink: 0;
  color: var(--color-primary);
  font-size: var(--fs-sm);
  font-weight: var(--fw-extrabold);
  white-space: nowrap;
}

.journey-toast__close {
  display: grid;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: var(--color-text-subtle);
  background: transparent;
}

.journey-toast__close:hover {
  background: var(--color-surface-hover);
}

@keyframes journey-toast-pop {
  from {
    transform: scale(0.4) rotate(-30deg);
  }
}

.journey-toast-enter-active,
.journey-toast-leave-active {
  transition:
    opacity var(--duration-base) var(--ease-standard),
    translate var(--duration-slow) var(--ease-out);
}

.journey-toast-enter-from,
.journey-toast-leave-to {
  opacity: 0;
  translate: 0 1rem;
}
</style>
