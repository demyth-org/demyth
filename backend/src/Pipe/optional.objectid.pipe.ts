import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class OptionalParseObjectIdPipe implements PipeTransform<string, Types.ObjectId> {
    transform(value: string): Types.ObjectId {
        console.log(value);
        if (!value) {
            return undefined;
        }

        const validObjectId = Types.ObjectId.isValid(value);
        if (!validObjectId) {
            throw new BadRequestException("Invalid ObjectId");
        }

        return Types.ObjectId.createFromHexString(value);
    }
}
