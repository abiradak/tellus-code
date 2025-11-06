import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import strict from "assert/strict";
import { UsersService } from "src/users/users.service";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(UsersService) private userService: UsersService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.get<string>(
      "permission",
      context.getHandler()
    );
    if (!requiredPermission) return true;

    const request = context.switchToHttp().getRequest();
    const userId = parseInt(request.headers["authorization"]);
    if (!userId) throw new ForbiddenException("Missing Authorization header");

    const permissions = this.userService.getUserPermissions(userId);

    if (!permissions.includes(requiredPermission)) {
      throw new ForbiddenException(
        "Not allowed to perform action due to insufficient permissions."
      );
    }

    return true;
  }
}
