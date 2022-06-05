import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from 'src/role/infrastructure/schemas/role.schema';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: Role.name, required: true })
  role: Role | Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
