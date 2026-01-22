import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatUrl } from "./cache"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUrlHostname(url: string): string {
  if (!url) return ""
  try {
    const formattedUrl = formatUrl(url)
    return new URL(formattedUrl).hostname.replace(/^www\./, "")
  } catch {
    return url.length > 50 ? `${url.substring(0, 50)}...` : url
  }
}

export function getDisplayUrl(url: string): string {
  if (!url) return ""
  try {
    const formattedUrl = formatUrl(url)
    const urlObj = new URL(formattedUrl)
    return urlObj.hostname + urlObj.pathname
  } catch {
    return url
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === "undefined" || !navigator.clipboard) {
    return false
  }
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}
