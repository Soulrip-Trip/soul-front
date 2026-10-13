<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { APP_NAME } from '@soulrip/config'
import { provideDsMessages } from '@soulrip/design-system'
import { AppFooter } from '@/widgets/app-footer'
import { AppHeader } from '@/widgets/app-header'
import { ChatbotWidget } from '@/widgets/chatbot'
import { JourneyToast } from '@/widgets/journey-toast'
import { MobileTabBar } from '@/widgets/mobile-tab-bar'
import { useI18n } from '@/shared/i18n'

const route = useRoute()
const { t } = useI18n()

// 디자인 시스템 컴포넌트 내부 문구(페이지네이션, 닫기 등)도 현재 언어로 바꾼다.
provideDsMessages(() => t.value.ds)

// 라우트 · 언어가 바뀌면 문서 제목을 갱신한다.
watchEffect(() => {
  const key = route.meta.titleKey
  const title = key ? t.value.meta[key] : ''
  document.title = title ? `${title} | ${APP_NAME}` : APP_NAME
})
</script>

<template>
  <div class="app-shell">
    <a class="skip-link" href="#main">{{ t.common.skipToContent }}</a>
    <AppHeader />
    <main id="main" class="app-main" tabindex="-1">
      <RouterView />
    </main>
    <AppFooter />
    <MobileTabBar />
    <ChatbotWidget />
    <JourneyToast />
  </div>
</template>
