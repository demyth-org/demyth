import { IsString, IsOptional } from "class-validator";

export class ImagesDto {
    @IsOptional()
    @IsString()
    main: string;

    @IsOptional()
    @IsString()
    miniature: string;

    @IsOptional()
    @IsString()
    icon: string;
}
