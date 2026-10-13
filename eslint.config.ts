import type { Linter } from 'eslint'
import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

/* -----------------------------------------------------------------------------
 * Import 규칙 (FSD + 경로 규칙)
 *
 * 1. 같은 슬라이스/폴더 내부  → 상대 경로     (./model/usePlaceList)
 * 2. 다른 슬라이스/레이어/폴더 → 절대 경로     (@/entities/place, @soulrip/api)
 * 3. 레이어 방향: app → pages → widgets → features → entities → shared
 *    (아래 레이어는 위 레이어를 import 할 수 없다)
 * 4. 슬라이스는 public API(index.ts)로만 접근한다. (@/entities/place/ui/X.vue ✗)
 * 5. 같은 레이어의 다른 슬라이스는 import 하지 않는다. (shared 제외)
 * -------------------------------------------------------------------------- */

const LAYERS = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'] as const
type Layer = (typeof LAYERS)[number]
type Pattern = { regex: string; message: string }

const parentRelative: Pattern = {
  regex: '^\\.\\./\\.\\./',
  message:
    '두 단계 이상 상위 폴더로 나가는 import는 금지입니다. 다른 폴더는 절대 경로(@/..., @soulrip/...)를 사용하세요.',
}

const anyParentRelative: Pattern = {
  regex: '^\\.\\./',
  message:
    '슬라이스/폴더 밖은 상대 경로로 import 할 수 없습니다. 절대 경로(@/..., @soulrip/...)를 사용하세요.',
}

const deepSliceImport: Pattern = {
  regex: '^@/(pages|widgets|features|entities)/[^/]+/.+',
  message:
    '슬라이스 내부 파일을 직접 import 하지 마세요. 슬라이스의 public API(index.ts)를 사용하세요.',
}

const deepPackageImport: Pattern = {
  regex: '^@soulrip/[^/]+/src/',
  message: '패키지 내부 경로(src/) 대신 package.json exports에 정의된 경로를 사용하세요.',
}

function layerPatterns(layer: Layer): Pattern[] {
  const index = LAYERS.indexOf(layer)
  const upper = LAYERS.slice(0, index)
  const patterns: Pattern[] = [deepSliceImport, deepPackageImport]

  if (upper.length > 0) {
    patterns.push({
      regex: `^@/(${upper.join('|')})(/|$)`,
      message: `'${layer}' 레이어는 상위 레이어(${upper.join(', ')})를 import 할 수 없습니다.`,
    })
  }

  // 같은 레이어의 다른 슬라이스 import 금지 (자기 슬라이스는 상대 경로를 쓰므로 함께 막힌다)
  if (layer !== 'shared' && layer !== 'app') {
    patterns.push({
      regex: `^@/${layer}(/|$)`,
      message: `같은 레이어('${layer}')의 슬라이스끼리는 import 하지 않습니다. 자기 슬라이스 내부는 상대 경로를 사용하세요.`,
    })
  }

  return patterns
}

function restrict(files: string[], patterns: Pattern[]): Linter.Config {
  return {
    files,
    rules: {
      'no-restricted-imports': ['error', { patterns }],
    },
  }
}

const fsdImportRules = LAYERS.flatMap((layer) => [
  // 슬라이스(세그먼트) 내부 파일: 한 단계 상위(../model 등)까지만 상대 경로 허용
  restrict([`src/${layer}/**/*.{ts,vue}`], [...layerPatterns(layer), parentRelative]),
  // 슬라이스 루트 파일(index.ts 등): 상위로 나가는 상대 경로 전부 금지
  restrict([`src/${layer}/*/*.{ts,vue}`], [...layerPatterns(layer), anyParentRelative]),
])

const packageImportRules = restrict(
  ['library/**/*.{ts,vue}', 'packages/**/*.{ts,vue}'],
  [
    anyParentRelative,
    deepPackageImport,
    { regex: '^@/', message: '패키지는 앱 코드(@/...)에 의존할 수 없습니다.' },
  ],
)

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    '**/node_modules/**',
    '**/*.generated.ts',
  ]),

  ...pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,

  {
    name: 'app/rules',
    rules: {
      // Vue
      'vue/block-lang': ['error', { script: { lang: 'ts' } }],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        { registeredComponentsOnly: false },
      ],
      'vue/define-macros-order': [
        'error',
        { order: ['defineOptions', 'defineProps', 'defineEmits', 'defineModel', 'defineSlots'] },
      ],
      'vue/html-button-has-type': 'error',
      'vue/no-unused-refs': 'error',
      'vue/no-useless-v-bind': 'error',
      'vue/no-v-html': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/require-default-prop': 'off',

      // TypeScript
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // JS
      eqeqeq: ['error', 'smart'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
    },
  },

  ...fsdImportRules,
  packageImportRules,

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
  skipFormatting,
)
