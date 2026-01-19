import React from 'react';
import TechDetail from './TechDetail';

const Mrna = () => {
    const data = {
        title: "mRNA Tech",
        subtitle: "Rapid response platforms for vaccines and therapeutics.",
        description: "Messenger RNA (mRNA) technology instructs cells to produce proteins that can prevent, treat, or cure diseases. Its speed and flexibility have transformed vaccine development.",
        heroColor: "linear-gradient(135deg, #7209B7 0%, #3A0CA3 100%)",
        stats: [
            { value: "95%", label: "Vaccine Efficacy" },
            { value: "Weeks", label: "Dev Timeline vs Years" },
            { value: "100+", label: "Target Diseases" }
        ],
        tabs: [
            {
                label: "Platform",
                title: "The mRNA Platform",
                content: "Unlike traditional vaccines that use weakened viruses, mRNA vaccines use a synthetic code to teach our cells how to make a protein that triggers an immune response. This platform is safer and faster to manufacture."
            },
            {
                label: "Beyond Vaccines",
                title: "Therapeutic Applications",
                content: "mRNA is now being explored for cancer immunotherapies, protein replacement therapies for rare genetic diseases, and regenerative medicine."
            },
            {
                label: "Manufacturing",
                title: "Scalable Production",
                content: "mRNA production is cell-free and highly scalable, allowing for rapid global deployment during pandemics and localized manufacturing for personalized treatments."
            }
        ]
    };

    return <TechDetail {...data} />;
};

export default Mrna;
