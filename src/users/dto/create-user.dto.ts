import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsString,
  isString,
  MaxLength,
} from "class-validator";
import { ROLES, GROUPS } from "../users.data";

// Dto For The User same like Interface To validate user data.
export class CreateUserDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(ROLES.map((r) => r.code), { each: true })
  roles: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(GROUPS, { each: true })
  groups: string[];
}
