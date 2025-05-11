import { Product, Category, User, Order, OrderItem, AuthUser } from '../types';

// Categories
export const categories: Category[] = [
  { id: 1, name: 'Émetteurs FM/AM' },
  { id: 2, name: 'Microphones de studio' },
  { id: 3, name: 'Mélangeurs audio' },
  { id: 4, name: 'Systèmes de radiodiffusion' },
  { id: 5, name: 'Casques et moniteurs' },
];

// Generate more categories programmatically
for (let i = 6; i <= 36; i++) {
  categories.push({
    id: i,
    name: `Catégorie Radio ${i}`
  });
}

// Products
export const products: Product[] = [
  {
    id: 1,
    name: 'Émetteur FM Pro 200W',
    description: 'Émetteur FM professionnel avec une puissance de sortie de 200W, idéal pour les stations de radio locales.',
    price: 2499.99,
    imageUrl: 'https://images.pexels.com/photos/3945634/pexels-photo-3945634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    categoryId: 1,
  },
  {
    id: 2,
    name: 'Microphone Studio XLR-9000',
    description: 'Microphone de studio professionnel avec une réponse en fréquence étendue et une sensibilité élevée.',
    price: 599.99,
    imageUrl: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    categoryId: 2,
  },
  {
    id: 3,
    name: 'Console de mixage 24 canaux',
    description: 'Console de mixage professionnelle avec 24 canaux, parfaite pour les studios de radio.',
    price: 1299.99,
    imageUrl: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    categoryId: 3,
  },
  {
    id: 4,
    name: 'Système de radiodiffusion portable',
    description: 'Système complet pour la radiodiffusion en déplacement, incluant émetteur, microphones et console.',
    price: 3499.99,
    imageUrl: 'https://images.pexels.com/photos/3761124/pexels-photo-3761124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    categoryId: 4,
  },
  {
    id: 5,
    name: 'Casque monitoring pro',
    description: 'Casque professionnel pour le monitoring en studio, avec une isolation acoustique parfaite.',
    price: 249.99,
    imageUrl: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    categoryId: 5,
  },
];

// Generate more products programmatically
for (let i = 6; i <= 15; i++) {
  products.push({
    id: i,
    name: `Produit Radio ${i}`,
    description: `Description détaillée du produit radio ${i}. Ce produit est de haute qualité et parfait pour votre station.`,
    price: Math.round(Math.random() * 2000 + 100) / 100,
    imageUrl: `https://images.pexels.com/photos/${3000000 + i}/pexels-photo-${3000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=500`,
    categoryId: Math.floor(Math.random() * 5) + 1,
  });
}

// Users
export const users: User[] = [
  {
    id: 1,
    prenom: 'Admin',
    nom: 'User',
    email: 'admin@test.com',
    telephone: '+33612345678',
    adresse: '123 Rue de la Radio, Paris',
    role: 'dmj',
    photo_profil: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 2,
    prenom: 'Jean',
    nom: 'Dupont',
    email: 'jean.dupont@radio.fr',
    telephone: '+33687654321',
    adresse: '456 Avenue du Studio, Lyon',
    role: 'dmj',
    photo_profil: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

// Generate more users programmatically
for (let i = 3; i <= 10; i++) {
  const isDmj = i <= 5;
  users.push({
    id: i,
    prenom: `Prénom${i}`,
    nom: `Nom${i}`,
    email: `user${i}@${isDmj ? 'radio.fr' : 'auditeur.fr'}`,
    telephone: `+3361234${i}000`,
    adresse: `${i}00 Rue de l'exemple, Ville${i}`,
    role: isDmj ? 'dmj' : 'auditeur',
    photo_profil: `https://images.pexels.com/photos/${200000 + i}/pexels-photo-${200000 + i}.jpeg?auto=compress&cs=tinysrgb&w=300`,
  });
}

// Order items
export const orderItems: OrderItem[] = [
  { id: 1, orderId: 1, productId: 1, quantity: 1, unitPrice: 2499.99 },
  { id: 2, orderId: 1, productId: 2, quantity: 2, unitPrice: 599.99 },
  { id: 3, orderId: 2, productId: 3, quantity: 1, unitPrice: 1299.99 },
  { id: 4, orderId: 3, productId: 4, quantity: 1, unitPrice: 3499.99 },
  { id: 5, orderId: 3, productId: 5, quantity: 3, unitPrice: 249.99 },
];

// Generate more order items programmatically
for (let i = 6; i <= 20; i++) {
  const orderId = Math.floor(Math.random() * 10) + 1;
  const productId = Math.floor(Math.random() * 15) + 1;
  const product = products.find(p => p.id === productId);
  const price = product ? product.price : Math.round(Math.random() * 1000) / 100;
  
  orderItems.push({
    id: i,
    orderId,
    productId,
    quantity: Math.floor(Math.random() * 5) + 1,
    unitPrice: price
  });
}

// Orders
export const orders: Order[] = [];

// Generate orders programmatically
const statuses: ('en_attente' | 'shipped' | 'delivered')[] = ['en_attente', 'shipped', 'delivered'];
for (let i = 1; i <= 10; i++) {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  
  // Calculate total based on order items
  const orderItemsForThisOrder = orderItems.filter(item => item.orderId === i);
  const total = orderItemsForThisOrder.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  
  orders.push({
    id: i,
    dmjId: Math.floor(Math.random() * 5) + 1,
    date: date.toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    total: parseFloat(total.toFixed(2)),
    items: orderItemsForThisOrder
  });
}

// Add products to order items
orderItems.forEach(item => {
  item.product = products.find(p => p.id === item.productId);
});

// Add categories to products
products.forEach(product => {
  product.category = categories.find(c => c.id === product.categoryId);
});

// Auth
export const authUser: AuthUser = {
  email: 'admin@test.com',
  role: 'dmj',
  token: 'mock-jwt-token-for-admin-user-with-dmj-role',
  nom: 'User',
  prenom: 'Admin'
};