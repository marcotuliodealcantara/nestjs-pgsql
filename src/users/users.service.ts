import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './enum/users-enums.enum';

/* import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common'; */

@Injectable()
export class UsersService {
    
    // Utilizando repository
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}
    
    async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
        if (createUserDto.password != createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem');
        } else {
            return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
        }
    }
      
    /* In case of the workaround not using repository because of deprecated EntityRepository decorator
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}

    async createUser(
        createUserDto: CreateUserDto,
        role: UserRole,
    ): Promise<User> {
        const { email, name, password } = createUserDto;
        const user = this.userRepository.create();
        user.email = email;
        user.name = name;
        user.role = role;
        user.status = true;
        user.confirmationToken = crypto.randomBytes(32).toString('hex');
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
            delete user.password;
            delete user.salt;
            return user;
        } catch (error) {
            if (error.code.toString() === '23505') {
            throw new ConflictException('Endereço de email já está em uso');
            } else {
            throw new InternalServerErrorException(
                'Erro ao salvar o usuário no banco de dados',
            );
            }
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
        if (createUserDto.password != createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem');
        } else {
            return this.createUser(createUserDto, UserRole.ADMIN);
        }
    } */
}
