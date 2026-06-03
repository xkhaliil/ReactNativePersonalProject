/**
 * useStorage
 *
 * A generic, typed wrapper around AsyncStorage.
 * All persistence in this app goes through this hook — nothing
 * imports AsyncStorage directly.
 *
 * Usage:
 *   const [value, setValue, { loading }] = useStorage<MyType>('my-key', defaultValue)
 */

import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCallback, useEffect, useState } from "react"

type StorageState = {
  loading: boolean
  error: Error | null
}

export function useStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => Promise<void>, StorageState] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [state, setState] = useState<StorageState>({
    loading: true,
    error: null,
  })

  // Load on mount
  useEffect(() => {
    let cancelled = false
    AsyncStorage.getItem(key)
      .then((raw) => {
        if (cancelled) return
        if (raw !== null) {
          setStoredValue(JSON.parse(raw) as T)
        }
        setState({ loading: false, error: null })
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setState({
          loading: false,
          error: err instanceof Error ? err : new Error(String(err)),
        })
      })
    return () => {
      cancelled = true
    }
  }, [key])

  const setValue = useCallback(
    async (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next =
          typeof value === "function" ? (value as (p: T) => T)(prev) : value
        // Fire-and-forget write; errors surface in state.error if needed
        AsyncStorage.setItem(key, JSON.stringify(next)).catch(
          (err: unknown) => {
            setState((s) => ({
              ...s,
              error: err instanceof Error ? err : new Error(String(err)),
            }))
          },
        )
        return next
      })
    },
    [key],
  )

  return [storedValue, setValue, state]
}
