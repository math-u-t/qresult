/**
 * Notification Store
 *
 * Manages:
 * - Toast notifications (temporary UI feedback)
 * - In-app notifications (persistent)
 *
 * @example
 * ```ts
 * const notif = useNotificationStore()
 * notif.showToast('Success!', 'success')
 * notif.showError('Something went wrong')
 * await notif.fetchNotifications()
 * ```
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Toast, Notification } from '@/types'

export const useNotificationStore = defineStore('notification', () => {
  // State
  const toasts = ref<Toast[]>([])
  const notifications = ref<Notification[]>([])
  const isLoading = ref(false)

  // Getters
  const unreadCount = computed(
    () => notifications.value.filter((n) => !n.isRead).length
  )
  const unreadNotifications = computed(() =>
    notifications.value.filter((n) => !n.isRead)
  )

  /**
   * Show a toast notification
   * @param message - Toast message
   * @param type - Toast type (success, error, warning, info)
   * @param duration - Duration in milliseconds (default: 3000)
   */
  function showToast(
    message: string,
    type: Toast['type'] = 'info',
    duration = 3000
  ) {
    const toast: Toast = {
      id: Date.now().toString() + Math.random(),
      type,
      message,
      duration,
    }

    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        removeToast(toast.id)
      }, duration)
    }
  }

  /**
   * Convenience methods for common toast types
   */
  function showSuccess(message: string, duration?: number) {
    showToast(message, 'success', duration)
  }

  function showError(message: string, duration?: number) {
    showToast(message, 'error', duration)
  }

  function showWarning(message: string, duration?: number) {
    showToast(message, 'warning', duration)
  }

  function showInfo(message: string, duration?: number) {
    showToast(message, 'info', duration)
  }

  /**
   * Remove a toast by ID
   * @param id - Toast ID
   */
  function removeToast(id: string) {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  /**
   * Clear all toasts
   */
  function clearToasts() {
    toasts.value = []
  }

  /**
   * Fetch user notifications
   */
  async function fetchNotifications(): Promise<void> {
    try {
      isLoading.value = true

      // TODO: Call API
      // notifications.value = await apiFetchNotifications()

      // Mock notifications
      notifications.value = [
        {
          id: '1',
          userId: 'user_1',
          type: 'answer',
          title: 'New Answer',
          message: 'Someone answered your question',
          link: '/post/1',
          isRead: false,
          createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        },
        {
          id: '2',
          userId: 'user_1',
          type: 'comment',
          title: 'New Comment',
          message: 'Someone commented on your post',
          link: '/post/2',
          isRead: false,
          createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        },
        {
          id: '3',
          userId: 'user_1',
          type: 'system',
          title: 'Welcome!',
          message: 'Welcome to qresult',
          isRead: true,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
      ]
    } catch (err) {
      console.error('Fetch notifications error:', err)
      showError('Failed to fetch notifications')
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Mark notification as read
   * @param id - Notification ID
   */
  async function markAsRead(id: string): Promise<void> {
    try {
      // TODO: Call API
      // await apiMarkNotificationRead(id)

      const notification = notifications.value.find((n) => n.id === id)
      if (notification) {
        notification.isRead = true
      }
    } catch (err) {
      console.error('Mark as read error:', err)
    }
  }

  /**
   * Mark all notifications as read
   */
  async function markAllAsRead(): Promise<void> {
    try {
      // TODO: Call API
      // await apiMarkAllNotificationsRead()

      notifications.value.forEach((n) => {
        n.isRead = true
      })
    } catch (err) {
      console.error('Mark all as read error:', err)
      showError('Failed to mark notifications as read')
    }
  }

  /**
   * Delete notification
   * @param id - Notification ID
   */
  async function deleteNotification(id: string): Promise<void> {
    try {
      // TODO: Call API
      // await apiDeleteNotification(id)

      const index = notifications.value.findIndex((n) => n.id === id)
      if (index > -1) {
        notifications.value.splice(index, 1)
      }
    } catch (err) {
      console.error('Delete notification error:', err)
      showError('Failed to delete notification')
    }
  }

  /**
   * Clear all notifications
   */
  async function clearNotifications(): Promise<void> {
    try {
      // TODO: Call API
      // await apiClearNotifications()

      notifications.value = []
    } catch (err) {
      console.error('Clear notifications error:', err)
      showError('Failed to clear notifications')
    }
  }

  return {
    toasts,
    notifications,
    isLoading,
    unreadCount,
    unreadNotifications,
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeToast,
    clearToasts,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearNotifications,
  }
})
