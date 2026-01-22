import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import homeHeroImg from "../images/home_hero.png";
import { cmsAPI } from "../services/api"; // ✅ ADD

export default function Home() {

    const [homeContent, setHomeContent] = React.useState({
        hero: {
            title: 'The one-stop open platform for the pharma & healthcare community',
            subtitle: 'Empowering all for better tomorrow… Beyond Boundaries',
            ctaText: 'Get Started',
            bgImage: homeHeroImg
        },
        highlights: []
    });

    useEffect(() => {

        /* ======================
           CMS LOAD (BACKEND)
        ====================== */
        cmsAPI.getPage('home')
            .then(res => {
                const hero = res.data.hero || {};

                setHomeContent(prev => ({
                    ...prev,
                    hero: {
                        ...prev.hero,
                        title: hero.title || prev.hero.title,
                        subtitle: hero.subtitle || prev.hero.subtitle,
                        ctaText: hero.ctaText || prev.hero.ctaText,
                        bgImage:
                            hero.bgImage && hero.bgImage.startsWith('http')
                                ? hero.bgImage
                                : homeHeroImg
                    },
                    highlights: res.data.highlights || []
                }));
            })
            .catch(() => {
                console.warn('Home CMS not found, using default content');
            });

        /* ======================
           SCROLL ANIMATION
        ====================== */
        const cards = document.querySelectorAll(".infographic-card");

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("card-visible");
                    }
                });
            },
            { threshold: 0.2 }
        );

        cards.forEach(card => observer.observe(card));

        return () => cards.forEach(card => observer.unobserve(card));

    }, []);

    return (
        <div>

            {/* HERO */}
            <section className="hero-section">
                <div className="home-hero-card fade-in-up">
                    <div className="home-text-content">
                        <h1 className="hero-brand-title">
                            {homeContent.hero.title}
                        </h1>

                        <p className="hero-tagline">
                            <span className="highlight">•</span>
                            {homeContent.hero.subtitle}
                            <span className="highlight">•</span>
                        </p>

                        <div className="hero-decoration-line" />
                    </div>

                    <div className="home-image-content">
                        <img
                            src={homeContent.hero.bgImage}
                            alt="Pharma Global Connection"
                            className="home-hero-img"
                        />
                    </div>
                </div>
            </section>

            {/* MARQUEE */}
            <div className="marquee-section">
                <div className="marquee-container-relative">
                    <div className="marquee-text">
                        Empower Professionals with open Access &nbsp; • &nbsp;
                        “The one-stop open platform for the pharma & healthcare community” &nbsp; • &nbsp;
                        “Empowering all for better tomorrow….Beyond Boundaries"
                    </div>
                </div>
            </div>

            {/* BRAND STATEMENT */}
            <section className="intro-section">
                <p className="intro-text">
                    Pharma Empower Solutions offers a wide range of solutions for
                    pharmaceutical, biotechnology and allied life science areas — nurturing
                    professionals to become future-ready leaders in the rapidly evolving
                    global healthcare ecosystem.
                </p>
            </section>

            {/* PATHWAYS */}
            <section className="pathways-section">
                <div className="pathways-container">

                    <h2 className="section-heading">Explore Our Empower Pathways</h2>

                    <p className="intro-text" style={{ marginBottom: "30px" }}>
                        Purpose-driven learning, open access to knowledge and community
                        collaboration designed for the pharma & healthcare community.
                    </p>

                    {/* 🔥 REST OF JSX UNCHANGED */}
                    <div className="infographic-grid">

                        {/* ABOUT */}
                        <Link to="/about" className="infographic-card fade-card">
                            <div className="card-icon-circle">
                                <svg width="28" height="28" stroke="#0a2d52" fill="none" strokeWidth="2">
                                    <circle cx="14" cy="14" r="12" />
                                    <polygon points="14,6 18,14 14,22 10,14" />
                                </svg>
                            </div>

                            <h3 className="card-title">About Us</h3>
                            <p className="card-punchline">
                                Empowering people through open knowledge
                            </p>
                        </Link>


                        {/* INTELLIGENCE */}
                        <Link to="/intelligence-hub/news" className="infographic-card fade-card">
                            <div className="card-icon-circle">
                                <svg width="28" height="28" stroke="#0a2d52" fill="none" strokeWidth="2">
                                    <circle cx="14" cy="14" r="4" />
                                    <path d="M4 14h4M20 14h4M14 4v4M14 20v4" />
                                    <circle cx="14" cy="14" r="9" />
                                </svg>
                            </div>

                            <h3 className="card-title">Pharma Intelligence Hub (News)</h3>
                            <p className="card-punchline">
                                One stop source for pharma and medical insights & news
                            </p>
                        </Link>


                        {/* TECH */}
                        <Link to="/empower/ai" className="infographic-card fade-card">
                            <div className="card-icon-circle">
                                <svg width="28" height="28" stroke="#0a2d52" fill="none" strokeWidth="2">
                                    <rect x="6" y="6" width="16" height="16" rx="2" />
                                    <circle cx="14" cy="14" r="3" />
                                </svg>
                            </div>

                            <h3 className="card-title">Empower Tech & AI</h3>
                            <p className="card-punchline">
                                Track innovation shaping the future of healthcare
                            </p>
                        </Link>


                        {/* ACADEMY */}
                        <Link to="/academy" className="infographic-card fade-card">
                            <div className="card-icon-circle">
                                <svg width="28" height="28" stroke="#0a2d52" fill="none" strokeWidth="2">
                                    <path d="M3 10l11-5 11 5-11 5-11-5z" />
                                    <path d="M5 12v5l9 4 9-4v-5" />
                                </svg>
                            </div>

                            <h3 className="card-title">Pharma Empower Academy</h3>
                            <p className="card-punchline">
                                Structured upskilling for sustainable pharma careers
                            </p>
                        </Link>


                        {/* EXCHANGE */}
                        <Link to="/network" className="infographic-card fade-card">
                            <div className="card-icon-circle">
                                <svg width="28" height="28" stroke="#0a2d52" fill="none" strokeWidth="2">
                                    <circle cx="6" cy="12" r="3" />
                                    <circle cx="14" cy="6" r="3" />
                                    <circle cx="22" cy="12" r="3" />
                                    <path d="M9 12h5M17 12h3" />
                                </svg>
                            </div>

                            <h3 className="card-title">Professional Exchange</h3>
                            <p className="card-punchline">
                                Conversations • Events • Knowledge Sharing
                            </p>
                        </Link>


                        {/* SKILL BOARD */}
                        <Link to="/skill-board" className="infographic-card fade-card">
                            <div className="card-icon-circle">
                                <svg width="28" height="28" stroke="#0a2d52" fill="none" strokeWidth="2">
                                    <circle cx="14" cy="10" r="4" />
                                    <path d="M6 22c2-4 12-4 14 0" />
                                </svg>
                            </div>

                            <h3 className="card-title">Skill Board</h3>
                            <p className="card-punchline">
                                Contribute expertise. Build credibility. Grow together
                            </p>
                        </Link>


                        {/* LOGIN */}
                        <Link to="/login" className="infographic-card fade-card">
                            <div className="card-icon-circle">
                                <svg width="28" height="28" stroke="#0a2d52" fill="none" strokeWidth="2">
                                    <rect x="6" y="4" width="16" height="20" rx="2" />
                                    <path d="M12 14h8M16 10l4 4-4 4" />
                                </svg>
                            </div>

                            <h3 className="card-title">Login / Register</h3>
                            <p className="card-punchline">
                                Free access for all. No denial
                            </p>
                        </Link>


                        {/* CONTACT */}
                        <Link to="/contact" className="infographic-card fade-card">
                            <div className="card-icon-circle">
                                <svg width="28" height="28" stroke="#0a2d52" fill="none" strokeWidth="2">
                                    <rect x="3" y="6" width="22" height="16" rx="2" />
                                    <path d="M3 8l11 7 11-7" />
                                </svg>
                            </div>

                            <h3 className="card-title">Contact Us</h3>
                            <p className="card-punchline">
                                Connect, collaborate, and build together <br />
                                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>Info@pharmaempower.com</span>
                            </p>
                        </Link>

                    </div>
                </div>

            </section>

        </div>
    );
}

