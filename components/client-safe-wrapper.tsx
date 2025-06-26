"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface ClientSafeWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ClientSafeWrapper({ children, fallback = null }: ClientSafeWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    try {
      setIsMounted(true)
    } catch (error) {
      console.error("ClientSafeWrapper mount error:", error)
      setHasError(true)
    }
  }, [])

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error?.message?.includes("Cannot read properties of null")) {
        console.warn("Caught null property error, likely from browser extension")
        event.preventDefault()
        return false
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason?.message?.includes("Cannot read properties of null")) {
        console.warn("Caught null property rejection, likely from browser extension")
        event.preventDefault()
        return false
      }
    }

    window.addEventListener("error", handleError)
    window.addEventListener("unhandledrejection", handleUnhandledRejection)

    return () => {
      window.removeEventListener("error", handleError)
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [])

  if (hasError) {
    return fallback
  }

  if (!isMounted) {
    return fallback
  }

  return <>{children}</>
}
