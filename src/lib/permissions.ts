import { UserRole } from '@prisma/client'

/**
 * Permission definitions for the POS SaaS platform.
 * Permissions are checked server-side. Never trust the frontend.
 */

export const PERMISSIONS = {
  // Dashboard
  'dashboard:view': ['OWNER', 'MANAGER', 'CASHIER'],

  // POS
  'pos:access': ['OWNER', 'MANAGER', 'CASHIER'],
  'pos:apply_discount': ['OWNER', 'MANAGER'],
  'pos:process_refund': ['OWNER', 'MANAGER'],
  'pos:void_sale': ['OWNER', 'MANAGER'],

  // Products
  'products:view': ['OWNER', 'MANAGER', 'CASHIER'],
  'products:create': ['OWNER', 'MANAGER'],
  'products:edit': ['OWNER', 'MANAGER'],
  'products:delete': ['OWNER'],
  'products:import': ['OWNER', 'MANAGER'],

  // Categories
  'categories:view': ['OWNER', 'MANAGER', 'CASHIER'],
  'categories:manage': ['OWNER', 'MANAGER'],

  // Inventory
  'inventory:view': ['OWNER', 'MANAGER'],
  'inventory:adjust': ['OWNER', 'MANAGER'],
  'inventory:receive': ['OWNER', 'MANAGER'],

  // Customers
  'customers:view': ['OWNER', 'MANAGER', 'CASHIER'],
  'customers:manage': ['OWNER', 'MANAGER'],

  // Suppliers
  'suppliers:view': ['OWNER', 'MANAGER'],
  'suppliers:manage': ['OWNER', 'MANAGER'],

  // Employees
  'employees:view': ['OWNER', 'MANAGER'],
  'employees:manage': ['OWNER'],
  'employees:manage_roles': ['OWNER'],

  // Sales & Reports
  'sales:view_own': ['OWNER', 'MANAGER', 'CASHIER'],
  'sales:view_all': ['OWNER', 'MANAGER'],
  'reports:view': ['OWNER', 'MANAGER'],
  'reports:export': ['OWNER', 'MANAGER'],

  // Settings
  'settings:view': ['OWNER', 'MANAGER'],
  'settings:manage': ['OWNER'],
  'settings:taxes': ['OWNER'],
  'settings:locations': ['OWNER'],
  'settings:billing': ['OWNER'],

  // Locations
  'locations:view': ['OWNER', 'MANAGER'],
  'locations:manage': ['OWNER'],
} as const

export type Permission = keyof typeof PERMISSIONS

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const allowedRoles = PERMISSIONS[permission] as readonly string[]
  return allowedRoles.includes(role)
}

export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every((p) => hasPermission(role, p))
}

export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p))
}

export function getPermissionsForRole(role: UserRole): Permission[] {
  return (Object.keys(PERMISSIONS) as Permission[]).filter((p) =>
    hasPermission(role, p)
  )
}

export function isOwnerOrAbove(role: UserRole): boolean {
  return role === 'OWNER' || role === 'SUPER_ADMIN'
}

export function isManagerOrAbove(role: UserRole): boolean {
  return role === 'OWNER' || role === 'MANAGER' || role === 'SUPER_ADMIN'
}

export function canAccessAdminArea(role: UserRole): boolean {
  return role === 'SUPER_ADMIN'
}

export const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  OWNER: 'Owner',
  MANAGER: 'Manager',
  CASHIER: 'Cashier',
}

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  SUPER_ADMIN: 'Full platform access across all businesses',
  OWNER: 'Full control of the business, billing, and team',
  MANAGER: 'Manage inventory, employees, reports, and POS',
  CASHIER: 'Access POS, process sales, and view own transactions',
}
