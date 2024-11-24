import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sliceEmail(email: string) {
  return email?.slice(0, email?.indexOf('@')) || ''
}
