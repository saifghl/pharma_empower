import { useEffect, useState } from "react";
import { newsAPI } from "../../services/api";
import "./news.css";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const res = await newsAPI.getNews();
      setNews(res.data);
    } catch (error) {
      console.error("Failed to load news", error);
    } finally {
      setLoading(false);
    }
  };

  // Frontend filter logic (now works since category is set in DB)
  const filteredNews =
    filter === "all"
      ? news
      : news.filter((item) => item.category === filter);

  return (
    <div className="news-page">
      {/* Header */}
      <div className="news-header">
        <h1>Pharma Intelligence Hub</h1>
        <p className="tagline-animate">Your single source for verified pharma and medical insights</p>
      </div>

      {/* Category Filter Buttons */}
      <div className="filter-bar">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("industry")}
          className={filter === "industry" ? "active" : ""}
        >
          Industry News
        </button>
        <button
          onClick={() => setFilter("healthcare")}
          className={filter === "healthcare" ? "active" : ""}
        >
          Healthcare
        </button>
        <button
          onClick={() => setFilter("regulatory")}
          className={filter === "regulatory" ? "active" : ""}
        >
          Regulatory News
        </button>
        <button
          onClick={() => setFilter("career")}
          className={filter === "career" ? "active" : ""}
        >
          Career News
        </button>
      </div>

      {/* Loading State */}
      {loading && <p className="loading-text">Loading latest news...</p>}

      {/* Empty State */}
      {!loading && filteredNews.length === 0 && (
        <p className="empty-text">No news available</p>
      )}

      {/* News Grid */}
      <div className="news-grid">
        {filteredNews.map((item) => (
          <div className="news-card" key={item.id}>
            {item.image_url ? (
              <img src={item.image_url} alt="news" />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <div className="news-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="read-more"
              >
                Read full article →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
