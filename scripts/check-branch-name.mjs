#!/usr/bin/env node
/**
 * 브랜치 이름 규칙 검사 (husky pre-commit / pre-push에서 실행)
 *
 *   <type>/<짧은-설명>            feat/place-filter
 *   <type>/<이슈번호>-<짧은-설명>  fix/42-comment-count
 *
 * main 브랜치에는 직접 커밋하지 않고 PR로만 병합한다.
 * 긴급 상황에서는 `git commit --no-verify`로 우회할 수 있지만 PR 설명에 사유를 남긴다.
 */
import { execSync } from 'node:child_process'

const TYPES = [
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
  'hotfix',
  'release',
]
const PROTECTED = ['main']
const PATTERN = new RegExp(`^(${TYPES.join('|')})/[a-z0-9][a-z0-9._-]*$`)

const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim()

// rebase/detached HEAD 중에는 검사하지 않는다.
if (branch === 'HEAD') process.exit(0)

if (PROTECTED.includes(branch)) {
  console.error(`\n✖ '${branch}' 브랜치에 직접 커밋할 수 없습니다.`)
  console.error('  작업 브랜치를 만든 뒤 PR로 병합하세요:  git switch -c feat/<설명>\n')
  process.exit(1)
}

if (!PATTERN.test(branch)) {
  console.error(`\n✖ 브랜치 이름 '${branch}'이(가) 규칙에 맞지 않습니다.`)
  console.error(`  형식: <type>/<설명>   type = ${TYPES.join(' | ')}`)
  console.error('  설명은 영문 소문자, 숫자, -, _, . 만 사용합니다.')
  console.error('  예시: feat/place-filter, fix/42-comment-count\n')
  console.error(`  이름 변경: git branch -m <새-이름>\n`)
  process.exit(1)
}
