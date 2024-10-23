import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { ApiTags, ApiResponse, ApiOperation } from "@nestjs/swagger";
import { Response } from "express";

@ApiTags("client")
@Controller("client")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({ summary: "Create a new client" })
  @ApiResponse({
    status: 201,
    description: "The client has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Invalid input data." })
  create(
    @Body() createClientDto: CreateClientDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.clientService.create(createClientDto, res);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve a list of all clients" })
  findAll() {
    return this.clientService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve details of a specific client by ID" })
  findOne(@Param("id") id: string) {
    return this.clientService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update an existing client by ID" })
  update(@Param("id") id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a client by ID" })
  remove(@Param("id") id: string) {
    return this.clientService.remove(id);
  }
}
