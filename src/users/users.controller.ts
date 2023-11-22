import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Sector } from './types';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }

  @Get('registrar')
  @Render('registrar')
  getRegisterForm(): Record<string, unknown> {
    // You can pass data to your view if needed
    return { sector: Sector };
  }

  @Post('registrar')
  async register(@Body() createUserDto: CreateUserDto): Promise<string> {
    return await this.usersService.register(createUserDto);
  }

  @Get('verificar')
  @Render('verificar')
  getVerifyRutForm(): Record<string, unknown> {
    // You can pass data to your view if needed
    return {};
  }

  @Get('verificar/:rut')
  async verifyRut(@Param('rut') rut: string): Promise<string> {
    return await this.usersService.verifyRut(rut);
  }

  @Get('cargarExcel')
  async cargarExcel() {
    return await this.usersService.cargarExcel();
  }
}
