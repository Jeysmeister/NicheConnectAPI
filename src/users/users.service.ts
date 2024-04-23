import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

export const roundsOfHashing = 10;
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new ConflictException('Passwords does not match');
    }

    try {
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        roundsOfHashing,
      );

      createUserDto.password = hashedPassword;

      const result = await this.prisma.users.create({
        data: {
          username: createUserDto.username,
          email: createUserDto.email,
          password: createUserDto.password,
        },
      });

      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return new ConflictException('Email already exists.');
        } else {
          return { error: error };
        }
      }
    }
  }

  async findAll() {
    return this.prisma.users.findMany({
      include: {
        posts: true,
        comments: true,
        likes: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.users.findUnique({
      where: { userId: id },
      include: {
        posts: true,
        comments: true,
        likes: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.users.update({
      where: { userId: id },
      data: updateUserDto,
      include: {
        posts: true,
        comments: true,
        likes: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.users.delete({
      where: { userId: id },
    });
  }
}
