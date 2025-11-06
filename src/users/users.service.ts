import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { USERS, ROLES } from "./users.data";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  private users = [...USERS];

  // @@ For Getting All The Users
  getAll() {
    return this.users;
  }

  // @@ for getting one user by id
  getOne(id: number) {
    return this.users.find((u) => u.id === id);
  }

  // create users using the dto interface
  create(dto: CreateUserDto) {
    // Incremented Id
    const id = this.users.length
      ? Math.max(...this.users.map((u) => u.id)) + 1
      : 1;
    const user = { id, ...dto };
    this.users.push(user);
    return user;
  }

  // @@ Get Permission
  getUserPermissions(id: number) {
    const user = this.getOne(id);
    if (!user) return [];
    const roleObjects = ROLES.filter((r) => user.roles.includes(r.code));
    return [...new Set(roleObjects.flatMap((r) => r.permissions))];
  }

  // @@ Update User
  update(id: number, dto: UpdateUserDto) {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) throw new NotFoundException("User not found");
    this.users[idx] = { ...this.users[idx], ...dto };
    return this.users[idx];
  }

  // @@ Delete User
  delete(id: number) {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) throw new NotFoundException("User not found");
    const deleted = this.users.splice(idx, 1);
    return deleted[0];
  }

  // @@ Get Managed User
  getManagedUsers(id: number) {
    const user = this.getOne(id);
    if (!user) throw new NotFoundException("User not found");

    if (!user.roles.includes("ADMIN")) return [];

    return this.users.filter(u => 
      u.groups.some(g => user.groups.includes(g))
    );
  }

}
