import React from 'react';
import TechDetail from './TechDetail';

const PersonalizedMedicine = () => {
    const data = {
        title: "Personalized Med",
        subtitle: "Treating the individual, not just the disease.",
        description: "Personalized medicine, or precision medicine, tailors medical decisions, practices, and products to the individual patient based on their predicted response or risk of disease.",
        heroColor: "linear-gradient(135deg, #F72585 0%, #7209B7 100%)",
        stats: [
            { value: "40%", label: "Growth in Biologics" },
            { value: "1:1", label: "Patient Centricity" },
            { value: "Genomic", label: "Data Integration" }
        ],
        tabs: [
            {
                label: "Genomics",
                title: "Genomic Profiling",
                content: "By analyzing a patient's genetic makeup, doctors can identify specific mutations driving a disease (like cancer) and select therapies that target those specific molecular drivers."
            },
            {
                label: "Data & AI",
                title: "Predictive Analytics",
                content: "AI algorithms analyze vast datasets of clinical records, lifestyle data, and genetics to predict which patients will respond best to which treatments, minimizing trial and error."
            },
            {
                label: "Impact",
                title: "Patient Outcomes",
                content: "Precision medicine reduces adverse drug reactions, improves survival rates for complex diseases, and eliminates the 'one-size-fits-all' inefficiency of traditional healthcare."
            }
        ]
    };

    return <TechDetail {...data} />;
};

export default PersonalizedMedicine;
