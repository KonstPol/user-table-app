import type { User, UserResponse } from '../models/user';

export const getUsers = async (page: number): Promise<UserResponse> => {
  const response = await fetch(`http://localhost:5000/users?_page=${page}`);

  if (!response.ok) {
    throw new Error(`Code: ${response.status}; \n Message: ${response.statusText}; \n`);
  }

  const { data, next } = await response.json();

  return {
    users: data.map((user: User) => {
      user.fullName = `${user.firstName} ${user.lastName}`;

      return user;
    }),
    next,
  } as UserResponse;
};
