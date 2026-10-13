export interface TodayInsightItem {
  label: string
  headline: string
  description: string
  image_url: string
}

export interface TodayInsightResponse {
  today: TodayInsightItem
  time: TodayInsightItem
  place: TodayInsightItem
  tip: TodayInsightItem
}
