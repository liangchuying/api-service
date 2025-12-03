import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ProductDto) {
    try {
      // Create product first, then create related ProductImage rows (images are not a field on Product table)
      const result = await this.prisma.$transaction(async (tx) => {
        const product = await tx.product.create({
          data: {
            name: data.name,
            description: data.description ?? '',
            price: data.price ?? 0,
            inventory: data.inventory ?? 0,
            isActive: data.isActive ?? true,
          },
        });

        if (data.images && data.images.length > 0) {
          const imagesData = data.images.map((url) => ({
            url,
            productId: product.id,
          }));
          // createMany is faster; createdAt/updatedAt will use DB defaults
          await tx.productImage.createMany({ data: imagesData });
        }

        return product;
      });

      return {
        statusCode: 201,
        message: '产品创建成功',
        data: result,
      };
    } catch (error: any) {
      // Handle Prisma unique constraint error (P2002) for duplicate product name
      if (error?.code === 'P2002') {
        throw new ConflictException('创建产品失败: 产品名已存在');
      }

      throw new ConflictException(
        '创建产品失败: ' + (error?.message ?? String(error)),
      );
    }
  }

  async update(id: number, data: ProductDto) {
    try {
      await this.prisma.product.update({
        where: { id: id },
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          isActive: data.isActive,
          inventory: data.inventory,
        },
      });

      // Note: updating images (add/remove) is not handled here. We can implement that if needed.

      return {
        statusCode: 200,
        message: '产品更新成功',
      };
    } catch (error) {
      throw new ConflictException('更新产品失败: ' + error.message);
    }
  }
}
