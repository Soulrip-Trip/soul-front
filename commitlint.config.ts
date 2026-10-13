import type { UserConfig } from '@commitlint/types'

/**
 * Conventional Commits
 *   <type>(<scope>): <subject>
 *
 *   feat(place): 장소 목록 URL 쿼리 동기화
 *   fix(post): 댓글 등록 후 commentCount 불일치 수정
 *
 * 자세한 규칙은 CONTRIBUTING.md 참고.
 */
const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'style',
        'design',
        'docs',
        'test',
        'perf',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    // scope는 권장 목록 외 값도 허용(경고)
    'scope-enum': [
      1,
      'always',
      [
        'home',
        'place',
        'festival',
        'post',
        'comment',
        'like',
        'chat',
        'insight',
        'journey',
        'i18n',
        'app',
        'shared',
        'design-system',
        'api',
        'config',
        'library',
        'font',
        'deps',
        'lint',
        'docs',
      ],
    ],
    // 한글 제목을 쓰므로 대소문자 규칙은 끈다.
    'subject-case': [0],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [1, 'always', 100],
  },
}

export default config
