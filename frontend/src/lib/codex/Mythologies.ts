type ImagesDto = {
    main: string;
    miniature: string;
    icon: string;
};

type ResponseEffectsDto = {
    _id: string;
    name: string;
    shortDesc: string;
    icon: string;
};

export type ResponseMythologyDto = {
    _id: string;
    name: string;
    shortDesc?: string;
    longDesc?: string;
    images?: ImagesDto;
    effects: ResponseEffectsDto[];
};

// TODO: check cache refresh
async function getMyths(): Promise<ResponseMythologyDto[] | null> {
    let res: Response;
    try {
        //res = await fetch("http://localhost:3001/v0/mythologies?mythId=6516d7771dfb2de0637500a6");
        res = await fetch("http://localhost:3001/v0/mythologies");
    } catch (e) {
        console.log("here");
        return null; // new Error("Failed to fetch");
    }
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

/* const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
}); */

export default getMyths;
