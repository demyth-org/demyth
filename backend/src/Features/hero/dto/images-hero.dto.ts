import { IsString, IsBoolean } from "class-validator";

export class ImagesDto {
    @IsString()
    main: string;

    @IsBoolean()
    active: boolean;
}
