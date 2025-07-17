import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card } from 'src/schema/card.schema';

@Injectable()
export class CardService {

  constructor(@InjectModel(Card.name) private cardModel:Model<Card>){}
  async create(user:Request,createCardDto: CreateCardDto) {
    const card = new this.cardModel(createCardDto)
    card.createdBy = user['sub']
    card.userId = user['sub']
    await card.save()
    return card
  }

  async findAll(user: Request) {
    const card = await this.cardModel.find({ userId: user['sub'] }).exec()
    return card
  }

  async findOne(user:Request,id: string) {
    const card = await this.cardModel.findById(id)
    if (!card)
      throw new HttpException('No address found with the given id', 404)
            
    if (card.userId != user['sub'])
      throw new UnauthorizedException()

    return card
  }

  async update(user: Request, updateCardDto: UpdateCardDto) {
    const card = await this.cardModel.findById(updateCardDto.id)
    if (!card)
      throw new HttpException('No address found with the given id', 404)
            
    if (card.userId != user['sub'])
      throw new UnauthorizedException()

    const updatedCard = await this.cardModel.findByIdAndUpdate(updateCardDto.id, updateCardDto, { new: true })
    return updatedCard
  }

  async remove(user:Request,id: string) {
    const card = await this.cardModel.findById(id)
    if (!card)
      throw new HttpException('No address found with the given id', 404)
            
    if (card.userId != user['sub'])
      throw new UnauthorizedException()

    await this.cardModel.findByIdAndDelete(id)
    return {response:'Card has been successfully deleted'}
  }
}
