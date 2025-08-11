export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  city: string;
  registeredDate: string;
}

export interface UserResponse {
  users: User[];
  next: number | null;
}
