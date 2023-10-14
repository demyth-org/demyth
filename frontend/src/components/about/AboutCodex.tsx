import getMyths from "../../lib/codex/Mythologies";

const AboutCodex = async () => {
    const mythologies = await getMyths();
    return <section id="codex" className="scroll-mt-[100rem]"></section>;
};

export default AboutCodex;
