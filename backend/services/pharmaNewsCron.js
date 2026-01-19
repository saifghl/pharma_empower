

const cron = require("node-cron");
const axios = require("axios");
const pool = require("../config/db");

const TITLE_KEYWORDS = [
  // Core pharma terms (unchanged)
  "pharma",
  "pharmaceutical",
  "pharmaceutical industry",
  "pharmacy",
  "pharmacist",
  "pharmacology",
  // Drug development & research
  "drug development",
  "drug discovery",
  "medicine",
  "medication",
  "clinical",
  "clinical research",
  "clinical trial",
  "research",
  "R&D",
  "pharmaceutical research",
  // Regulatory & approvals
  "fda",
  "FDA approval",
  "regulatory",
  "regulatory affairs",
  "drug approval",
  "indication",
  "NDA",
  "BLA",
  // Biotechnology
  "biotech",
  "biotechnology",
  "biologics",
  "biosimilars",
  // Manufacturing & production
  "pharmaceutical manufacturing",
  "drug manufacturing",
  "formulation",
  "GMP",
  "quality control",
  "production",
  // Therapeutic areas
  "therapy",
  "therapeutic",
  "oncology",
  "cancer treatment",
  "vaccine",
  "vaccination",
  "immun",
  "antibiotic",
  "antiviral",
  // Scientific terms
  "molecule",
  "compound",
  "API",
  "active pharmaceutical ingredient",
  "patent",
  "medicinal chemistry",
  "pharmacokinetics",
  "pharmacodynamics",
  // Industry development
  "development",
  "discovery",
  "innovation",
  "pharmaceutical innovation",
  // Job market terms
  "pharma jobs",
  "pharmaceutical jobs",
  "pharmacy jobs",
  "pharma careers",
  "pharmaceutical careers",
  "clinical research jobs",
  "regulatory affairs jobs",
  "pharma hiring",
  "pharmaceutical industry jobs",
];

const PHARMA_DOMAINS = [
  "pharmatimes.com",
  "pharmaceutical-technology.com",
  "fiercepharma.com",
  "pharmafile.com",
  "biospace.com",
  "genengnews.com",
  "statnews.com",
  "pharmalive.com",
  "pharmexec.com",
  "outcomeresearch.com",
  "pharmaceutical-journal.com",
];
// Reduced to 3 broader queries to avoid rate limits (combines multiple topics)
const searchQueries = [
  "pharmaceutical industry OR pharma news OR drug development OR clinical trials OR FDA approval",
  "pharma jobs OR careers OR hiring OR biotechnology OR manufacturing OR innovation",
  "pharmacy OR regulatory OR biotech OR pharmaceutical research OR R&D",
];


const fetchPharmaNews = async () => {
  try {
    // 🧹 Clear old data
    await pool.execute("TRUNCATE TABLE pharma_news");

    const allArticles = [];
    const seenUrls = new Set();

    // Calculate date from 7 days ago for recent news
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 7);
    const dateFromStr = dateFrom.toISOString().split("T")[0];

    // Helper function to assign category based on title/description
    const getCategory = (title, description) => {
      const text = `${title || ''} ${description || ''}`.toLowerCase();
      if (text.includes('job') || text.includes('career') || text.includes('hiring') || text.includes('employment')) return 'career';
      if (text.includes('regulatory') || text.includes('fda') || text.includes('approval') || text.includes('nda') || text.includes('bla')) return 'regulatory';
      if (text.includes('healthcare') || text.includes('medical') || text.includes('therapy') || text.includes('treatment')) return 'healthcare';
      return 'industry'; // Default category
    };

    // Helper function for retries on 429
    const fetchWithRetry = async (url, params, retries = 2) => {
      for (let i = 0; i <= retries; i++) {
        try {
          const res = await axios.get(url, { params });
          return res;
        } catch (error) {
          if (error.response?.status === 429 && i < retries) {
            console.log(`429 hit, retrying in 5 seconds... (attempt ${i + 1})`);
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds on 429
          } else {
            throw error;
          }
        }
      }
    };

    // Fetch articles with reduced queries (with 2-second delays)
    for (const query of searchQueries) {
      try {
        const res = await fetchWithRetry("https://newsapi.org/v2/everything", {
          q: query,
          language: "en",
          sortBy: "publishedAt",
          pageSize: 100,
          from: dateFromStr,
          apiKey: process.env.NEWS_API_KEY,
        });

        if (res.data.articles) {
          res.data.articles.forEach((article) => {
            if (article.url && !seenUrls.has(article.url)) {
              seenUrls.add(article.url);
              article.category = getCategory(article.title, article.description);
              allArticles.push(article);
            }
          });
        }
      } catch (queryError) {
        console.error(`Error fetching query "${query}":`, queryError.message);
      }
      // Delay 2 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Fetch from domains (with retry and delay)
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
      const res = await fetchWithRetry("https://newsapi.org/v2/everything", {
        domains: PHARMA_DOMAINS.join(","),
        language: "en",
        sortBy: "publishedAt",
        pageSize: 100,
        from: dateFromStr,
        apiKey: process.env.NEWS_API_KEY,
      });

      if (res.data.articles) {
        res.data.articles.forEach((article) => {
          if (article.url && !seenUrls.has(article.url)) {
            seenUrls.add(article.url);
            article.category = getCategory(article.title, article.description);
            allArticles.push(article);
          }
        });
      }
    } catch (domainError) {
      console.error("Error fetching from domains:", domainError.message);
    }

    console.log(`📰 Total articles fetched: ${allArticles.length}`);

    // If no articles fetched (due to 429 or other errors), insert dummy data
    if (allArticles.length === 0) {
      console.log("⚠️ No articles fetched from NewsAPI. Inserting dummy pharma news for testing...");
      const dummyArticles = [
        {
          title: "New Drug Approval Boosts Pharma Industry Growth",
          description: "The FDA has approved a groundbreaking cancer treatment, signaling strong industry development.",
          image_url: "https://example.com/image1.jpg",
          url: "https://example.com/article1",
          published_at: new Date(),
          category: "regulatory",
          source: "Pharma Times",
          author: "John Doe",
        },
        {
          title: "Pharma Jobs on the Rise: 10,000 New Positions Open",
          description: "With biotech advancements, pharmaceutical careers are booming in clinical research.",
          image_url: "https://example.com/image2.jpg",
          url: "https://example.com/article2",
          published_at: new Date(),
          category: "career",
          source: "BioSpace",
          author: "Jane Smith",
        },
        {
          title: "Innovations in Drug Manufacturing Technology",
          description: "Latest GMP-compliant production methods are revolutionizing pharma manufacturing.",
          image_url: "https://example.com/image3.jpg",
          url: "https://example.com/article3",
          published_at: new Date(),
          category: "industry",
          source: "Pharma Tech",
          author: "Alex Johnson",
        },
        {
          title: "Healthcare Partnerships Drive Vaccine Development",
          description: "Collaborations between pharma and healthcare providers accelerate immunization efforts.",
          image_url: "https://example.com/image4.jpg",
          url: "https://example.com/article4",
          published_at: new Date(),
          category: "healthcare",
          source: "Stat News",
          author: "Emily Davis",
        },
        {
          title: "Regulatory Changes Impact Biotech Startups",
          description: "New NDA guidelines are reshaping the landscape for pharmaceutical biotechnology.",
          image_url: "https://example.com/image5.jpg",
          url: "https://example.com/article5",
          published_at: new Date(),
          category: "regulatory",
          source: "Fierce Pharma",
          author: "Mike Wilson",
        },
        // Add more dummies as needed (up to 10 for variety)
        {
          title: "Pharma Career Opportunities in R&D",
          description: "Explore job growth in pharmaceutical research and development sectors.",
          image_url: "https://example.com/image6.jpg",
          url: "https://example.com/article6",
          published_at: new Date(),
          category: "career",
          source: "Pharma Exec",
          author: "Sara Lee",
        },
        {
          title: "Breakthrough in Oncology Therapy",
          description: "New therapeutic approaches promise better cancer treatment outcomes.",
          image_url: "https://example.com/image7.jpg",
          url: "https://example.com/article7",
          published_at: new Date(),
          category: "healthcare",
          source: "Gen Eng News",
          author: "Tom Brown",
        },
        {
          title: "Pharma Industry Trends: Focus on Innovation",
          description: "Patents and discoveries are driving the next wave of pharmaceutical breakthroughs.",
          image_url: "https://example.com/image8.jpg",
          url: "https://example.com/article8",
          published_at: new Date(),
          category: "industry",
          source: "Pharma File",
          author: "Lisa Green",
        },
        {
          title: "Clinical Trials Expand Globally",
          description: "International regulatory approvals are opening doors for diverse pharma studies.",
          image_url: "https://example.com/image9.jpg",
          url: "https://example.com/article9",
          published_at: new Date(),
          category: "regulatory",
          source: "Outcom Research",
          author: "David White",
        },
        {
          title: "Biotech Hiring Surge in Manufacturing",
          description: "Job market heats up with demand for skilled pharma production professionals.",
          image_url: "https://example.com/image10.jpg",
          url: "https://example.com/article10",
          published_at: new Date(),
          category: "career",
          source: "Pharma Journal",
          author: "Anna Black",
        },
      ];

      // Insert dummies into DB
      for (const article of dummyArticles) {
        try {
          await pool.execute(
            `INSERT INTO pharma_news
             (title, description, image_url, url, published_at, category, source, author, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              article.title,
              article.description,
              article.image_url,
              article.url,
              article.published_at,
              article.category,
              article.source,
              article.author,
              new Date(),
            ]
          );
        } catch (insertError) {
          console.error("Error inserting dummy article:", insertError.message);
        }
      }

      console.log(`✅ Inserted ${dummyArticles.length} dummy pharma articles for testing.`);
    } else {
      // Proceed with filtering and storing real articles (unchanged logic)
      const filteredArticles = allArticles.filter((article) => {
        if (!article.title && !article.description) return false;

        const title = (article.title || "").toLowerCase();
        const description = (article.description || "").toLowerCase();
        const combinedText = `${title} ${description}`;

        const hasPharmaKeyword = TITLE_KEYWORDS.some((keyword) =>
          combinedText.includes(keyword.toLowerCase())
        );

        const excludeKeywords = [
          "sports",
          "entertainment",
          "celebrity",
          "movie",
          "music",
          "gaming",
          "crypto",
          "bitcoin",
          "sports betting",
        ];
        const hasExcludeKeyword = excludeKeywords.some(
          (keyword) =>
            combinedText.includes(keyword) &&
            !combinedText.includes("pharma") &&
            !combinedText.includes("pharmaceutical")
        );

        return hasPharmaKeyword && !hasExcludeKeyword;
      });

      filteredArticles.sort((a, b) => {
        const dateA = new Date(a.publishedAt || 0);
        const dateB = new Date(b.publishedAt || 0);
        return dateB - dateA;
      });

      const finalArticles = filteredArticles.slice(0, 50);

      console.log(`📰 Filtered pharma articles: ${filteredArticles.length}`);
      console.log(`📰 Final pharma articles to store: ${finalArticles.length}`);

      // Store real articles
      for (const article of finalArticles) {
        try {
          await pool.execute(
            `INSERT INTO pharma_news
             (title, description, image_url, url, published_at, category, source, author, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              article.title || "No title",
              article.description || "",
              article.urlToImage || null,
              article.url || "",
              article.publishedAt ? new Date(article.publishedAt) : new Date(),
              article.category || 'industry',
              article.source?.name || null,
              article.author || null,
              new Date(),
            ]
          );
        } catch (insertError) {
          console.error("Error inserting article:", insertError.message);
        }
      }

      console.log(
        `✅ ${finalArticles.length} pharmaceutical industry news & job market articles stored`
      );
    }
  } catch (error) {
    console.error("❌ News cron failed:", error.message);
  }
};

cron.schedule("0 */8 * * *", fetchPharmaNews);
fetchPharmaNews(); // Initial run

module.exports = fetchPharmaNews;