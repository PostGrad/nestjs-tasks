import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService, User } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: 'ENGG' | 'ADMIN' | 'STU'): User[] {
    // Use the role parameter to filter users
    return this.usersService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string): User | undefined {
    return this.usersService.findOne(+id);
  }

  @Post()
  create(@Body() user: User): User {
    return this.usersService.create(user);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() userUpdate: Record<string, any>,
  ): User | undefined {
    return this.usersService.update(+id, userUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
