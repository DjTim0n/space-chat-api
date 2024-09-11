import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

@Schema({ versionKey: false })
export class User extends Document {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  username: string;

  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop({ default: "" })
  avatarUrl: string;

  @ApiProperty()
  @Prop({ default: false })
  isOnline: boolean;

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  lastActive: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ username: 1 });
