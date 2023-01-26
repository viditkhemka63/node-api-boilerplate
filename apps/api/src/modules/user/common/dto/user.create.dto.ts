import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsArray,
  IsOptional,
} from 'class-validator';

export class UserCreateDto {
  @ApiProperty({
    description: 'Alias name of firstName',
    example: faker.name.firstName(),
    required: true,
  })
  @IsString()
  readonly firstName: string;

  @ApiProperty({
    description: 'Alias name of lastName',
    example: faker.name.lastName(),
    required: true,
  })
  @IsString()
  readonly lastName: string;

  @ApiProperty({
    description: 'Alias name of mobileNumber',
    example: faker.phone.number(),
    required: true,
  })
  @IsString()
  @IsOptional()
  readonly mobileNumber: string = null;

  @ApiProperty({
    description: 'Alias name of email',
    example: faker.internet.email(),
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly salt: string;
}
