import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createLikeDto: CreateLikeDto) {
    return await this.prisma.likes.create({
      data: { ...createLikeDto },
    });
  }

  async findAll() {
    return await this.prisma.likes.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.likes.findUnique({
      where: { likeId: id },
    });
  }

  async update(id: string, updateLikeDto: UpdateLikeDto) {
    return await this.prisma.likes.update({
      where: { likeId: id },
      data: {
        ...updateLikeDto,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.likes.delete({
      where: { likeId: id },
    });
  }
}
