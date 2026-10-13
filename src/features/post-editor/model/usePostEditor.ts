import { computed, reactive, ref } from 'vue'
import { postApi, type CommunityPost, type WritablePostType } from '@soulrip/api'
import { splitTags, toErrorMessage } from '@soulrip/library'
import { isWritablePostType } from '@/entities/post'
import { useI18n } from '@/shared/i18n'

export const POST_RULES = {
  titleMin: 2,
  titleMax: 150,
  contentMin: 2,
  contentMax: 5000,
  nicknameMax: 40,
  passwordMin: 4,
} as const

export interface PostEditorPrefill {
  type?: string
  /** 축제 상세의 "동행 모집하기"에서 넘어온 장소명 */
  place?: string
  /** 축제 상세의 "동행 모집하기"에서 넘어온 날짜 (YYYY-MM-DD) */
  date?: string
}

export interface PostEditorForm {
  type: WritablePostType
  title: string
  content: string
  nickname: string
  password: string
  tags: string
}

/** 동행 모집으로 진입하면 본문 첫 줄에 날짜·장소를 넣어 둔다. (언어와 무관한 형식) */
function prefillContent({ date, place }: PostEditorPrefill): string {
  const line = [date, place].filter(Boolean).join(' · ')

  return line ? `${line}\n\n` : ''
}

/**
 * 게시글 작성/수정 폼 상태, 검증, 저장.
 * 검증 메시지는 제출을 한 번 시도한 뒤부터 보여준다. (입력 도중 빨간 글씨 방지)
 */
export function usePostEditor(postId: number | null, prefill: PostEditorPrefill = {}) {
  const { t } = useI18n()
  const isEdit = postId !== null

  const form = reactive<PostEditorForm>({
    type: isWritablePostType(prefill.type) ? prefill.type : 'FOOD',
    title: '',
    content: prefillContent(prefill),
    nickname: '',
    password: '',
    tags: prefill.place ?? '',
  })

  const loading = ref(isEdit)
  const loadError = ref('')
  const submitting = ref(false)
  const submitError = ref('')
  const submitted = ref(false)

  const errors = computed(() => {
    const messages = t.value.post.editor.validation

    return {
      title: form.title.trim().length < POST_RULES.titleMin ? messages.title : '',
      content: form.content.trim().length < POST_RULES.contentMin ? messages.content : '',
      nickname: form.nickname.trim().length === 0 ? messages.nickname : '',
      password: form.password.length < POST_RULES.passwordMin ? messages.password : '',
    }
  })

  const valid = computed(() => Object.values(errors.value).every((message) => !message))

  /** 화면에 표시할 오류 (제출 시도 전에는 빈 값) */
  const visibleErrors = computed(() =>
    submitted.value ? errors.value : { title: '', content: '', nickname: '', password: '' },
  )

  async function load() {
    if (!isEdit) return

    loading.value = true
    loadError.value = ''

    try {
      const post = await postApi.getPost(postId)
      form.type = isWritablePostType(post.type) ? post.type : 'GENERAL'
      form.title = post.title
      form.content = post.content
      form.nickname = post.nickname
      form.tags = post.tags.join(', ')
    } catch (caught) {
      loadError.value = toErrorMessage(caught, t.value.post.editor.loadError)
    } finally {
      loading.value = false
    }
  }

  /** 저장에 성공하면 저장된 게시글을, 실패하거나 검증에 걸리면 null을 반환한다. */
  async function submit(): Promise<CommunityPost | null> {
    submitted.value = true
    if (!valid.value || submitting.value) return null

    submitting.value = true
    submitError.value = ''

    const payload = {
      type: form.type,
      title: form.title.trim(),
      content: form.content.trim(),
      nickname: form.nickname.trim(),
      password: form.password,
      tags: splitTags(form.tags),
    }

    try {
      return isEdit ? await postApi.updatePost(postId, payload) : await postApi.createPost(payload)
    } catch (caught) {
      submitError.value = toErrorMessage(caught, t.value.post.editor.saveError)
      return null
    } finally {
      submitting.value = false
    }
  }

  return {
    isEdit,
    form,
    loading,
    loadError,
    submitting,
    submitError,
    errors: visibleErrors,
    valid,
    load,
    submit,
  }
}
