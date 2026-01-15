import React from 'react';
import TechDetail from './TechDetail';

const Devices = () => {
    const data = {
        title: "Smart Devices",
        subtitle: "Connected health solutions for real-time patient monitoring.",
        description: "Smart medical devices enable continuous health monitoring, ensuring timely interventions and better patient compliance through the Internet of Medical Things (IoMT).",
        heroColor: "linear-gradient(135deg, #E76F51 0%, #2A9D8F 100%)",
        stats: [
            { value: "24/7", label: "Patient Monitoring" },
            { value: "40%", label: "Reduction in ER Visits" },
            { value: "IoMT", label: "Connected Ecosystem" }
        ],
        tabs: [
            {
                label: "Wearables",
                title: "Wearable Technology",
                content: "From smartwatches monitoring heart rates to patches measuring glucose levels, wearables provide continuous data streams that allow doctors to catch anomalies before they become critical."
            },
            {
                label: "Smart Pills",
                title: "Ingestible Sensors",
                content: "Digital pills with ingestible sensors can track medication adherence and monitor internal vitals, sending real-time data to a patient's smartphone app."
            },
            {
                label: "Connectivity",
                title: "The IoMT Network",
                content: "The Internet of Medical Things (IoMT) connects patients, devices, and providers, creating a seamless flow of health data that powers predictive analytics and preventive care."
            }
        ]
    };

    return <TechDetail {...data} />;
};

export default Devices;
