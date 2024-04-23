import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPostDto: CreatePostDto) {
    return await this.prisma.posts.create({
      data: {
        ...createPostDto,
      },
    });
  }

  async findAll() {
    return await this.prisma.posts.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.posts.findUnique({
      where: { postId: id },
    });
  }

  async findByUserId(userId: string) {
    return await this.prisma.posts.findMany({
      where: { userId },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.prisma.posts.update({
      where: { postId: id },
      data: {
        ...updatePostDto,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.posts.delete({
      where: { postId: id },
    });
  }
}
