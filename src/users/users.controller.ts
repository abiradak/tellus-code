import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PermissionGuard } from "src/common/guards/permissions.guard";
import { Permission } from "src/common/decorators/permission.decorator";

@Controller("users")
export class UsersController {

    constructor(private userservice:  UsersService){}

    @Get()
    @UseGuards(PermissionGuard)
    @Permission('VIEW')
    getAll() {
        console.log("here");
        return this.userservice.getAll();
    }

}