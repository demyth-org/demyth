import { IsString, IsOptional, IsEnum } from "class-validator";
import { eHeroGender } from "../../../enums";

export class ImagesDto {
    @IsString()
    main: string;

    @IsEnum(eHeroGender)
    sex: eHeroGender;
}
