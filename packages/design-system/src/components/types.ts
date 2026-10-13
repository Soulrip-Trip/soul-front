import type { Component } from 'vue'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ChipOption<V> {
  value: V
  label: string
  icon?: Component
}

export interface InfoItem {
  key: string
  label: string
  value: string
  icon?: Component
  /** 값이 링크일 때 (전화 tel:, 외부 URL 등) */
  href?: string
}
