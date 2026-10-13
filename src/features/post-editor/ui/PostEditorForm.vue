<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { CommunityPost } from '@soulrip/api'
import { SButton, SEmptyState, SField, SInput, SSelect, STextarea } from '@soulrip/design-system'
import { WRITABLE_POST_TYPES } from '@/entities/post'
import { useI18n } from '@/shared/i18n'
import { POST_RULES, usePostEditor, type PostEditorPrefill } from '../model/usePostEditor'

const props = withDefaults(
  defineProps<{
    /** 수정 모드면 게시글 id, 작성 모드면 null */
    postId?: number | null
    prefill?: PostEditorPrefill
  }>(),
  { postId: null, prefill: () => ({}) },
)
const emit = defineEmits<{ saved: [post: CommunityPost] }>()

const { t } = useI18n()
const editor = usePostEditor(props.postId, props.prefill)
const { form, errors } = editor

const typeOptions = computed(() =>
  WRITABLE_POST_TYPES.map((type) => ({ value: type, label: t.value.post.types[type] })),
)

async function onSubmit() {
  const saved = await editor.submit()
  if (saved) emit('saved', saved)
}

onMounted(editor.load)
</script>

<template>
  <SEmptyState v-if="editor.loading.value" tone="loading" :title="t.post.editor.loading" plain />

  <SEmptyState
    v-else-if="editor.loadError.value"
    tone="error"
    :title="t.post.editor.loadError"
    :description="editor.loadError.value"
    plain
  >
    <template #actions>
      <SButton variant="secondary" @click="editor.load">{{ t.common.retry }}</SButton>
    </template>
  </SEmptyState>

  <!--
    480px 미만: 모든 입력이 한 줄씩 쌓인다.
    480px 이상: 닉네임 | 비밀번호가 2열로 나란히 배치된다.
  -->
  <form v-else class="post-editor" novalidate @submit.prevent="onSubmit">
    <SField v-slot="field" :label="t.post.editor.type" required>
      <SSelect :id="field.id" v-model="form.type" :options="typeOptions" />
    </SField>

    <div class="ds-grid ds-grid--half">
      <SField v-slot="field" :label="t.post.editor.nickname" :error="errors.nickname" required>
        <SInput
          :id="field.id"
          v-model="form.nickname"
          :maxlength="POST_RULES.nicknameMax"
          :placeholder="t.post.editor.nicknamePlaceholder"
          autocomplete="nickname"
          :invalid="field.invalid"
          :aria-describedby="field.describedBy"
        />
      </SField>

      <SField
        v-slot="field"
        :label="t.post.editor.password"
        :hint="editor.isEdit ? t.post.editor.passwordHintEdit : ''"
        :error="errors.password"
        required
      >
        <SInput
          :id="field.id"
          v-model="form.password"
          type="password"
          :minlength="POST_RULES.passwordMin"
          :placeholder="t.post.editor.passwordPlaceholder"
          :autocomplete="editor.isEdit ? 'current-password' : 'new-password'"
          :invalid="field.invalid"
          :aria-describedby="field.describedBy"
        />
      </SField>
    </div>

    <SField v-slot="field" :label="t.post.editor.title" :error="errors.title" required>
      <SInput
        :id="field.id"
        v-model="form.title"
        :maxlength="POST_RULES.titleMax"
        :placeholder="t.post.editor.titlePlaceholder"
        autocomplete="off"
        :invalid="field.invalid"
        :aria-describedby="field.describedBy"
      />
    </SField>

    <SField v-slot="field" :label="t.post.editor.content" :error="errors.content" required>
      <STextarea
        :id="field.id"
        v-model="form.content"
        :rows="10"
        :maxlength="POST_RULES.contentMax"
        show-count
        :placeholder="t.post.editor.contentPlaceholder"
        :invalid="field.invalid"
        :aria-describedby="field.describedBy"
      />
    </SField>

    <SField v-slot="field" :label="t.post.editor.tags" :hint="t.post.editor.tagsHint">
      <SInput
        :id="field.id"
        v-model="form.tags"
        :placeholder="t.post.editor.tagsPlaceholder"
        autocomplete="off"
        :aria-describedby="field.describedBy"
      />
    </SField>

    <p v-if="editor.submitError.value" class="post-editor__error" role="alert">
      {{ editor.submitError.value }}
    </p>

    <SButton type="submit" size="lg" block :loading="editor.submitting.value">
      {{
        editor.submitting.value
          ? t.post.editor.submitting
          : editor.isEdit
            ? t.post.editor.submitEdit
            : t.post.editor.submitCreate
      }}
    </SButton>
  </form>
</template>

<style scoped>
.post-editor {
  display: grid;
  gap: var(--space-5);
}

@media (min-width: 768px) {
  .post-editor {
    gap: var(--space-6);
  }
}

.post-editor__error {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  color: var(--color-danger);
  background: var(--color-danger-soft);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
  white-space: pre-line;
}
</style>
