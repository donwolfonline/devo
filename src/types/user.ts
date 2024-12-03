import { Role } from '@prisma/client'

export interface UserFilterParams {
  page?: number
  limit?: number
  role?: Role
  status?: 'active' | 'inactive' | 'all'
  search?: string
}
