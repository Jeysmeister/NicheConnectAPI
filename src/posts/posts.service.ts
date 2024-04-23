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
    return await this.prisma.posts.findMany({
      include: { comments: true, likes: true },
    });
  }

  async findOne(id: string) {
    return await this.prisma.posts.findUnique({
      where: { postId: id },
      include: { comments: true, likes: true },
    });
  }

  async findByUserId(id: string) {
    return await this.prisma.posts.findMany({
      where: { userId: id },
      include: { comments: true, likes: true },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.prisma.posts.update({
      where: { postId: id },
      data: {
        ...updatePostDto,
      },
      include: { comments: true, likes: true },
    });
  }

  async remove(id: string) {
    return await this.prisma.posts.delete({
      where: { postId: id },
    });
  }
}
