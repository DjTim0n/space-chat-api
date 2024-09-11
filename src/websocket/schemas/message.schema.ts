import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Message extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  sender: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Chat", required: true })
  chat: Types.ObjectId;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.index({ chat: 1, createdAt: -1 });
