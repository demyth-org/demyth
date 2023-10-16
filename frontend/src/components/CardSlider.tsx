"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import city1 from "../../public/images/CardAssets/city1.png";
import city2 from "../../public/images/CardAssets/city2.png";
import city3 from "../../public/images/CardAssets/city3.png";
import planet1 from "../../public/images/CardAssets/planet1.png";
import planet2 from "../../public/images/CardAssets/planet2.png";

const CardSlider = ({ n }: { n: number }) => {
    if (n === 0) return;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [positionIndexes, setPositionIndexes] = useState(Array.from(Array(n).keys()));

    const handleBack = () => {
        setPositionIndexes((prevIndexes) => {
            const updatedIndexes = prevIndexes.map((prevIndex) => (prevIndex + 1) % n);
            return updatedIndexes;
        });
    };

    const handleNext = () => {
        setPositionIndexes((prevIndexes) => {
            const updatedIndexes = prevIndexes.map((prevIndex) => (prevIndex + n - 1) % n);

            return updatedIndexes;
        });
    };

    const images = [city1, city2, city3, planet1, planet2];

    //Max 5 cards are printed
    //const positions = ["center", "left1", "left2", "right1", "right2"];
    const positions = ["left2", "left1", "center", "right1", "right2"];
    const imageVariants = {
        left2: { x: "-90%", scale: 0.5, zIndex: 2 },
        left1: { x: "-50%", scale: 0.7, zIndex: 3 },
        center: { x: "0%", scale: 1, zIndex: 5 },
        right1: { x: "50%", scale: 0.7, zIndex: 3 },
        right2: { x: "90%", scale: 0.5, zIndex: 1 },
    };

    return (
        <div className="relative flex h-[25vh] w-full flex-col items-center justify-center border border-yellow-400">
            {images.map((image, index) => (
                <motion.div
                    key={index}
                    animate={positions[positionIndexes[index]]}
                    variants={imageVariants}
                    transition={{ duration: 0.5 }}
                    className="absolute w-[50%]"
                >
                    <Image src={image} alt={image.src} className="h-[100%] w-full rounded-xl" />
                </motion.div>
            ))}

            <button
                className="absolute left-0 top-1/2 z-10 rounded-md bg-indigo-400 px-4 py-2 text-white"
                onClick={handleBack}
            >
                Back
            </button>
            <button
                className="absolute right-0 top-1/2 z-10 rounded-md bg-indigo-400 px-4 py-2 text-white"
                onClick={handleNext}
            >
                Next
            </button>
        </div>
    );
};

export default CardSlider;
