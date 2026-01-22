

const pool = require("../config/db");

exports.getPharmaNews = async (req, res) => {
  console.log("📰 getPharmaNews controller is running");

  try {
    const [rows] = await pool.execute(
      `
      SELECT 
        id,
        title,
        description,
        image_url,
        url,
        published_at,
        category  -- Added category for frontend filtering
      FROM pharma_news
      ORDER BY published_at DESC
      LIMIT 50
      `
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("❌ Failed to fetch pharma news:", error.message);
    res.status(500).json({
      message: "Failed to fetch pharma news",
    });
  }
};