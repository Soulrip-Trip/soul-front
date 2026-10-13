<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next'
import { SButton, SField, SInput, SModal } from '@soulrip/design-system'
import { useI18n } from '@/shared/i18n'
import { usePostDelete } from '../model/usePostDelete'

const props = defineProps<{ postId: number }>()
const emit = defineEmits<{ deleted: [] }>()

const { t } = useI18n()
const { open, password, pending, error, submit } = usePostDelete(
  () => props.postId,
  () => emit('deleted'),
)
</script>

<template>
  <SButton variant="danger" size="sm" @click="open = true">
    <Trash2 :size="15" aria-hidden="true" />
    {{ t.common.delete }}
  </SButton>

  <SModal
    v-model:open="open"
    :title="t.post.remove.title"
    :description="t.post.remove.description"
    :persistent="pending"
  >
    <form id="delete-post-form" @submit.prevent="submit">
      <SField v-slot="field" :label="t.post.remove.password" :error="error">
        <SInput
          :id="field.id"
          v-model="password"
          type="password"
          autocomplete="current-password"
          :invalid="field.invalid"
          :aria-describedby="field.describedBy"
        />
      </SField>
    </form>

    <template #actions>
      <SButton variant="secondary" :disabled="pending" @click="open = false">
        {{ t.common.cancel }}
      </SButton>
      <SButton
        variant="danger"
        type="submit"
        form="delete-post-form"
        :disabled="!password"
        :loading="pending"
      >
        {{ pending ? t.post.remove.submitting : t.post.remove.submit }}
      </SButton>
    </template>
  </SModal>
</template>
