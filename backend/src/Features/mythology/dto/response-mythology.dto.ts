import { mythologies } from "../enum";

//Id is empty
export class ResponseMythologyDto {
    _id: string;
    name: mythologies;
    shortDesc?: string;
    longDesc?: string;
    images?: {
        main: string;
        miniature: string;
        icon: string;
        _id: string;
    };
    effects: [
        {
            name: string;
            shortDesc: string;
            icon: string;
            _id: string;
        },
    ];
}
