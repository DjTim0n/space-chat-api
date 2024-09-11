import { Controller, Render, Get, Res } from "@nestjs/common";

@Controller()
export class AppController {
  constructor() {}

  @Get("/chat")
  @Render("index")
  Home() {
    return;
  }
}
