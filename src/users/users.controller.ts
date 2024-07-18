import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dto/return-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async createAdminUser(
        @Body(ValidationPipe) createUserDto: CreateUserDto,
    ): Promise<ReturnUserDto> {
        try{
            const user = await this.usersService.createAdminUser(createUserDto);
            return {
            user,
            message: 'Administrador cadastrado com sucesso',
            };
        } catch (error) {
            return error.message;
        }
    }
}
