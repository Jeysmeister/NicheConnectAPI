import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCommentDto: CreateCommentDto) {
    return await this.prisma.comments.create({
      data: { ...createCommentDto },
    });
  }

  async findAll() {
    return await this.prisma.comments.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.comments.findUnique({
      where: { commentId: id },
    });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return await this.prisma.comments.update({
      where: { commentId: id },
      data: {
        ...updateCommentDto,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.comments.delete({
      where: { commentId: id },
    });
  }
}
