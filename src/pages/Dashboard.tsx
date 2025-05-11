import React, { useEffect, useState } from 'react';
import { LayoutDashboard, ShoppingBag, Tag, Users, ListOrdered, ArrowUp, ArrowDown, DollarSign, Package } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import { products, categories, users, orders } from '../services/mockData';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    recentOrders: [] as typeof orders,
  });

  useEffect(() => {
    // Calculate statistics
    const totalProducts = products.length;
    const totalCategories = categories.length;
    const totalUsers = users.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(order => order.status === 'en_attente').length;
    const recentOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

    setStats({
      totalProducts,
      totalCategories,
      totalUsers,
      totalOrders,
      totalRevenue,
      pendingOrders,
      recentOrders,
    });
  }, []);

  // Generate random percentage changes for demo purposes
  const getRandomChange = () => {
    const value = (Math.random() * 30 - 15).toFixed(1);
    return {
      value: parseFloat(value),
      isPositive: parseFloat(value) >= 0
    };
  };

  const productChange = getRandomChange();
  const revenueChange = getRandomChange();
  const userChange = getRandomChange();
  const orderChange = getRandomChange();

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Products Stat */}
          <Card>
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">{stats.totalProducts}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium flex items-center ${productChange.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {productChange.isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {Math.abs(productChange.value)}%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1.5">from last month</span>
            </div>
          </Card>

          {/* Revenue Stat */}
          <Card>
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium flex items-center ${revenueChange.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {revenueChange.isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {Math.abs(revenueChange.value)}%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1.5">from last month</span>
            </div>
          </Card>

          {/* Users Stat */}
          <Card>
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">{stats.totalUsers}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium flex items-center ${userChange.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {userChange.isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {Math.abs(userChange.value)}%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1.5">from last month</span>
            </div>
          </Card>

          {/* Orders Stat */}
          <Card>
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Orders</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">{stats.pendingOrders}</p>
              </div>
              <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium flex items-center ${orderChange.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {orderChange.isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {Math.abs(orderChange.value)}%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1.5">from last month</span>
            </div>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card 
          title="Recent Orders" 
          subtitle="Latest orders placed by customers"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {stats.recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">#{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${order.status === 'en_attente' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : 
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
                        {order.status === 'en_attente' ? 'Pending' : 
                          order.status === 'shipped' ? 'Shipped' : 'Delivered'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      ${order.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
                {stats.recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      No recent orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Inventory Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card
            title="Inventory Overview"
            subtitle="Categories distribution"
          >
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Émetteurs FM/AM</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">24%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '24%' }}></div>
              </div>

              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Microphones de studio</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">18%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '18%' }}></div>
              </div>

              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Mélangeurs audio</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">15%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
              </div>

              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Systèmes de radiodiffusion</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">22%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '22%' }}></div>
              </div>

              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Casques et moniteurs</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">21%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '21%' }}></div>
              </div>
            </div>
          </Card>
          
          <Card
            title="Sales Statistics"
            subtitle="Monthly revenue"
          >
            <div className="w-full h-64 flex items-end justify-between space-x-2">
              {/* Simulated chart bars */}
              {Array.from({ length: 12 }).map((_, index) => {
                const height = Math.floor(Math.random() * 70 + 30);
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="bg-blue-500 dark:bg-blue-600 rounded-t w-6" 
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(2025, index).toLocaleString('default', { month: 'short' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;