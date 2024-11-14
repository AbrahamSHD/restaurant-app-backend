import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get()
  findAllRoles() {
    return this.rolesService.findAllRoles();
  }

  @Get(':term')
  findOneRoleByTerm(@Param('term') term: string) {
    return this.rolesService.findOneRoleByTerm(term);
  }

  @Patch(':id')
  updateRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  removeRole(@Param('id', ParseUUIDPipe) id: string) {
    return this.rolesService.removeRole(id);
  }
}
