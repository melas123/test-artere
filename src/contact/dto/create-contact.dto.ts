import { ApiProperty } from "@nestjs/swagger";

export class CreateContactDto {
  @ApiProperty({
    required: true,
  })
  readonly first_name: string;
  @ApiProperty({
    required: true,
  })
  readonly last_name: string;
  @ApiProperty({
    required: true,
  })
  readonly email: string;
  @ApiProperty({
    required: true,
  })
  readonly phone: string;
  @ApiProperty({
    required: true,
  })
  readonly message: string;
}
