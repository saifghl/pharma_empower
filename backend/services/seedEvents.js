const pool = require('../config/db');
require('dotenv').config({ path: '../.env' }); // Load env vars from parent directory if needed, or rely on default loading

const events = [
    {
        name: "BioAsia 2025",
        date: "Feb 24-26, 2025",
        venue: "Hyderabad, India (HICC)",
        category: "Conference & Connect",
        last_date_reg: "On-Spot available (Early bird likely closed)",
        reg_link: "bioasia.in/reg"
    },
    {
        name: "CPHI Japan 2025",
        date: "Apr 9-11, 2025",
        venue: "Tokyo, Japan",
        category: "Exhibition",
        last_date_reg: "Mar 2025 (Online usually closes 1 week prior)",
        reg_link: "cphi.com/japan"
    },
    {
        name: "CPHI North America",
        date: "May 20-22, 2025",
        venue: "Philadelphia, USA",
        category: "Exhibition & Conf.",
        last_date_reg: "May 20, 2025 (Open until event)",
        reg_link: "cphi.com/northamerica"
    },
    {
        name: "BIO International Convention",
        date: "Jun 16-19, 2025",
        venue: "Boston, USA",
        category: "Connect & Conf.",
        last_date_reg: "Apr 2025 (Early bird); Open till event",
        reg_link: "bio.org/events"
    },
    {
        name: "CPHI China",
        date: "Jun 24-26, 2025",
        venue: "Shanghai, China",
        category: "Exhibition",
        last_date_reg: "Jun 20, 2025 (Visa invites needed early)",
        reg_link: "cphi.com/china"
    },
    {
        name: "PharmaTech Expo (Gandhinagar)",
        date: "Aug 5-7, 2025",
        venue: "Gandhinagar, India",
        category: "Exhibition",
        last_date_reg: "Aug 5, 2025 (On-site available)",
        reg_link: "pharmatechexpo.com"
    },
    {
        name: "CPHI Korea",
        date: "Aug 27-29, 2025",
        venue: "Seoul, South Korea",
        category: "Exhibition",
        last_date_reg: "Aug 2025",
        reg_link: "cphi.com/korea"
    },
    {
        name: "CPHI Worldwide (Frankfurt)",
        date: "Oct 28-30, 2025",
        venue: "Frankfurt, Germany",
        category: "Exhibition (Global)",
        last_date_reg: "Oct 27, 2025 (Free pass often ends Sept)",
        reg_link: "cphi.com/europe"
    },
    {
        name: "CPHI & PMEC India",
        date: "Nov 26-28, 2025",
        venue: "Greater Noida (Delhi NCR)",
        category: "Exhibition",
        last_date_reg: "Nov 25, 2025 (Online reg mandatory for free entry)",
        reg_link: "cphi.com/india"
    },
    {
        name: "74th Indian Pharma Congress (IPC)",
        date: "Dec 19-21, 2025",
        venue: "Bengaluru, India (BIEC)",
        category: "Conference",
        last_date_reg: "Nov 18, 2025 (Paper submission deadline)",
        reg_link: "scientificipca.org"
    },
    {
        name: "Medical Fair India 2026",
        date: "Jan 29-31, 2026",
        venue: "New Delhi, India",
        category: "Exhibition",
        last_date_reg: "Jan 29, 2026",
        reg_link: "medicalfair-india.com"
    },
    {
        name: "Arab Health 2026",
        date: "Feb 9-12, 2026",
        venue: "Dubai, UAE",
        category: "Exhibition",
        last_date_reg: "Jan 2026 (Free reg closes early)",
        reg_link: "arabhealth.com"
    },
    {
        name: "PharmaTech Expo (Chandigarh)",
        date: "Apr 9-11, 2026",
        venue: "Chandigarh, India",
        category: "Exhibition",
        last_date_reg: "Apr 9, 2026",
        reg_link: "pharmatechexpo.com"
    }
];

const seedEvents = async () => {
    try {
        console.log("Seeding events...");

        // Optional: clear existing events first
        // await pool.query('TRUNCATE TABLE events'); 

        for (const event of events) {
            await pool.query(
                `INSERT INTO events (name, date, venue, category, last_date_reg, reg_link) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [event.name, event.date, event.venue, event.category, event.last_date_reg, event.reg_link]
            );
        }
        console.log("Events seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding events:", error);
        process.exit(1);
    }
};

seedEvents();
