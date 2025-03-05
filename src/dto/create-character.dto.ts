import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly rarity: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly weapon: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly element: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly nation: string;
}
