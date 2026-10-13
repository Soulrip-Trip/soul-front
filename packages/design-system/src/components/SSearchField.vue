<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'
import { useDsMessages } from '@soulrip/design-system/locale'
import SInput from './SInput.vue'

defineProps<{
  /** 입력창의 접근성 이름 (placeholder와 별개로 필요) */
  label: string
  placeholder?: string
}>()

const model = defineModel<string>({ default: '' })
const messages = useDsMessages()
</script>

<template>
  <div class="s-search-field" role="search">
    <SInput
      v-model="model"
      type="search"
      size="lg"
      :aria-label="label"
      :placeholder="placeholder"
      enterkeyhint="search"
      autocomplete="off"
    >
      <template #leading>
        <Search :size="19" />
      </template>
      <template v-if="model" #trailing>
        <button
          class="s-search-field__clear"
          type="button"
          :aria-label="messages.search.clear"
          @click="model = ''"
        >
          <X :size="16" />
        </button>
      </template>
    </SInput>
  </div>
</template>

<style scoped>
.s-search-field {
  width: 100%;
  max-width: 40rem;
}

.s-search-field__clear {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  margin-right: calc(var(--space-2) * -1);
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: var(--color-text-subtle);
  background: var(--color-surface-sunken);
}

@media (hover: hover) {
  .s-search-field__clear:hover {
    color: var(--color-text);
  }
}
</style>
