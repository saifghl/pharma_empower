import React from 'react';
import TechDetail from './TechDetail';

const Peptides = () => {
    const data = {
        title: "Peptides",
        subtitle: "Targeted therapies unlocking new treatment possibilities.",
        description: "Peptide therapeutics are a unique class of pharmaceutical agents that occupy a distinct space between small molecules and biologics. They offer high selectivity and efficacy with lower toxicity.",
        heroColor: "linear-gradient(135deg, #2A9D8F 0%, #264653 100%)",
        stats: [
            { value: "80+", label: "Peptide Drugs Approved" },
            { value: "$50B", label: "Market Size by 2028" },
            { value: "High", label: "Selectivity Profile" }
        ],
        tabs: [
            {
                label: "Mechanism",
                title: "How Peptides Work",
                content: "Peptides bind to cell surface receptors with high specificity, triggering intracellular signaling pathways. Their small size allows them to penetrate tissues effectively while maintaining the potency of larger biologics."
            },
            {
                label: "Applications",
                title: "Therapeutic Areas",
                content: "Peptides are revolutionizing treatments in metabolic diseases (like diabetes and obesity), oncology, and infectious diseases. GLP-1 agonists are a prime example of peptide innovation."
            },
            {
                label: "Future",
                title: "Next-Gen Peptides",
                content: "Advancements in peptide synthesis and delivery systems (like oral formulations) are overcoming stability challenges, making peptide drugs more accessible and effective than ever."
            }
        ]
    };

    return <TechDetail {...data} />;
};

export default Peptides;
