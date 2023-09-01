import Link from "next/link";
import React from "react";

type t_god = {
    god: string;
};

const Creature = ({ god }: t_god) => {
    console.log(god);
    return (
        <>
            <p>dieu: </p>
            <div>{god}</div>
        </>
    );
};

export default Creature;
