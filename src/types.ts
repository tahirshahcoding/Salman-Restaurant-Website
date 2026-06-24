export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  halfPrice?: number;        // Price when Half portion is selected
  halfDescription?: string;  // Optional alternate description for half portion
  image: string;
  category: 'bbq' | 'pakistani' | 'shinwari' | 'afghani' | 'drinks' | 'refreshments' | 'naan' | 'readymade';
  spicyLevel?: 0 | 1 | 2 | 3;
  isVegetarian?: boolean;
  isChefSpecial?: boolean;
  prepTime?: string;
  calories?: number;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'indoor' | 'outdoor' | 'chefs-table';
  specialRequests?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
  tag?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  customNotes?: string;
}
