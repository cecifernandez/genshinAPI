import { Document } from "mongoose";

export interface ICharacter extends Document{
    readonly name: string;
    readonly rarity: string;
    readonly weapon: string;
    readonly element: string;
    readonly nation: string;
}