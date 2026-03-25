import type { ReactNode } from "react"

export interface FlowStep {
  label: string
  sub?: string
}

export interface SchemeBox {
  label: string
  sub?: string
  accent?: boolean
}

export interface Section {
  id: string
  title: string
  subtitle?: ReactNode
  content?: string
  bgImage?: string
  // list of bullet items
  items?: string[]
  itemsLabel?: string
  // flow diagram: steps connected by arrows
  flowSteps?: FlowStep[]
  // two-column grid of boxes
  schemeBoxes?: SchemeBox[]
  schemeLabel?: string
  // participants table
  participants?: { role: string; can: boolean }[]
  showButton?: boolean
  buttonText?: string
  buttonAction?: string
}

export interface SectionProps extends Section {
  isActive: boolean
  onButtonClick?: () => void
}
