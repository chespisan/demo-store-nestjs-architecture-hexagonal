import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from 'src/product/infrastructure/schemas/product.schema';

@Schema()
export class Category extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  products: Types.Array<Product>;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
