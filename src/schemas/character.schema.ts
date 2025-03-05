import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Character {
  @Prop()
  name: string;

  @Prop()
  rarity: string;

  @Prop()
  weapon: string;

  @Prop()
  element: string;

  @Prop()
  nation: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
