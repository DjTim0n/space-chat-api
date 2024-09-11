import { Logger, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { WebsocketService } from "src/websocket/websocket.service";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly websocketService: WebsocketService,
    private readonly jwtService: JwtService
  ) {}
  readonly logger = new Logger(AppGateway.name);
  @WebSocketServer() server: Server;

  @SubscribeMessage("sendMessage")
  async handleSendMessage(client: Socket, payload: any): Promise<void> {
    this.logger.verbose(`client: ${client.id} payload: ${payload}`);
    await this.websocketService.saveMessage(payload);
    this.server.emit("recMessage", payload);
  }

  @SubscribeMessage('readMessage')
  async handleReadMessage(client: Socket, payload: any): Promise<void> {
    this.logger.verbose(`client: ${client.id} payload: ${payload}`);
    await this.websocketService.readMessage(payload);
    this.server.emit('recReadMessage', payload);
  }

  afterInit(server: Server) {
    this.logger.log(`Server ${server}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    try {
      const token = client.handshake.headers.authorization?.split(" ")[1] || null;

      // if (!token) {
      //   throw new UnauthorizedException("Token is missing");
      // }

      // const payload = await this.jwtService.verifyAsync(token, {
      //   secret: process.env.JWT_SECRET,
      // });

      // client.data.user = payload;
      this.logger.log(`Connected: ${client.id} with user `); // ${payload.username}
    } catch (error) {
      this.logger.error(`Connection failed: ${client.id}, reason: ${error.message}`);
      client.disconnect();
    }
  }

  // handleConnection(client: Socket, ...args: any[]) {
  //   this.logger.log(`Connected ${client.id} ${args}`);

  //   this.logger.verbose(`Client: ${client.handshake.headers.cookie}`);
  // }
}
