import { Get, Controller } from '@nestjs/common';

@Controller('api')
export class BannersController {
  @Get('id')
  id() {
    return 'Hello World'
  }
}