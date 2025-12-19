import Navbar from './components/navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  // Generate DNA rings
  const dnaRings = Array.from({ length: 20 }).map((_, i) => (
    <div
      key={i}
      className="nucleotide"
      style={{
        top: `${i * 20}px`,
        transform: `rotateY(${i * 30}deg)`
      }}
    />
  ));

  return (
    <div className="App">
      <Navbar />

      {/* Hero Section */}
      <header className="hero-section">
        <h1 className="animated-text">Pharma Empower Solutions</h1>
        <div className="hero-subtitle-container">
          <span className="animated-text">Empowering People lives………….</span>
        </div>
      </header>

      {/* Introduction Section */}
      <section className="intro-section" id="about">
        <p className="intro-text">
          Pharma Empower Solutions offers wide range of solutions for pharmaceutical, biotechnology and allied life science areas with an aim of nurturing professionals to became leader in challenging global environment. Our custom solutions for your business needs enable you to emerge as competent leader in highly changing global environment.
        </p>
      </section>

      {/* Career Section */}
      <section className="career-section">
        <div className="career-grid">
          <div className="career-content">
            <h2 className="section-heading">Upscale Your Pharma Career. Stay Ahead of the Curve.</h2>
            <p>
              The pharmaceutical landscape is evolving at unprecedented speed. To lead in this industry—from R&D and QA/QC to Regulatory and Commercial—requires more than experience. It demands continuous, targeted upskilling.
            </p>
            <br />
            <p>
              Pharma Empower is the dedicated platform built by industry veterans to fuel your professional ascent and ensure you are compliant with the latest global standards:
            </p>
            <div className="standards-list">
              {['USFDA', 'EMA', 'ANVISA', 'sFDA', 'NMDA', 'TGA', 'DCGI'].map(std => (
                <span key={std} className="standard-badge">{std}</span>
              ))}
            </div>
          </div>
          <div className="career-image-placeholder">
            {/* Ideally an image here, but we'll use a styled card representation or just text balance for now per request focus on text/dna */}
          </div>
        </div>
      </section>

      {/* Pathways Section */}
      <section className="pathways-section">
        <h2 className="section-heading" style={{ textAlign: 'center' }}>Explore Our Unique Innovative Differentiated Pathways</h2>
        <div className="pathways-container">
          <ul className="pathways-list">
            <li>
              <strong>Master Next-Gen Skills:</strong>
              Specialized, GxP-compliant training in Pharma 4.0, AI in Drug Discovery, and Advanced Regulatory Affairs.
            </li>
            <li>
              <strong>Unlock Exclusive Insights:</strong>
              Get real-time, curated industry news, regulatory alerts, and market analysis driven by AI.
            </li>
            <li>
              <strong>Connect & Consult:</strong>
              Gain direct access to career mentors, and consultation services for operational efficiency.
            </li>
            <li>
              <strong>New Pillar: Operational Excellence:</strong>
              Engage our network of veteran Project Managers and Subject Matter Experts (SMEs) for targeted short-term projects and regulatory remediation.
            </li>
          </ul>

          <div className="dna-graphics">
            <div className="dna-container">
              <div className="dna-strand">
                {dnaRings}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
