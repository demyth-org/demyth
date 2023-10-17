"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import city1 from "../../public/images/CardAssets/city1.png";
import city2 from "../../public/images/CardAssets/city2.png";
import city3 from "../../public/images/CardAssets/city3.png";
import planet1 from "../../public/images/CardAssets/planet1.png";
import planet2 from "../../public/images/CardAssets/planet2.png";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { motion, useTransform, useScroll } from "framer-motion";

// TODO: adapt for more than 5 items
// TODO: adapt for cards and not only images
// TODO: add horizontal scrolling
const CardSlider = ({ n }: { n: number }) => {
    const [positionIndexes, setPositionIndexes] = useState(Array.from(Array(n).keys()));
    const targetRef = useRef(null);

    if (n === 0) return;

    const handleRight = () => {
        setPositionIndexes((prevIndexes) => {
            const updatedIndexes = prevIndexes.map((prevIndex) => (prevIndex + 1) % n);
            return updatedIndexes;
        });
    };

    const handleLeft = () => {
        setPositionIndexes((prevIndexes) => {
            const updatedIndexes = prevIndexes.map((prevIndex) => (prevIndex + n - 1) % n);

            return updatedIndexes;
        });
    };

    const handleClick = (position: number) => {
        setPositionIndexes((prevIndexes) => {
            const updatedIndexes = prevIndexes.map((prevIndex) => {
                if (position === 0) return (prevIndex + 2) % n;
                if (position === 1) return (prevIndex + 1) % n;
                if (position === 3) return (prevIndex + n - 1) % n;
                if (position === 4) return (prevIndex + n - 2) % n;
                return prevIndex;
            });

            return updatedIndexes;
        });
    };

    const images = [city1, city2, city3, planet1, planet2];

    //Max 5 cards are printed
    const positions = ["left2", "left1", "center", "right1", "right2"];
    const imageVariants = {
        left2: { x: "-90%", scale: 0.6, zIndex: 2 },
        left1: { x: "-40%", scale: 0.8, zIndex: 3 },
        center: { x: "0%", scale: 1, zIndex: 5 },
        right1: { x: "40%", scale: 0.8, zIndex: 3 },
        right2: { x: "90%", scale: 0.6, zIndex: 1 },
    };

    return (
        <div ref={targetRef} className="relative flex h-64 w-full flex-col items-center justify-center ">
            {images.map((image, index) => (
                <motion.div
                    key={index}
                    animate={positions[positionIndexes[index]]}
                    variants={imageVariants}
                    transition={{ duration: 0.5 }}
                    className="absolute w-[55%]"
                    onClick={() => handleClick(positionIndexes[index])}
                >
                    <Image src={image} alt={image.src} className="h-[100%] w-full rounded-xl" />
                </motion.div>
            ))}

            <FiArrowLeftCircle
                className="absolute left-0 top-1/2 z-10 cursor-pointer text-4xl "
                onClick={handleRight}
            />
            <FiArrowRightCircle
                className="absolute right-0 top-1/2 z-10 cursor-pointer text-4xl"
                onClick={handleLeft}
            />
        </div>
    );
};

export default CardSlider;
