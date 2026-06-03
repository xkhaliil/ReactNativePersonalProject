/**
 * useProfile
 *
 * All logic for the user profile: loading, editing, validation,
 * saving, and resetting. ProfileScreen is purely declarative —
 * it renders what this hook returns and calls nothing else.
 *
 * Persisted fields:
 *   - displayName  (TextInput) — shown as greeting on History screen
 *   - bio          (TextInput, multiline)
 *   - favouriteGenre (TextInput) — shown on HomeScreen playlist label
 *
 * Preference switches (persisted separately via useSettings):
 *   - hapticsEnabled
 *   - compactHistory
 *   - showGenreHints
 */

import { useCallback, useEffect, useState } from "react"

import { useSettings } from "./useSettings"
import { useStorage } from "./useStorage"

const STORAGE_KEY = "user-profile-v1"

const MAX_BIO_LENGTH = 120
const MAX_GENRE_LENGTH = 40

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProfileData = {
  displayName: string
  bio: string
  favouriteGenre: string
}

export type ProfileErrors = {
  displayName?: string
  bio?: string
  favouriteGenre?: string
}

type EditableProfile = ProfileData

const DEFAULT_PROFILE: ProfileData = {
  displayName: "",
  bio: "",
  favouriteGenre: "",
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateProfile(draft: EditableProfile): ProfileErrors {
  const errors: ProfileErrors = {}

  if (draft.displayName.trim().length === 0) {
    errors.displayName = "Name can't be empty"
  } else if (draft.displayName.trim().length < 2) {
    errors.displayName = "Name must be at least 2 characters"
  }

  if (draft.bio.length > MAX_BIO_LENGTH) {
    errors.bio = `Bio must be ${MAX_BIO_LENGTH} characters or fewer`
  }

  if (draft.favouriteGenre.length > MAX_GENRE_LENGTH) {
    errors.favouriteGenre = `Genre must be ${MAX_GENRE_LENGTH} characters or fewer`
  }

  return errors
}

function hasErrors(errors: ProfileErrors): boolean {
  return Object.keys(errors).length > 0
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export type UseProfileReturn = {
  // Saved (committed) profile — what the rest of the app uses
  profile: ProfileData
  // Draft — what's currently in the form fields (may be unsaved)
  draft: EditableProfile
  // Inline validation errors for the current draft
  errors: ProfileErrors
  // True when the draft differs from the saved profile
  isDirty: boolean
  // True if the draft passes validation
  isValid: boolean
  // True while loading from storage
  loading: boolean
  // True while a save is in progress
  saving: boolean
  // Character count hint for bio field (e.g. "42 / 120")
  bioHint: string
  // Update a single text field in the draft
  setField: (field: keyof ProfileData, value: string) => void
  // Commit the draft to storage (resolves when done)
  save: () => Promise<void>
  // Discard draft changes, reset to last saved profile
  reset: () => void

  // Preference switches (stored via useSettings)
  hapticsEnabled: boolean
  compactHistory: boolean
  showGenreHints: boolean
  setHapticsEnabled: (value: boolean) => void
  setCompactHistory: (value: boolean) => void
  setShowGenreHints: (value: boolean) => void
}

export function useProfile(): UseProfileReturn {
  const [savedProfile, setSavedProfile, { loading }] = useStorage<ProfileData>(
    STORAGE_KEY,
    DEFAULT_PROFILE,
  )
  const { settings, setSetting } = useSettings()

  // Draft mirrors savedProfile on load; edited independently thereafter
  const [draft, setDraft] = useState<EditableProfile>(DEFAULT_PROFILE)
  const [saving, setSaving] = useState(false)

  // Sync draft when storage finishes loading
  useEffect(() => {
    if (!loading) {
      setDraft(savedProfile)
    }
    // Only run when loading transitions to false; savedProfile is the source
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const errors = validateProfile(draft)
  const isValid = !hasErrors(errors)
  const isDirty =
    draft.displayName !== savedProfile.displayName ||
    draft.bio !== savedProfile.bio ||
    draft.favouriteGenre !== savedProfile.favouriteGenre

  const setField = useCallback((field: keyof ProfileData, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }))
  }, [])

  const save = useCallback(async () => {
    if (!isValid) return
    setSaving(true)
    const trimmed: ProfileData = {
      displayName: draft.displayName.trim(),
      bio: draft.bio.trim(),
      favouriteGenre: draft.favouriteGenre.trim(),
    }
    await setSavedProfile(trimmed)
    setDraft(trimmed)
    setSaving(false)
  }, [draft, isValid, setSavedProfile])

  const reset = useCallback(() => {
    setDraft(savedProfile)
  }, [savedProfile])

  return {
    profile: savedProfile,
    draft,
    errors,
    isDirty,
    isValid,
    loading,
    saving,
    bioHint: `${draft.bio.length} / ${MAX_BIO_LENGTH}`,
    setField,
    save,
    reset,

    hapticsEnabled: settings.hapticsEnabled,
    compactHistory: settings.compactHistory,
    showGenreHints: settings.showGenreHints,
    setHapticsEnabled: (v) => void setSetting("hapticsEnabled", v),
    setCompactHistory: (v) => void setSetting("compactHistory", v),
    setShowGenreHints: (v) => void setSetting("showGenreHints", v),
  }
}
