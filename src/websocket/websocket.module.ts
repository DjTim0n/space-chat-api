import { Module } from "@nestjs/common";
import { WebsocketService } from "./websocket.service";
import { WebsocketController } from "./websocket.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { MessageSchema } from "./schemas/message.schema";
import { ChatSchema } from "./schemas/chat.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Messages", schema: MessageSchema },
      { name: "Chat", schema: ChatSchema },
    ]),
  ],
  providers: [WebsocketService],
  controllers: [WebsocketController],
  exports: [WebsocketService],
})
export class WebsocketModule {}
