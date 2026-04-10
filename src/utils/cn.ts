import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes safely — resolves conflicts properly.
 * Usage: cn('px-4 py-2', condition && 'bg-neon-green', className)
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
