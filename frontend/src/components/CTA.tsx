import React from "react";

const CTA = () => {
    return (
        <section className="mb-32">
            <div className="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] bg-[url('https://mdbcdn.b-cdn.net/img/new/slides/006.webp')] h-[400px]">
                <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-slate-950 bg-fixed">
                    <div className="flex h-full items-center justify-center">
                        <div className="px-6 text-center text-slate-50 md:px-12">
                            <h2 className="mb-12 text-5xl font-bold leading-tight tracking-tight">
                                Are you ready <br />
                                <span>for an adventure</span>
                            </h2>
                            <button
                                type="button"
                                className="rounded border-2 border-slate-50 px-12 py-4 text-sm font-semibold uppercase leading-normal text-slate-50 transition duration-150 ease-in-out hover:border-slate-100 hover:bg-slate-100 hover:bg-opacity-10 hover:text-slate-100 focus:border-slate-100 focus:text-slate-100 focus:outline-none focus:ring-0 active:border-slate-200 active:text-slate-200"
                            >
                                Get started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
