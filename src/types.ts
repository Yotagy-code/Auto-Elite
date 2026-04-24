export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  fuelType: string;
  transmission: string;
  bodyType: string;
  description: string;
  image: string;
  sellerId: string;
  sellerName: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: Omit<User, 'password'> | null;
  isAuthenticated: boolean;
}
