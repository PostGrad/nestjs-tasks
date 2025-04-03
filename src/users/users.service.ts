import { Injectable, NotFoundException } from '@nestjs/common';

// Export the User interface so it can be used in other files
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'pranay',
      email: 'p@s.patel',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'shailesh',
      email: 's@a.patel',
      role: 'ENGG',
    },
    {
      id: 3,
      name: 'kishan',
      email: 'k@r.patel',
      role: 'STU',
    },
    {
      id: 4,
      name: 'gunu',
      email: 'g@u.patel',
      role: 'STU',
    },
  ];

  findAll(role?: 'ADMIN' | 'ENGG' | 'STU') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    } else return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(user: User) {
    const highestId = this.users[this.users.length - 1].id;
    const newUser = { id: highestId + 1, ...user };
    console.log('newUser => ', newUser);
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'ADMIN' | 'ENGG' | 'STU';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        // Merge the existing user with the updates, preserving required fields
        return { ...user, ...updatedUser };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    if (removedUser) {
      this.users = this.users.filter((user) => user.id !== id);
      return removedUser;
    } else {
      throw new NotFoundException(`User with id: ${id} not found.`);
    }
  }
}
