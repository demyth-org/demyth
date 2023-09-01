"use client";

import React, { useState } from "react";

const contextTest = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [test, setTest] = useState(null);
    return (
        <>
            <div>contextTest</div>;
        </>
    );
};

export default contextTest;
