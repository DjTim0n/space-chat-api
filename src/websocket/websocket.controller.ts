import { Controller, Get } from "@nestjs/common";
import { WebsocketService } from "./websocket.service";
import { Auth } from "src/lib/guards/auth.guard";

@Auth()
@Controller("websocket")
export class WebsocketController {
  constructor(private readonly websocketService: WebsocketService) {}
  @Get()
  async getMessages() {
    return await this.websocketService.getMessages();
  }
}
