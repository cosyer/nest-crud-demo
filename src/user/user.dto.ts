import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDTO {
  @ApiProperty({
    example: "c",
    description: "用户名",
  })
  @IsNotEmpty({
    message: "用户名不能为空",
  })
  readonly user_name: string;
  @ApiProperty({
    example: "xxx",
    description: "密码",
  })
  @IsNotEmpty({
    message: "密码不能为空",
  })
  readonly password: string;
}

export class EditUserDTO {
  readonly user_name: string;
  readonly password: string;
}
