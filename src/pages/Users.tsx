import React, { useState, useEffect } from 'react';
import { Search, Download, Filter, User, UserPlus, Mail, Phone, MapPin } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { User as UserType } from '../types';
import { usersApi, exportToCsv } from '../services/api';
import { useToast } from '../context/ToastContext';

const Users: React.FC = () => {
  const { addToast } = useToast();
  
  // Users data state
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await usersApi.getAll();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        addToast('Failed to fetch users', 'error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [addToast]);
  
  // Filter users when search or role filter changes
  useEffect(() => {
    let result = [...users];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        user => 
          user.prenom.toLowerCase().includes(query) || 
          user.nom.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }
    
    // Apply role filter
    if (roleFilter) {
      result = result.filter(user => user.role === roleFilter);
    }
    
    setFilteredUsers(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [users, searchQuery, roleFilter]);
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle role filter change
  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
  };
  
  // Handle export to CSV
  const handleExport = () => {
    const exportData = filteredUsers.map(user => ({
      ID: user.id,
      'First Name': user.prenom,
      'Last Name': user.nom,
      Email: user.email,
      Phone: user.telephone,
      Address: user.adresse,
      Role: user.role,
    }));
    
    exportToCsv(exportData, 'users.csv');
    addToast('Users exported to CSV', 'success');
  };
  
  // Table columns
  const columns = [
    {
      id: 'id',
      header: 'ID',
      accessor: (user: UserType) => `#${user.id}`,
      sortable: true,
    },
    {
      id: 'user',
      header: 'User',
      accessor: (user: UserType) => (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            {user.photo_profil ? (
              <img
                src={user.photo_profil}
                alt={`${user.prenom} ${user.nom}`}
                className="h-10 w-10 rounded-full"
                loading="lazy"
              />
            ) : (
              <div className="h-10 w-10 flex items-center justify-center">
                <User size={20} className="text-gray-500 dark:text-gray-400" />
              </div>
            )}
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {user.prenom} {user.nom}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'contact',
      header: 'Contact',
      accessor: (user: UserType) => (
        <div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Phone size={14} className="mr-1" /> {user.telephone}
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin size={14} className="mr-1" /> {user.adresse || 'N/A'}
          </div>
        </div>
      ),
    },
    {
      id: 'role',
      header: 'Role',
      accessor: (user: UserType) => (
        <Badge 
          variant={user.role === 'dmj' ? 'primary' : 'default'}
          size="md"
        >
          {user.role === 'dmj' ? 'DMJ' : 'Auditeur'}
        </Badge>
      ),
      sortable: true,
    },
    {
      id: 'actions',
      header: 'Actions',
      accessor: (user: UserType) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Mail size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              window.open(`mailto:${user.email}`);
            }}
            aria-label={`Email ${user.prenom} ${user.nom}`}
          >
            Email
          </Button>
        </div>
      ),
    },
  ];
  
  return (
    <Layout title="Users">
      <div className="space-y-6">
        {/* Header actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Input
                fullWidth
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearch}
                leftIcon={<Search size={18} className="text-gray-400" />}
                aria-label="Search users"
              />
            </div>
            
            <div className="w-40 hidden sm:block">
              <Select
                id="role-filter"
                label=""
                fullWidth
                value={roleFilter}
                onChange={handleRoleFilterChange}
                options={[
                  { value: '', label: 'All Roles' },
                  { value: 'dmj', label: 'DMJ' },
                  { value: 'auditeur', label: 'Auditeur' },
                ]}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="secondary"
              leftIcon={<Download size={18} />}
              onClick={handleExport}
            >
              Export
            </Button>
            
            <Button
              variant="primary"
              leftIcon={<UserPlus size={18} />}
              onClick={() => addToast('User creation is disabled in demo mode', 'info')}
            >
              Add User
            </Button>
          </div>
        </div>
        
        {/* Mobile role filter */}
        <div className="block sm:hidden">
          <Select
            id="role-filter-mobile"
            label="Filter by role"
            fullWidth
            value={roleFilter}
            onChange={handleRoleFilterChange}
            options={[
              { value: '', label: 'All Roles' },
              { value: 'dmj', label: 'DMJ' },
              { value: 'auditeur', label: 'Auditeur' },
            ]}
          />
        </div>
        
        {/* Users table */}
        <Card>
          <Table
            columns={columns}
            data={filteredUsers}
            keyExtractor={(user) => user.id}
            isPaginated
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalItems={filteredUsers.length}
            onPageChange={setCurrentPage}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default Users;