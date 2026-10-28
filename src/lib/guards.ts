import { redirect } from 'next/navigation'
import { getCurrentUser, getBusinessContext } from './auth'
import { hasPermission, type Permission } from './permissions'
import type { UserRole } from '@prisma/client'

/**
 * Server-side guards for protecting pages and actions.
 * Always call these on the server. Never trust client-side checks alone.
 */

export async function requireAuthUser() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }
  return user
}

export async function requireBusinessContext() {
  const user = await requireAuthUser()

  if (user.role === 'SUPER_ADMIN') {
    redirect('/admin')
  }

  const context = await getBusinessContext(user.id)
  if (!context) {
    redirect('/register')
  }

  return { user, ...context }
}

/**
 * Require a specific permission. Redirects to dashboard if missing.
 */
export async function requirePermission(permission: Permission) {
  const { user, business, role } = await requireBusinessContext()

  if (!hasPermission(role, permission)) {
    redirect('/dashboard')
  }

  return { user, business, role }
}

/**
 * Require one of several roles
 */
export async function requireRoles(allowedRoles: UserRole[]) {
  const { user, business, role } = await requireBusinessContext()

  if (!allowedRoles.includes(role)) {
    redirect('/dashboard')
  }

  return { user, business, role }
}

/**
 * For Server Actions – throw instead of redirect
 */
export async function assertPermission(permission: Permission) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  const context = await getBusinessContext(user.id)
  if (!context) throw new Error('No business context')

  if (!hasPermission(context.role, permission)) {
    throw new Error('Forbidden: insufficient permissions')
  }

  return { user, ...context }
}
