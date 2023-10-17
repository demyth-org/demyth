import getMyths from "../../lib/codex/Mythologies";
import CardSlider from "../CardSlider";

const AboutCodex = async () => {
    const mythologies = await getMyths();
    return (
        <section
            id="codex"
            className="widescreen:section-min-height tallscreen:section-min-height relative flex w-full scroll-mt-24 flex-col items-center justify-start border-2 border-orange-400 pt-4"
        >
            <CardSlider n={3} />
            {!mythologies && <div>No myth</div>}
            {mythologies && (
                <div className="flex w-full flex-row items-start justify-start gap-4 overflow-x-hidden border border-violet-300">
                    {mythologies?.length > 0 &&
                        mythologies?.map((myth) => (
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
                                            <li
                                                key={effect._id}
                                                className="flex flex-row items-start justify-between gap-2 p-2 text-start"
                                            >
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
                        ))}
                </div>
            )}
        </section>
    );
};

export default AboutCodex;
