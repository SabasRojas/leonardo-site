import { createContext, useContext } from 'react'
import type { ImageAsset } from '../data/images'

export type LightboxItem = { asset: ImageAsset; alt: string; caption?: string }

export type LightboxCtx = { open: (items: LightboxItem[], index?: number) => void }

export const LightboxContext = createContext<LightboxCtx | null>(null)

export function useLightbox() {
  const ctx = useContext(LightboxContext)
  if (!ctx) throw new Error('useLightbox must be used within <LightboxProvider>')
  return ctx
}
