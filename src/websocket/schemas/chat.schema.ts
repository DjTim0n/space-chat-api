import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Chat extends Document {
  @Prop({ type: [Types.ObjectId], ref: "User", required: true })
  participants: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: "Messages" })
  lastMessage: Types.ObjectId;

  @Prop({ default: "" })
  name: string;

  @Prop({ default: false })
  isGroupChat: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
ChatSchema.index({ participants: 1 });