import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as XLSX from 'xlsx';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) 
  {}

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
  async verifyRut(rut: string): Promise<any> {
    // verificar Excel
    const formatedFormRut = this.formatRut(rut)
    //const sharepointData = this.getSharepointData()
    const excelData = this.readExcel();
    for (const obj of excelData) {
      // Use Object.entries to get key-value pairs
      for (const [key, value] of Object.entries(obj)) {
        if (key.includes('Rut')) {
          const excelFormatedRut = this.formatRut(value)
          console.log(excelFormatedRut)
          if (formatedFormRut == excelFormatedRut) {
            return {
              status: true,
              message: "Usuario existe"
            }
          }
        }
      }
    }
    // verificar DB
    const dbRut = await this.userRepository.findOne({ where: { rut: formatedFormRut }})
    if (dbRut) {
      return {
        status: true,
        message: "Usuario existe"
      }
    } else {
      return {
        status: false,
        message: "Usuario no existe"
      }
    }
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    try {
      const { rut, ...userDto } = createUserDto;
      const newUser = await this.userRepository.create(userDto)
      newUser.rut = this.formatRut(rut);
      await this.userRepository.save(newUser);
      return {
        status: true,
        message: "Usuario creado con éxito"
      }
    } catch (error) {
      return {
        status: false,
        message: error
      }
    }
  }

  private readExcel() {
    var workbook = XLSX.readFile('Registro Usuarios Acceso Peatonal MMLV 17 00 Hrs.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[2]]);
    return xlData;
  }

  private formatRut(rut: string) {
    // Define a regular expression to match commas, dots, slashes, dashes, and white spaces
    const regex = /[., \/\-\s]/g;
    const outputString = rut.replace(regex, '').toLowerCase();
    return outputString
  }

  async cargarExcel() {
    const excelData = this.readExcel();
    for (const obj of excelData) {
      let user = {
        nombre: '',
        apellido: '',
        email: '',
        rut: '',
        celular: '',
        patente_particular_1: null,
        patente_particular_2: null,
        sector_trabajo: null,
      }
      // Use Object.entries to get key-value pairs
      for (const [key, value] of Object.entries(obj)) {
        if (key.includes('Rut') && value !== '' && value !== undefined) user.rut = this.formatRut(value);
        if (key.includes('Nombre') && value !== '' && value !== undefined) {
          const wordsArray = value.split(' ');
          user.nombre = wordsArray[0] || '';
          user.apellido = wordsArray[1] || '';
        }
        if (key.includes('Correo') && value !== '' && value !== undefined) user.email = value;
        if (key.includes('Celular') && value !== '' && value !== undefined) user.celular = value;
        if (key.includes('Sector') && value !== '' && value !== undefined) user.sector_trabajo = value;
        if (key.includes('Placa') && value !== '' && value !== undefined) user.patente_particular_1 = value;
      }
      this.findOrCreate(user);
    }
  }

  private async findOrCreate(user) {
    try {
      let userFound = await this.userRepository.findOne({ where: { rut: user.rut } });
      if (!userFound) {
        const newUser = await this.userRepository.create(user)
        await this.userRepository.save(newUser);
        console.log("created")
      }
    } catch (error) {
      console.log("probably a duplicate")
    }
  }
}
