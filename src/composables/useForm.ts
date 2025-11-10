/**
 * Form Composable
 *
 * Provides form state management and validation utilities.
 *
 * @example
 * ```ts
 * const { formData, errors, validate, reset } = useForm({
 *   title: '',
 *   email: ''
 * }, {
 *   title: (value) => value.length > 0 ? null : 'Title is required',
 *   email: (value) => /\S+@\S+\.\S+/.test(value) ? null : 'Invalid email'
 * })
 * ```
 */

import { ref, reactive, computed, toRaw } from 'vue'
import type { ValidationError } from '@/types'

type ValidationRule<T> = (value: T) => string | null
type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>
}

export function useForm<T extends Record<string, any>>(
  initialData: T,
  validationRules?: ValidationRules<T>
) {
  const formData = reactive<T>({ ...initialData })
  const errors = ref<ValidationError[]>([])
  const isSubmitting = ref(false)
  const isDirty = ref(false)

  const isValid = computed(() => errors.value.length === 0)

  /**
   * Validate a single field
   */
  function validateField<K extends keyof T>(field: K): string | null {
    if (!validationRules || !validationRules[field]) return null

    const rule = validationRules[field]
    if (!rule) return null

    const rawData = toRaw(formData) as T
    return rule(rawData[field])
  }

  /**
   * Validate all fields
   */
  function validate(): boolean {
    errors.value = []

    if (!validationRules) return true

    for (const field in validationRules) {
      const error = validateField(field)
      if (error) {
        errors.value.push({
          field,
          message: error,
        })
      }
    }

    return errors.value.length === 0
  }

  /**
   * Get error for a specific field
   */
  function getError(field: keyof T): string | undefined {
    return errors.value.find((e) => e.field === field)?.message
  }

  /**
   * Clear all errors
   */
  function clearErrors() {
    errors.value = []
  }

  /**
   * Reset form to initial state
   */
  function reset() {
    Object.assign(formData, initialData)
    errors.value = []
    isDirty.value = false
    isSubmitting.value = false
  }

  /**
   * Set form data
   */
  function setData(data: Partial<T>) {
    Object.assign(formData, data)
    isDirty.value = true
  }

  return {
    formData,
    errors,
    isSubmitting,
    isDirty,
    isValid,
    validate,
    validateField,
    getError,
    clearErrors,
    reset,
    setData,
  }
}
