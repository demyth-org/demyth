import Link from "next/link";
import Image from "next/image";
import logo from "../../public/demyth_crop.gif";

const Home = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="min-h-screen min-w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black from-15% via-slate-950  to-slate-800 to-65%">
                <div className="relative">
                    <Link href="/about">
                        <Image src={logo} alt="DEMYTH" className="block mx-auto" />
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Home;
