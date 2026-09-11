import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

type Variant = 'primary' | 'ghost' | 'outline'
type Size = 'md' | 'lg'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] select-none whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary: 'bg-fg text-ink hover:bg-white hover:-translate-y-0.5',
  outline: 'border border-line-2 text-fg hover:border-fg/40 hover:bg-white/[0.04] hover:-translate-y-0.5',
  ghost: 'text-fg-2 hover:text-fg hover:bg-white/[0.05]',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-[15px]',
}

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode }

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  )
}
