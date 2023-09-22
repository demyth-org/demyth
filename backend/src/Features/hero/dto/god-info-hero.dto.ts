import { IsString, IsOptional, IsBoolean } from "class-validator";

export class GodInfoDto {
    @IsString()
    main: string;

    @IsBoolean()
    active: boolean;
}
