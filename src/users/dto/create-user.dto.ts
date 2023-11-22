import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Sector } from '../types';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsString()
  rut: string;

  @IsNotEmpty()
  @IsString()
  celular: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  patente_particular_1: string;

  @IsNotEmpty()
  @IsString()
  patente_particular_2: string;

  @IsNotEmpty()
  @IsEnum(Sector)
  sector_trabajo: Sector;
}