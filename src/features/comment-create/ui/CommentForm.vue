<script setup lang="ts">
import { Send } from 'lucide-vue-next'
import type { Comment } from '@soulrip/api'
import { SButton, SField, SInput, STextarea } from '@soulrip/design-system'
import { useI18n } from '@/shared/i18n'
import { COMMENT_RULES, useCommentForm } from '../model/useCommentForm'

const props = defineProps<{ postId: number }>()
const emit = defineEmits<{ created: [comment: Comment] }>()

const { t } = useI18n()
const { form, submitting, error, canSubmit, submit } = useCommentForm(
  () => props.postId,
  (comment) => emit('created', comment),
)
</script>

<template>
  <!--
    480px 미만: 닉네임 / 비밀번호 / 내용 / 등록 버튼(가로 100%)이 세로로 쌓인다.
    480px 이상: 닉네임 | 비밀번호 2열, 등록 버튼은 오른쪽 정렬.
  -->
  <form class="comment-form" :aria-label="t.comment.formLabel" @submit.prevent="submit">
    <div class="ds-grid ds-grid--half">
      <SField v-slot="field" :label="t.comment.nickname">
        <SInput
          :id="field.id"
          v-model="form.nickname"
          :maxlength="COMMENT_RULES.nicknameMax"
          :placeholder="t.comment.nicknamePlaceholder"
          autocomplete="nickname"
        />
      </SField>
      <SField v-slot="field" :label="t.comment.password">
        <SInput
          :id="field.id"
          v-model="form.password"
          type="password"
          :maxlength="COMMENT_RULES.passwordMax"
          :placeholder="t.comment.passwordPlaceholder"
          autocomplete="new-password"
        />
      </SField>
    </div>

    <SField v-slot="field" :label="t.comment.content" :hint="t.comment.shortcut">
      <STextarea
        :id="field.id"
        v-model="form.content"
        :rows="4"
        :maxlength="COMMENT_RULES.contentMax"
        show-count
        :placeholder="t.comment.contentPlaceholder"
        :aria-describedby="field.describedBy"
        @keydown.ctrl.enter.prevent="submit"
        @keydown.meta.enter.prevent="submit"
      />
    </SField>

    <p v-if="error" class="comment-form__error" role="alert">{{ error }}</p>

    <div class="comment-form__actions">
      <SButton type="submit" :disabled="!canSubmit" :loading="submitting" block-on-mobile>
        <Send :size="16" aria-hidden="true" />
        {{ submitting ? t.comment.submitting : t.comment.submit }}
      </SButton>
    </div>
  </form>
</template>

<style scoped>
.comment-form {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface-alt);
}

@media (min-width: 768px) {
  .comment-form {
    padding: var(--space-6);
  }
}

.comment-form__error {
  color: var(--color-danger);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
}

.comment-form__actions {
  display: flex;
  justify-content: flex-end;
}
</style>
