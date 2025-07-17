import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorator/role.decorator';
import { Request } from 'express';


@Roles(Role.CUSTOMER)
@ApiTags('Payment-Cards')
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Api endpoint to add new card' })
  create(@Req() req: Request, @Body() createCardDto: CreateCardDto) {
    const user = req['user']
    return this.cardService.create(user, createCardDto);    
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Api endpoint to get all cards of user' })
  findAll(@Req() req: Request) {
    const user = req['user']
    return this.cardService.findAll(user)
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Api endpoint to get all cards of user' })
  findOne(@Req() req: Request, @Param('id') id: string) {
    const user=req['user']
    return this.cardService.findOne(user,id);
  }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Api endpoint to update card of user' })
  update(@Req() req: Request, @Body() updateCardDto: UpdateCardDto) {
    const user=req['user']
    return this.cardService.update(user,updateCardDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Api endpoint to delete card of user' })
  remove(@Req()req:Request,@Param('id') id: string) {
    const user = req['user']
    return this.cardService.remove(user,id)
  }
}
