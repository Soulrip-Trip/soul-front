<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { RotateCcw, Send, X } from 'lucide-vue-next'
import type { ChatSource } from '@soulrip/api'
import { RouterLink } from 'vue-router'
import { SIconButton, useBreakpoint } from '@soulrip/design-system'
import { useEventListener, useScrollLock } from '@soulrip/library/vue'
import chatCat from '@/shared/assets/images/chat-cat.jpg'
import { paths } from '@/shared/config'
import { useI18n } from '@/shared/i18n'
import { useChatbotLauncher } from '@/shared/model'
import { useChatbot } from '../model/useChatbot'

const { t } = useI18n()
const { isMobile } = useBreakpoint()
const { messages, input, loading, quickQuestions, textOf, send, reset } = useChatbot()

// 열림 상태는 앱 전역 공유 (여정 지도의 "챗봇 열기" 버튼에서도 연다)
const { isOpen: open, closeChatbot, toggleChatbot } = useChatbotLauncher()
const scroller = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)

// 모바일 전체 화면 시트가 열려 있으면 뒤 페이지 스크롤을 막는다.
useScrollLock(computed(() => open.value && isMobile.value))

useEventListener(
  () => (open.value ? window : null),
  'keydown',
  (event) => {
    if (event.key === 'Escape') closeChatbot()
  },
)

watch(open, async (isOpen) => {
  if (!isOpen) return
  await nextTick()
  scrollToBottom('auto')
  // 모바일에서는 키보드가 화면을 가리므로 자동 포커스하지 않는다.
  if (!isMobile.value) inputEl.value?.focus()
})

watch(
  () => [messages.value.length, loading.value],
  () => nextTick(() => scrollToBottom('smooth')),
)

function scrollToBottom(behavior: ScrollBehavior) {
  scroller.value?.scrollTo({ top: scroller.value.scrollHeight, behavior })
}

/** 출처 유형이 장소/축제면 상세 페이지로 연결한다. */
function sourceLink(source: ChatSource): string | null {
  if (source.type === 'place') return paths.placeDetail(source.id)
  if (source.type === 'festival') return paths.festivalDetail(source.id)
  return null
}
</script>

<template>
  <!--
    ~767px : 전체 화면 시트(100dvh). 열려 있는 동안 FAB를 숨기고 배경 스크롤을 잠근다.
             FAB는 하단 탭바 위에 떠 있다.
    768px~ : 오른쪽 아래 플로팅 패널(24rem 너비), FAB는 그대로 유지.
  -->
  <div class="chatbot">
    <Transition name="chatbot">
      <section
        v-if="open"
        id="chatbot-panel"
        class="chatbot__panel"
        role="dialog"
        :aria-modal="isMobile"
        :aria-label="t.chat.title"
      >
        <header class="chatbot__header">
          <img class="chatbot__avatar" :src="chatCat" alt="" />
          <div class="chatbot__heading">
            <strong>{{ t.chat.title }}</strong>
            <span>{{ t.chat.subtitle }}</span>
          </div>
          <SIconButton
            :label="t.chat.reset"
            variant="inverse"
            size="sm"
            :disabled="loading"
            @click="reset"
          >
            <RotateCcw :size="17" />
          </SIconButton>
          <SIconButton :label="t.chat.close" variant="inverse" size="sm" @click="closeChatbot">
            <X :size="20" />
          </SIconButton>
        </header>

        <div ref="scroller" class="chatbot__messages" aria-live="polite">
          <div
            v-for="message in messages"
            :key="message.id"
            class="chatbot__message"
            :class="`chatbot__message--${message.role}`"
          >
            <p class="chatbot__bubble" :class="{ 'is-error': message.kind === 'error' }">
              {{ textOf(message) }}
            </p>

            <ul
              v-if="message.sources?.length"
              class="chatbot__sources"
              :aria-label="t.chat.sources"
            >
              <li v-for="source in message.sources" :key="`${source.type}-${source.id}`">
                <component
                  :is="sourceLink(source) ? RouterLink : 'div'"
                  :to="sourceLink(source) ?? undefined"
                  class="chatbot__source"
                  @click="sourceLink(source) && isMobile && closeChatbot()"
                >
                  <img v-if="source.image_url" :src="source.image_url" alt="" loading="lazy" />
                  <span>
                    <strong class="ds-ellipsis">{{ source.title }}</strong>
                    <small v-if="source.subtitle" class="ds-ellipsis">{{ source.subtitle }}</small>
                  </span>
                </component>
              </li>
            </ul>
          </div>

          <div v-if="loading" class="chatbot__message chatbot__message--assistant" role="status">
            <div class="chatbot__bubble chatbot__typing">
              <span>{{ t.chat.loading }}</span>
              <span class="chatbot__dots" aria-hidden="true"><i /><i /><i /></span>
            </div>
          </div>
        </div>

        <div class="chatbot__quick" role="group" :aria-label="t.chat.quickLabel">
          <button
            v-for="question in quickQuestions"
            :key="question"
            type="button"
            :disabled="loading"
            @click="send(question)"
          >
            {{ question }}
          </button>
        </div>

        <form class="chatbot__form" @submit.prevent="send()">
          <input
            ref="inputEl"
            v-model="input"
            :aria-label="t.chat.inputLabel"
            :placeholder="t.chat.placeholder"
            enterkeyhint="send"
            autocomplete="off"
          />
          <button
            class="chatbot__send"
            type="submit"
            :disabled="loading || !input.trim()"
            :aria-label="t.chat.send"
          >
            <Send :size="18" aria-hidden="true" />
          </button>
        </form>
      </section>
    </Transition>

    <button
      v-show="!(open && isMobile)"
      class="chatbot__fab"
      type="button"
      :aria-label="open ? t.chat.close : t.chat.open"
      :aria-expanded="open"
      aria-controls="chatbot-panel"
      @click="toggleChatbot"
    >
      <img :src="chatCat" alt="" />
    </button>
  </div>
</template>

<style scoped>
.chatbot {
  --fab-size: 3.5rem;
  --fab-offset: var(--space-4);
}

@media (min-width: 768px) {
  .chatbot {
    --fab-size: 4.25rem;
    --fab-offset: var(--space-7);
  }
}

/* ---- FAB ---- */
.chatbot__fab {
  position: fixed;
  right: max(var(--fab-offset), env(safe-area-inset-right, 0px));
  /* 모바일: 하단 탭바 위로 띄운다. (md 이상은 --tabbar-height가 0) */
  bottom: calc(var(--tabbar-height) + var(--safe-bottom) + var(--fab-offset));
  z-index: var(--z-chat);
  display: grid;
  width: var(--fab-size);
  height: var(--fab-size);
  place-items: center;
  padding: 3px;
  overflow: hidden;
  border: 3px solid var(--color-primary);
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 12px 30px rgb(65 104 247 / 0.35);
  transition: transform var(--duration-base) var(--ease-standard);
}

@media (hover: hover) {
  .chatbot__fab:hover {
    transform: translateY(-3px);
  }
}

/* 원형 테두리에 귀가 잘리지 않도록 이미지를 원 안쪽으로 줄인다. */
.chatbot__fab img {
  width: 90%;
  height: 90%;
  object-fit: contain;
}

/* ---- Panel ---- */
.chatbot__panel {
  position: fixed;
  inset: 0;
  z-index: var(--z-chat);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-surface);
}

@media (min-width: 768px) {
  .chatbot__panel {
    inset: auto;
    right: var(--fab-offset);
    bottom: calc(var(--fab-offset) + var(--fab-size) + var(--space-4));
    width: 24rem;
    height: min(38rem, calc(100dvh - var(--header-height) - var(--fab-size) - 4rem));
    border: 1px solid var(--color-border);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-lg);
  }
}

.chatbot__header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: var(--space-2);
  padding: calc(var(--space-3) + env(safe-area-inset-top, 0px)) var(--space-3) var(--space-3)
    var(--space-4);
  color: #fff;
  background: var(--color-primary);
}

@media (min-width: 768px) {
  .chatbot__header {
    padding-top: var(--space-3);
  }
}

.chatbot__avatar {
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  padding: 0.3rem;
  border-radius: 50%;
  background: #fff;
  object-fit: contain;
}

.chatbot__heading {
  display: grid;
  flex: 1;
  min-width: 0;
}

.chatbot__heading span {
  font-size: var(--fs-xs);
  opacity: 0.85;
}

/* ---- Messages ---- */
.chatbot__messages {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  overflow-y: auto;
  overscroll-behavior: contain;
  background: var(--color-surface-alt);
}

.chatbot__message {
  display: grid;
  max-width: 85%;
  gap: var(--space-2);
  animation: ds-fade-up var(--duration-base) var(--ease-out);
}

.chatbot__message--user {
  align-self: flex-end;
  justify-items: end;
}

.chatbot__message--assistant {
  align-self: flex-start;
}

.chatbot__bubble {
  padding: var(--space-3) var(--space-3-5);
  border-radius: var(--radius-lg);
  font-size: var(--fs-sm);
  line-height: var(--lh-body);
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.chatbot__message--assistant .chatbot__bubble {
  border: 1px solid var(--color-border);
  border-top-left-radius: var(--radius-xs);
  background: var(--color-surface);
}

.chatbot__message--user .chatbot__bubble {
  border-top-right-radius: var(--radius-xs);
  color: #fff;
  background: var(--color-primary);
}

.chatbot__bubble.is-error {
  color: var(--color-danger);
  border-color: color-mix(in srgb, var(--color-danger) 30%, transparent);
  background: var(--color-danger-soft);
}

.chatbot__typing {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-muted);
}

.chatbot__dots {
  display: inline-flex;
  gap: 3px;
}

.chatbot__dots i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-primary);
  animation: chatbot-bounce 1.2s infinite ease-in-out;
}

.chatbot__dots i:nth-child(2) {
  animation-delay: 0.15s;
}

.chatbot__dots i:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes chatbot-bounce {
  0%,
  60%,
  100% {
    opacity: 0.4;
    transform: translateY(0);
  }

  30% {
    opacity: 1;
    transform: translateY(-4px);
  }
}

/* ---- Sources ---- */
.chatbot__sources {
  display: grid;
  gap: var(--space-1-5);
}

.chatbot__source {
  display: flex;
  align-items: center;
  gap: var(--space-2-5);
  padding: var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

a.chatbot__source:hover {
  border-color: var(--color-border-strong);
}

.chatbot__source img {
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  object-fit: cover;
}

.chatbot__source > span {
  display: grid;
  min-width: 0;
}

.chatbot__source strong {
  font-size: var(--fs-sm);
}

.chatbot__source small {
  color: var(--color-text-subtle);
  font-size: var(--fs-xs);
}

/* ---- Quick questions: 모바일은 가로 스크롤 한 줄, 데스크톱은 줄바꿈 ---- */
.chatbot__quick {
  display: flex;
  flex-shrink: 0;
  gap: var(--space-2);
  padding: var(--space-3);
  overflow-x: auto;
  border-top: 1px solid var(--color-border);
  scrollbar-width: none;
}

.chatbot__quick::-webkit-scrollbar {
  display: none;
}

@media (min-width: 768px) {
  .chatbot__quick {
    flex-wrap: wrap;
    overflow-x: visible;
  }
}

.chatbot__quick button {
  flex-shrink: 0;
  min-height: 2.25rem;
  padding: var(--space-1-5) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  color: var(--color-text-muted);
  background: var(--color-surface);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
  white-space: nowrap;
}

.chatbot__quick button:hover:not(:disabled) {
  color: var(--color-primary);
  border-color: var(--color-border-strong);
}

.chatbot__quick button:disabled {
  opacity: 0.45;
}

/* ---- Form ---- */
.chatbot__form {
  display: flex;
  flex-shrink: 0;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-3) calc(var(--space-3) + var(--safe-bottom));
  border-top: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .chatbot__form {
    padding-bottom: var(--space-3);
  }
}

.chatbot__form input {
  flex: 1;
  min-width: 0;
  height: var(--tap-target);
  padding: 0 var(--space-3-5);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  outline: none;
  color: var(--color-text);
  background: var(--color-surface-alt);
}

.chatbot__form input:focus {
  border-color: var(--color-primary);
  box-shadow: var(--focus-ring);
}

.chatbot__send {
  display: grid;
  width: var(--tap-target);
  height: var(--tap-target);
  flex-shrink: 0;
  place-items: center;
  border: 0;
  border-radius: var(--radius-md);
  color: #fff;
  background: var(--color-primary);
}

.chatbot__send:disabled {
  opacity: 0.45;
}

/* ---- Transition ---- */
.chatbot-enter-active,
.chatbot-leave-active {
  transition:
    opacity var(--duration-base) var(--ease-standard),
    transform var(--duration-slow) var(--ease-out);
}

.chatbot-enter-from,
.chatbot-leave-to {
  opacity: 0;
  transform: translateY(24px);
}

@media (min-width: 768px) {
  .chatbot__panel {
    transform-origin: bottom right;
  }

  .chatbot-enter-from,
  .chatbot-leave-to {
    transform: translateY(12px) scale(0.97);
  }
}
</style>
