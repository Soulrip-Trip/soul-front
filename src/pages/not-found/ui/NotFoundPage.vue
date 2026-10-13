<script setup lang="ts">
import { Compass, House } from 'lucide-vue-next'
import { SButton } from '@soulrip/design-system'
import chatCat from '@/shared/assets/images/chat-cat.jpg'
import { paths } from '@/shared/config'
import { useI18n } from '@/shared/i18n'

const { t } = useI18n()
</script>

<template>
  <div class="ds-page">
    <div class="ds-container not-found">
      <img class="not-found__image" :src="chatCat" alt="" />
      <span class="not-found__code">{{ t.notFound.code }}</span>
      <h1 class="ds-h1">{{ t.notFound.title }}</h1>
      <p class="ds-lead">{{ t.notFound.description }}</p>
      <!-- ~479px: 버튼 2개가 세로로 가로 100% / 480px~: 한 줄 -->
      <div class="not-found__actions">
        <SButton :to="paths.home()" block-on-mobile>
          <House :size="17" aria-hidden="true" />
          {{ t.notFound.home }}
        </SButton>
        <SButton variant="outline" :to="paths.placeList()" block-on-mobile>
          <Compass :size="17" aria-hidden="true" />
          {{ t.notFound.explore }}
        </SButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  min-height: 60dvh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  text-align: center;
}

.not-found__image {
  width: 6rem;
  height: 6rem;
  border: 3px solid var(--color-primary);
  border-radius: 50%;
  background: #fff;
  object-fit: contain;
}

.not-found__code {
  color: var(--color-primary);
  font-size: var(--fs-h2);
  font-weight: var(--fw-extrabold);
  letter-spacing: 0.08em;
}

.not-found__actions {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-4);
}
</style>
