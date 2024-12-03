'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  UserPlusIcon, 
  TrashIcon, 
  PencilIcon, 
  LockOpenIcon, 
  LockClosedIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import DashboardHeading from '@/components/shared/DashboardHeading';
import AddUserModal from '@/components/superadmin/AddUserModal';
import EditUserModal from '@/components/superadmin/EditUserModal';
import { Role } from '@prisma/client';
import { isValidObjectId, formatDate } from '@/lib/utils';

// Define User Type
interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UserFilterParams {
  page: number;
  limit: number;
  role?: string;
  status?: string;
  search?: string;
}

const UsersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalUsers: 0,
    pageSize: 10
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null); 
  const [showEditModal, setShowEditModal] = useState(false); 

  const filterParams = useMemo(() => ({
    search: searchQuery,
    role: roleFilter,
    status: statusFilter,
    page: 1
  }), [searchQuery, roleFilter, statusFilter]);

  const fetchUsers = useCallback(async (params: any) => {
    try {
      setIsLoading(true);
      setError(undefined);
      
      console.log('Fetching users with params:', params);
      
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`/api/users?${queryString}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      console.log('API Response:', data);

      if (!response.ok) {
        console.error('API Error:', data);
        throw new Error(data.error || data.details || 'Failed to fetch users');
      }

      if (!Array.isArray(data.users)) {
        console.error('Invalid users data:', data);
        throw new Error('Invalid response format');
      }

      // Ensure each user has required fields
      const processedUsers = data.users.map((user: any) => ({
        id: user.id || user._id,
        username: user.username || '',
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'USER',
        isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
        lastLogin: user.lastLogin || null,
        createdAt: user.createdAt || new Date().toISOString(),
        updatedAt: user.updatedAt || new Date().toISOString()
      }));

      setUsers(processedUsers);
      setPagination(data.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalUsers: processedUsers.length,
        pageSize: 10
      });
    } catch (error: any) {
      console.error('Error fetching users:', error);
      setError(error.message || 'Failed to fetch users');
      
      // Handle specific error cases
      if (error.message.includes('Unauthorized')) {
        router.push('/auth/sign-in');
      } else if (error.message.includes('Forbidden')) {
        router.push('/auth/sign-in');
      }
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Initial fetch and auth check
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'SUPER_ADMIN') {
      fetchUsers(filterParams);
    }
  }, [status, session, fetchUsers, filterParams]);

  // Debounced search and filter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === 'authenticated' && session?.user?.role === 'SUPER_ADMIN') {
        fetchUsers(filterParams);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [filterParams, status, session, fetchUsers]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleRoleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
  }, []);

  const handleStatusFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  }, []);

  // Handle user edit
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleUpdateUser = async (userData: any) => {
    try {
      setError(undefined);
      if (!editingUser) return;

      const userId = editingUser._id || editingUser.id;
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email.toLowerCase(),
          role: userData.role,
          isActive: userData.isActive
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update user');
      }

      // Refresh the user list
      await fetchUsers(filterParams);
      setShowEditModal(false);
      setEditingUser(null);
    } catch (error: any) {
      console.error('Error updating user:', error);
      setError(error.message);
      throw error;
    }
  };

  const handleToggleUserStatus = async (user: User) => {
    try {
      setError(undefined);
      
      // Validate session
      if (!session?.user?.id || !session?.user?.role || session.user.role !== 'SUPER_ADMIN') {
        setError('Your session has expired or you do not have permission.');
        router.push('/auth/sign-in');
        return;
      }

      // Validate user
      if (!user?.id || !isValidObjectId(user.id)) {
        setError('Invalid user ID format');
        return;
      }

      // Don't allow toggling your own account
      if (session.user.id === user.id) {
        setError('You cannot modify your own account status.');
        return;
      }

      // Send request
      const response = await fetch('/api/users/toggle-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || result.error || 'Failed to toggle user status');
      }

      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(u => 
          u.id === user.id 
            ? { ...u, isActive: !u.isActive }
            : u
        )
      );

    } catch (error) {
      console.error('Toggle Status Error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (!window.confirm(`Are you sure you want to delete user ${user.name}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      await fetchUsers(filterParams);
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }
  };

  const handleCreateUser = async (userData: {
    email: string;
    name: string;
    role: string;
    password: string;
  }) => {
    try {
      setError(undefined);

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to create user');
      }

      // Refresh the user list
      await fetchUsers(filterParams);
      setShowAddModal(false);
    } catch (error: any) {
      console.error('Error creating user:', error);
      setError(error.message);
      throw error;
    }
  };

  if (status === 'loading') {
    return <div className="p-4">Loading...</div>;
  }

  if (status === 'unauthenticated' || session?.user?.role !== 'SUPER_ADMIN') {
    router.push('/auth/sign-in');
    return null;
  }

  return (
    <div className="p-4 space-y-4">
      <DashboardHeading
        title="User Management"
        description="Manage user accounts and permissions"
      >
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <UserPlusIcon className="h-5 w-5 mr-2" />
          Add User
        </button>
      </DashboardHeading>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-[#1f1f2d] border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={handleRoleFilterChange}
          className="w-full bg-[#1f1f2d] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All Roles</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPER_ADMIN">Super Admin</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="w-full bg-[#1f1f2d] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-[#1a1a24] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#25252f] text-left">
                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Email</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Role</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Last Active</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {isLoading ? (
                <tr key="loading">
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr key="no-users">
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-[#25252f] transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">@{user.username}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'SUPER_ADMIN' 
                          ? 'bg-purple-500/10 text-purple-500'
                          : user.role === 'ADMIN'
                          ? 'bg-blue-500/10 text-blue-500'
                          : 'bg-green-500/10 text-green-500'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isActive
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {user.lastLogin ? formatDate(new Date(user.lastLogin)) : 'Never'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-gray-400 hover:text-white transition-colors"
                          title="Edit user"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleToggleUserStatus(user)}
                          className="text-gray-400 hover:text-white transition-colors"
                          title={user.isActive ? 'Deactivate user' : 'Activate user'}
                        >
                          {user.isActive ? (
                            <LockOpenIcon className="h-5 w-5" />
                          ) : (
                            <LockClosedIcon className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete user"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Showing {((pagination.currentPage - 1) * pagination.pageSize) + 1} to{' '}
            {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalUsers)} of{' '}
            {pagination.totalUsers} users
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => router.push(`?page=${pagination.currentPage - 1}`)}
              disabled={pagination.currentPage === 1}
              className="px-4 py-2 bg-[#1a1a24] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#25252f] transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => router.push(`?page=${pagination.currentPage + 1}`)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-4 py-2 bg-[#1a1a24] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#25252f] transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleCreateUser}
        error={error}
      />

      {/* Edit User Modal */}
      {editingUser && (
        <EditUserModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingUser(null);
          }}
          onSubmit={handleUpdateUser}
          user={editingUser}
          error={error}
        />
      )}
    </div>
  );
};

export default UsersPage;
