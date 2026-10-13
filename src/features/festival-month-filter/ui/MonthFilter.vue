<script setup lang="ts">
import { computed } from 'vue'
import { SChipGroup, type ChipOption } from '@soulrip/design-system'
import { useI18n } from '@/shared/i18n'

/** null = 전체 */
const month = defineModel<number | null>({ required: true })

const { t, locale } = useI18n()

const options = computed<ChipOption<number | null>[]>(() => {
  // 월 이름은 Intl로 현재 언어에 맞게 만든다. (ko: 10월 / en: Oct / fr: oct. / de: Okt.)
  const formatter = new Intl.DateTimeFormat(locale.value, { month: 'short' })

  return [
    { value: null, label: t.value.common.all },
    ...Array.from({ length: 12 }, (_, index) => ({
      value: index + 1,
      label: formatter.format(new Date(2000, index, 1)),
    })),
  ]
})
</script>

<template>
  <SChipGroup
    v-model="month"
    :options="options"
    :label="t.festival.list.monthFilterLabel"
    size="sm"
  />
</template>
