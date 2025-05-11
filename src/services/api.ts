import { Product, Category, User, Order, OrderItem, AuthUser } from '../types';

const API_URL = 'http://localhost/quantum-radio/api';

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<AuthUser> => {
    const response = await fetch(`${API_URL}/auth.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    
    const data = await response.json();
    return data.user;
  },
  
  getCurrentUser: async (): Promise<AuthUser | null> => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    // In a real app, validate token with backend
    return JSON.parse(token);
  },
  
  logout: async (): Promise<void> => {
    localStorage.removeItem('token');
  }
};

// Products API
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/products.php`);
    const data = await response.json();
    return data.map((item: any) => ({
      id: item.produit_id,
      name: item.nom_produit,
      description: item.description,
      price: parseFloat(item.prix),
      imageUrl: item.image_url,
      categoryId: item.categorie_id,
      category: { id: item.categorie_id, name: item.nom_categorie }
    }));
  },
  
  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await fetch(`${API_URL}/products.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        categoryId: product.categoryId
      })
    });
    
    const data = await response.json();
    return { ...product, id: data.id };
  },
  
  update: async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await fetch(`${API_URL}/products.php?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        categoryId: product.categoryId
      })
    });
    
    await response.json();
    return { ...product, id } as Product;
  },
  
  delete: async (id: number): Promise<void> => {
    await fetch(`${API_URL}/products.php?id=${id}`, {
      method: 'DELETE'
    });
  }
};

// Categories API
export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await fetch(`${API_URL}/categories.php`);
    const data = await response.json();
    return data.map((item: any) => ({
      id: item.categorie_id,
      name: item.nom_categorie
    }));
  },
  
  create: async (category: Omit<Category, 'id'>): Promise<Category> => {
    const response = await fetch(`${API_URL}/categories.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: category.name })
    });
    
    const data = await response.json();
    return { ...category, id: data.id };
  }
};

// Export CSV function remains unchanged
export const exportToCsv = (data: any[], filename: string): void => {
  if (!data || !data.length) return;
  
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(item => 
      headers
        .map(header => {
          const value = item[header];
          if (value === null || value === undefined) return '';
          if (typeof value === 'object') return JSON.stringify(value).replace(/"/g, '""');
          return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
        })
        .join(',')
    )
  ];
  
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};