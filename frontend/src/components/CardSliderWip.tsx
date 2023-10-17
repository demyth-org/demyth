"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import city1 from "../../public/images/CardAssets/city1.png";
import city2 from "../../public/images/CardAssets/city2.png";
import city3 from "../../public/images/CardAssets/city3.png";
import planet1 from "../../public/images/CardAssets/planet1.png";
import planet2 from "../../public/images/CardAssets/planet2.png";
import space1 from "../../public/images/CardAssets/SpaceCity1.jpg";
import space2 from "../../public/images/CardAssets/SpaceCity2.jpeg";
import space3 from "../../public/images/CardAssets/SpaceCity3.jpeg";
import space4 from "../../public/images/CardAssets/SpaceCity4.jpeg";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { motion, useTransform, useScroll } from "framer-motion";
import { ResponseMythologyDto } from "../lib/codex/Mythologies";

// TODO: adapt for more than 5 items
// TODO: adapt for cards and not only images
// TODO: add horizontal scrolling
const CardSlider = ({ mythologies }: { mythologies: ResponseMythologyDto[] }) => {
    const [positionIndexes, setPositionIndexes] = useState(Array.from(Array(mythologies.length).keys()));
    const targetRef = useRef(null);
    const n = mythologies.length;

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

    const images = [city1, city2, city3, planet1, planet2, space1, space2, space3, space4];

    //Max 5 cards are printed side to side
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
            {mythologies.map((myth, index) => (
                <motion.div
                    key={index}
                    animate={positions[positionIndexes[index]]}
                    variants={imageVariants}
                    transition={{ duration: 0.5 }}
                    className="absolute w-[55%] cursor-pointer hover:rounded-lg hover:border hover:border-astral"
                    onClick={() => handleClick(positionIndexes[index])}
                >
                    <Card myth={myth} />
                </motion.div>
            ))}

            <FiArrowLeftCircle
                className="absolute left-0 top-1/2 z-10 cursor-pointer text-4xl hover:text-astral focus:text-astral-200 focus:outline-none focus:ring-0 active:text-astral"
                onClick={handleRight}
            />
            <FiArrowRightCircle
                className="absolute right-0 top-1/2 z-10 cursor-pointer text-4xl hover:text-astral focus:text-astral-200 focus:outline-none focus:ring-0 active:text-astral"
                onClick={handleLeft}
            />
        </div>
    );
};

const Card = ({ myth }: { myth: ResponseMythologyDto }) => {
    return (
        <div
            key={myth._id}
            className="flex h-[26rem] min-w-[48rem] flex-1 flex-row items-start justify-start gap-4 overflow-auto  rounded-lg border border-shark-800 bg-shark-900 p-4 shadow-lg"
        >
            <div className="flex h-auto w-[50%] flex-col items-start justify-start gap-4">
                <h2 className="text-lg text-slate-50">{myth.name}</h2>
                <p>{myth.shortDesc}</p>
                <p>{myth.longDesc}</p>
                <ul>
                    {myth.effects.map((effect) => (
                        <li key={effect._id} className="flex flex-row items-start justify-between gap-2 p-2 text-start">
                            <span className="h-[4rem] w-[4rem] overflow-hidden rounded-full bg-shark-700">
                                {effect.icon}
                            </span>
                            <div className="flex w-full flex-col gap-2">
                                <h3 className="border-b border-shark">{effect.name}</h3>
                                <p>{effect.shortDesc}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex h-full min-h-full w-[50%] flex-col items-start justify-start gap-4 border border-shark-800 bg-shark"></div>
        </div>
    );
};

export default CardSlider;
