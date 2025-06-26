"use client"

import type * as React from "react"

/**
 * Safely renders an icon component (or any React component) only if it exists.
 * Prevents "Cannot read properties of null (reading 'type')" runtime errors.
 */
export function SafeIcon({
  icon: Icon,
  className,
  fallback = null,
}: {
  icon: React.ComponentType<{ className?: string }> | undefined | null
  className?: string
  fallback?: React.ReactNode
}) {
  try {
    if (!Icon || typeof Icon !== "function") {
      return fallback
    }
    return <Icon className={className} />
  } catch (error) {
    console.warn("SafeIcon render error:", error)
    return fallback
  }
}
