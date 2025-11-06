import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PermissionGuard } from "src/common/guards/permissions.guard";
import { Permission } from "src/common/decorators/permission.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Controller("users")
export class UsersController {
  constructor(private userservice: UsersService) {}

  // @@ Get All Users
  @Get()
  @UseGuards(PermissionGuard)
  @Permission("VIEW")
  getAll() {
    // console.log("here");
    return this.userservice.getAll();
  }

  // @@ Create user
  @Post()
  @UseGuards(PermissionGuard)
  @Permission("CREATE")
  create(dto: CreateUserDto) {
    return this.userservice.create(dto);
  }

  // @@ Edit User param id
  @Patch(":id")
  @UseGuards(PermissionGuard)
  @Permission("EDIT")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.userservice.update(id, dto);
  }

  // @@ Delete User By ID
  @Delete(":id")
  @UseGuards(PermissionGuard)
  @Permission("DELETE")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.userservice.delete(id);
  }

  // @Get("managed/:id")
  findManaged(@Param("id", ParseIntPipe) id: number) {
    return this.userservice.getManagedUsers(id);
  }
}
