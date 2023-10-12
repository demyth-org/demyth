const debug = true;
export const log = (...strings: any[]) => {
    if (debug) console.log(strings.map((str) => str));
};
