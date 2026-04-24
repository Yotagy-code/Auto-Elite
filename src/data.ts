import { Car, User } from './types';

const CARS_KEY = 'autoelite_cars';
const USERS_KEY = 'autoelite_users';

const defaultCars: Car[] = [
  {
    id: '1',
    make: 'BMW',
    model: 'M4 Competition',
    year: 2023,
    price: 74900,
    mileage: 5200,
    color: 'Alpine White',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Coupe',
    description: 'Stunning BMW M4 Competition in Alpine White with a powerful inline-6 engine. This vehicle is in pristine condition with low mileage and has been meticulously maintained. Features include M Sport exhaust, adaptive M suspension, and premium Harman Kardon sound system.',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80',
    sellerId: 'admin',
    sellerName: 'AutoElite Admin',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    make: 'Mercedes-Benz',
    model: 'AMG GT 63',
    year: 2022,
    price: 139900,
    mileage: 12800,
    color: 'Obsidian Black',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    description: 'The Mercedes-AMG GT 63 is the pinnacle of performance sedans. With a handcrafted AMG 4.0L V8 biturbo engine producing 577 hp, this car delivers breathtaking performance while offering supreme luxury and comfort.',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    sellerId: 'admin',
    sellerName: 'AutoElite Admin',
    createdAt: '2024-02-20T14:30:00Z',
  },
  {
    id: '3',
    make: 'Porsche',
    model: '911 Carrera S',
    year: 2023,
    price: 129000,
    mileage: 3400,
    color: 'Guards Red',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Coupe',
    description: 'Iconic Porsche 911 Carrera S in stunning Guards Red. This 992-generation 911 combines timeless design with cutting-edge technology. Features sport chrono package, PASM sport suspension, and BOSE surround sound.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    sellerId: 'admin',
    sellerName: 'AutoElite Admin',
    createdAt: '2024-03-05T09:15:00Z',
  },
  {
    id: '4',
    make: 'Audi',
    model: 'RS e-tron GT',
    year: 2023,
    price: 147900,
    mileage: 7600,
    color: 'Mythos Black',
    fuelType: 'Electric',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    description: 'The Audi RS e-tron GT represents the future of electric performance. With 637 hp from its dual-motor setup, it accelerates from 0-60 in just 3.1 seconds while maintaining Audi\'s signature luxury and craftsmanship.',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    sellerId: 'admin',
    sellerName: 'AutoElite Admin',
    createdAt: '2024-03-18T11:45:00Z',
  },
  {
    id: '5',
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2023,
    price: 89900,
    mileage: 15200,
    color: 'Pearl White',
    fuelType: 'Electric',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    description: 'The quickest production car ever made. Tesla Model S Plaid features tri-motor AWD producing 1,020 hp, with a 0-60 time of under 2 seconds. Full Self-Driving capability and the signature 17" cinematic display.',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
    sellerId: 'admin',
    sellerName: 'AutoElite Admin',
    createdAt: '2024-04-02T16:20:00Z',
  },
  {
    id: '6',
    make: 'Range Rover',
    model: 'Sport SVR',
    year: 2022,
    price: 115500,
    mileage: 22100,
    color: 'Santorini Black',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    description: 'The Range Rover Sport SVR is the ultimate luxury performance SUV. Powered by a 5.0L supercharged V8 producing 575 hp, it combines off-road capability with on-road performance and unmatched British luxury.',
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80',
    sellerId: 'admin',
    sellerName: 'AutoElite Admin',
    createdAt: '2024-04-15T08:30:00Z',
  },
  {
    id: '7',
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    price: 28900,
    mileage: 1200,
    color: 'Celestial Silver',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    description: 'The all-new 2024 Toyota Camry Hybrid combines efficiency with style. Getting up to 52 MPG combined, this sedan offers Toyota reliability with modern tech features including a 12.3" touchscreen and Toyota Safety Sense 3.0.',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
    sellerId: 'admin',
    sellerName: 'AutoElite Admin',
    createdAt: '2024-05-01T13:00:00Z',
  },
  {
    id: '8',
    make: 'Ford',
    model: 'Mustang GT',
    year: 2024,
    price: 42900,
    mileage: 800,
    color: 'Vapor Blue',
    fuelType: 'Petrol',
    transmission: 'Manual',
    bodyType: 'Coupe',
    description: 'The all-new 7th generation Ford Mustang GT with the legendary 5.0L Coyote V8 producing 480 hp. This Dark Horse edition features a 6-speed manual transmission, MagneRide active suspension, and Recaro sport seats.',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5f82d661f?w=800&q=80',
    sellerId: 'admin',
    sellerName: 'AutoElite Admin',
    createdAt: '2024-05-10T10:30:00Z',
  },
];

const defaultUsers: User[] = [
  {
    id: 'admin',
    email: 'admin@autoelite.com',
    name: 'Admin User',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: 'user1',
    email: 'john@example.com',
    name: 'John Doe',
    password: 'user123',
    role: 'user',
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function initializeData(): void {
  if (!localStorage.getItem(CARS_KEY)) {
    localStorage.setItem(CARS_KEY, JSON.stringify(defaultCars));
  }
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
}

export async function getCars(): Promise<Car[]> {
  await delay(500);
  const data = localStorage.getItem(CARS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function getCarById(id: string): Promise<Car | null> {
  await delay(300);
  const cars = await getCars();
  return cars.find((car) => car.id === id) || null;
}

export async function createCar(car: Omit<Car, 'id' | 'createdAt'>): Promise<Car> {
  await delay(500);
  const cars = await getCars();
  const newCar: Car = {
    ...car,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  cars.unshift(newCar);
  localStorage.setItem(CARS_KEY, JSON.stringify(cars));
  return newCar;
}

export async function updateCar(id: string, updates: Partial<Car>): Promise<Car | null> {
  await delay(500);
  const cars = await getCars();
  const index = cars.findIndex((car) => car.id === id);
  if (index === -1) return null;
  cars[index] = { ...cars[index], ...updates };
  localStorage.setItem(CARS_KEY, JSON.stringify(cars));
  return cars[index];
}

export async function deleteCar(id: string): Promise<boolean> {
  await delay(400);
  const cars = await getCars();
  const filtered = cars.filter((car) => car.id !== id);
  localStorage.setItem(CARS_KEY, JSON.stringify(filtered));
  return true;
}

export async function getUsers(): Promise<User[]> {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function loginUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
  await delay(600);
  const users = await getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return null;
  const { password: _, ...safeUser } = user;
  return safeUser;
}

export async function registerUser(name: string, email: string, password: string): Promise<Omit<User, 'password'> | null> {
  await delay(600);
  const users = await getUsers();
  if (users.find((u) => u.email === email)) return null;
  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    password,
    role: 'user',
  };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  const { password: _, ...safeUser } = newUser;
  return safeUser;
}
