import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sliceEmail(email?: string) {
  if (email) {
    return email.slice(0, email.indexOf('@'))
  }
  return null
}
