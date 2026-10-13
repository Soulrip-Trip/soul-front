<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { Share2 } from 'lucide-vue-next'
import { SButton } from '@soulrip/design-system'
import { shareOrCopy } from '@soulrip/library'
import { useI18n } from '@/shared/i18n'

const props = defineProps<{ title: string; text?: string }>()

const { t } = useI18n()
const feedback = ref('')
let timer: ReturnType<typeof setTimeout> | undefined

async function share() {
  const result = await shareOrCopy({
    title: props.title,
    text: props.text,
    url: window.location.href,
  })

  if (result === 'copied') feedback.value = t.value.common.linkCopied
  else if (result === 'failed') feedback.value = t.value.common.copyFailed
  else return

  clearTimeout(timer)
  timer = setTimeout(() => (feedback.value = ''), 2500)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="share-button">
    <SButton variant="outline" block @click="share">
      <Share2 :size="16" aria-hidden="true" />
      {{ t.common.share }}
    </SButton>
    <p class="share-button__feedback" role="status" aria-live="polite">{{ feedback }}</p>
  </div>
</template>

<style scoped>
.share-button {
  position: relative;
}

.share-button__feedback {
  position: absolute;
  top: calc(100% + var(--space-1));
  left: 0;
  right: 0;
  color: var(--color-success);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
  text-align: center;
}
</style>
