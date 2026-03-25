import type { ReactNode } from "react"

export interface Section {
  id: string
  title: string
  subtitle?: ReactNode
  content?: string
  paragraphs?: string[]
  items?: string[]
  itemsLabel?: string
  showButton?: boolean
  buttonText?: string
  buttonAction?: string
}

export interface SectionProps extends Section {
  isActive: boolean
  onButtonClick?: () => void
}
