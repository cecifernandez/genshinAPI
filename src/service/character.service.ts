import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from 'src/dto/create-character.dto';
import { ICharacter } from 'src/interfaces/character.interface';
import { Model } from 'mongoose';
import { UpdateCharacterDto } from 'src/dto/update-character.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel('Character') private characterModel: Model<ICharacter>,
  ) {}

  async createCharacter(
    createCharacterDto: CreateCharacterDto,
  ): Promise<ICharacter> {
    const newCharacter = new this.characterModel(createCharacterDto);
    return await newCharacter.save();
  }

  async updateCharacter(
    characterId: string,
    updateCharacterDto: UpdateCharacterDto,
  ): Promise<ICharacter> {
    const existingCharacter = await this.characterModel.findByIdAndUpdate(
      characterId,
      updateCharacterDto,
      {
        new: true,
      },
    );
    if (!existingCharacter) {
      throw new NotFoundException(`Character #${characterId} not found`);
    }
    return existingCharacter;
  }

  async getAllCharacters(): Promise<ICharacter[]> {
    const characterData = await this.characterModel.find();

    if (!characterData || characterData.length == 0) {
      throw new NotFoundException('Character data no found');
    }

    return characterData;
  }

  async getCharacter(characterId: string): Promise<ICharacter> {
    const existingCharacter = await this.characterModel
      .findById(characterId)
      .exec();

    if (!existingCharacter) {
      throw new NotFoundException(`Character #${characterId} not found`);
    }

    return existingCharacter;
  }

  async deleteCharacter(characterId: string): Promise<ICharacter> {
    const deletedCharacter =
      await this.characterModel.findByIdAndDelete(characterId);

    if (!deletedCharacter) {
      throw new NotFoundException(`Character #${characterId} not found`);
    }

    return deletedCharacter;
  }
}
