// Type declarations for Superadmin routes and components
declare module '@/superadmin' {
  export interface SuperAdminUser {
    id: string;
    username: string;
    email: string;
    role: 'SUPER_ADMIN';
  }

  export interface SuperAdminContext {
    user: SuperAdminUser;
    permissions: string[];
  }
}
