import { computed, type Component } from 'vue'
import { Clock3, Coffee, Heart, Sun } from 'lucide-vue-next'
import { insightApi, type TodayInsightResponse } from '@soulrip/api'
import { useAsyncState } from '@soulrip/library/vue'
import { useI18n } from '@/shared/i18n'

export type InsightTone = 'yellow' | 'blue' | 'green' | 'pink'

export interface InsightCard {
  key: keyof TodayInsightResponse
  icon: Component
  tone: InsightTone
  label: string
  headline: string
  description: string
  image: string
}

const CARD_META: ReadonlyArray<{
  key: keyof TodayInsightResponse
  icon: Component
  tone: InsightTone
}> = [
  { key: 'today', icon: Sun, tone: 'yellow' },
  { key: 'time', icon: Clock3, tone: 'blue' },
  { key: 'place', icon: Coffee, tone: 'green' },
  { key: 'tip', icon: Heart, tone: 'pink' },
]

/** 오늘의 AI 인사이트. 사용자가 버튼을 눌렀을 때만 요청한다. (AI 호출 비용) */
export function useTodayInsight() {
  const { t } = useI18n()
  const state = useAsyncState(
    () => insightApi.getTodayInsight(),
    null as TodayInsightResponse | null,
    {
      errorMessage: t.value.home.insight.errorTitle,
    },
  )

  const cards = computed<InsightCard[]>(() => {
    const insight = state.data.value
    if (!insight) return []

    return CARD_META.map(({ key, icon, tone }) => ({
      key,
      icon,
      tone,
      label: insight[key].label,
      headline: insight[key].headline,
      description: insight[key].description,
      image: insight[key].image_url,
    }))
  })

  return {
    insight: state.data,
    cards,
    loading: state.loading,
    error: state.error,
    load: () => {
      if (!state.loading.value) void state.run()
    },
  }
}
