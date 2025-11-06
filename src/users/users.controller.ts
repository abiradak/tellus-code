import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
UsersService

@Controller("users")
export class UsersController {

    constructor(private userservice:  UsersService){}

    @Get()
    @UseGuards()
    getAll() {
        return this.userservice.getAll();
    }

}