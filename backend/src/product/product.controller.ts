import { Body, Controller, Post, ParseIntPipe, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  create(@Body() dto: ProductDto) {
    return this.productService.create(dto);
  }

  @Post('update')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProductDto) {
    return this.productService.update(id, dto);
  }
}
