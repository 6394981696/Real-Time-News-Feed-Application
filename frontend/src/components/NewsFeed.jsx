import React, { useState, useEffect } from "react";

const NewsFeed = () => {
  const [category, setCategory] = useState("Tech");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/news?category=${category}`);
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error(error);
        setNews([{ title: "⚠️ Failed to load news. Try again later." }]);
      }
      setLoading(false);
    };

    fetchNews();
  }, [category]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📰 Real-Time News Feed</h2>
        <div style={styles.buttonContainer}>
          <button onClick={() => setCategory("Tech")} style={styles.techButton}>Tech</button>
          <button onClick={() => setCategory("Business")} style={styles.businessButton}>Business</button>
          <button onClick={() => setCategory("Sports")} style={styles.sportsButton}>Sports</button>
        </div>
        {loading ? (
          <p style={styles.loadingText}>Fetching latest news...</p>
        ) : (
          news.map((item, index) => <p key={index} style={styles.newsItem}>{item.title}</p>)
        )}
      </div>
    </div>
  );
};

// 🎨 CSS Styles in JS
const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    width: "350px",
    textAlign: "center",
    color: "white",
  },
  heading: {
    fontSize: "22px",
    marginBottom: "20px",
  },
  buttonContainer: {
    marginBottom: "20px",
  },
  techButton: {
    marginRight: "10px",
    padding: "10px 15px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  businessButton: {
    padding: "10px 15px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  sportsButton: {
    marginLeft: "10px",
    padding: "10px 15px",
    background: "#ff5722",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  loadingText: {
    fontStyle: "italic",
  },
  newsItem: {
    padding: "10px",
    borderRadius: "5px",
    background: "rgba(255, 255, 255, 0.2)",
    marginBottom: "5px",
  },
};

export default NewsFeed;
