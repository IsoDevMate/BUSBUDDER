export enum UserRole {
  PASSENGER = 'passenger',
  BUS_OPERATOR = 'bus_operator',
  ADMIN = 'admin'
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDocument extends User, Document {
  comparePassword(password: string): Promise<boolean>;
}
