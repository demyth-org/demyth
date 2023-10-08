import Link from "next/link";
import Image from "next/image";
import logo from "../../public/demyth_crop.gif";

const Home = () => {
    return (
        <main className="flex flex-col relative items-center justify-center min-h-screen">
            <div className="min-h-screen min-w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black from-25% to-shark">
                <div className="relative">
                    <Link href="/about">
                        <Image src={logo} alt="DEMYTH" className="block mx-auto scale-90" />
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Home;
