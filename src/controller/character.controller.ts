/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { response } from 'express';
import { CreateCharacterDto } from 'src/dto/create-character.dto';
import { UpdateCharacterDto } from 'src/dto/update-character.dto';
import { CharacterService } from 'src/service/character.service';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  async createCharacter(
    @Res() response,
    @Body() createCharacterDto: CreateCharacterDto,
  ) {
    try {
      const newCharacter =
        await this.characterService.createCharacter(createCharacterDto);
      return response
        .status(HttpStatus.CREATED)
        .json({ message: 'Character created succesfully', newCharacter });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/id')
  async updateCharacter(
    @Res() response,
    @Param('id') characterId: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    try {
      const existingCharacter = await this.characterService.updateCharacter(
        characterId,
        updateCharacterDto,
      );
      return response
        .status(HttpStatus.OK)
        .json({ message: 'Character updated succesfully', existingCharacter });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getCharacters(@Res() response) {
    try {
      const characterData = await this.characterService.getAllCharacters();
      return response.status(HttpStatus.OK).json({
        message: 'All character data found successfully',
        characterData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/id')
  async getCharacter(@Res() response, @Param('id') characterId: string) {
    try {
      const existingCharacter =
        await this.characterService.getCharacter(characterId);
      return response.status(HttpStatus.OK).json({
        message: 'Character found successfully',
        existingCharacter,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/id')
  async deleteCharacter(@Res() response, @Param('id') characterId: string) {
    try {
      const deletedCharacter =
        await this.characterService.deleteCharacter(characterId);
      return response.status(HttpStatus.OK).json({
        message: 'Character deleted successfully',
        deletedCharacter,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
