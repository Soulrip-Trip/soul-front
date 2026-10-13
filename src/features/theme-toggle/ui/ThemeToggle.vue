<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { SIconButton } from '@soulrip/design-system'
import { useI18n } from '@/shared/i18n'
import { useAppSettings } from '@/shared/model'

const { isDark, toggleTheme } = useAppSettings()
const { t } = useI18n()
</script>

<template>
  <SIconButton
    :label="isDark ? t.nav.themeToLight : t.nav.themeToDark"
    :pressed="isDark"
    @click="toggleTheme"
  >
    <Sun v-if="isDark" :size="18" />
    <Moon v-else :size="18" />
  </SIconButton>
</template>
