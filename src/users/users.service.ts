import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { USERS, ROLES } from "./users.data";

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
}
