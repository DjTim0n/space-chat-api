import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Message } from "./schemas/message.schema";
import { Model } from "mongoose";

@Injectable()
export class WebsocketService {
  constructor(@InjectModel("Messages") private readonly messageModel: Model<Message>) {}
  readonly logger = new Logger(WebsocketService.name);
  async saveMessage(chat: Message): Promise<Message> {
    const newMessage = new this.messageModel({
      content: chat.content,
      sender: chat.sender,
      chatId: chat.chat,
      isRead: false,
      createdAt: new Date(),
    });
    return await newMessage.save();
  }

  async readMessage(messageId: string): Promise<Message> {
    const message = await this.messageModel.findOneAndUpdate({ _id: messageId }, { isRead: true });

    if (!message) {
      throw new Error("Message not found");
    }

    return message;
  }

  async getMessages(): Promise<Message[]> {
    return await this.messageModel.find().exec();
  }
}
