import { Stats } from './stats'

export interface CharacterDetails {
  name: string;
  race: string;
  player: string;
  highlight: string;
  motivation: string;
  personality: string;
  alignment: string;
  family: string;
  gender: string;
  age: string;
  eyes: string;
  hair: string;
  class: string;
  level: string;
  experience: string;
}

export interface Character {
  stats: Stats;
  details: CharacterDetails;
  userHandle: string;
}

export interface CharacterResponse extends Character {
  id: string;
}