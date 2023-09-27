import { IsString, IsOptional, IsEnum } from "class-validator";
import { eHeroSex } from "../../hero/enum";

export class ImagesDto {
    @IsString()
    main: string;

    @IsEnum(eHeroSex)
    sex: eHeroSex;
}
