import getMyths from "../../lib/codex/Mythologies";

const AboutCodex = async () => {
    const mythologies = await getMyths();
    return (
        <section id="codex" className="scroll-mt-[100rem]">
            {!mythologies && <div>No myth</div>}
            {mythologies &&
                mythologies?.length > 0 &&
                mythologies?.map((myth) => <div key={myth._id}>{myth.name}</div>)}
        </section>
    );
};

export default AboutCodex;
