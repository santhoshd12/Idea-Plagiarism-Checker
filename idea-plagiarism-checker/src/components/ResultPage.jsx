import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const [Tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);

  const idea = location.state?.idea;
  const result = location.state?.result || [];

  const generateTips = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/tip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea }),
    });

    const data = await res.json();
    setTips(data.tips || []);
    setLoading(false);
  };

  if (!result.length) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>No result found</h2>
        <p>Please go back and enter an idea to check.</p>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h3>Total Matches: {result.length}</h3>
      <br />
      <h2>Conceptual Similarity Results</h2>
      <hr />
      <br />
      {result.map((match, index) => (
        <div key={index} style={{ marginBottom: "1.5rem" }}>
          <h4>Result -- {index + 1}</h4>
          <p><strong>Title:</strong> {match.title}</p>
          <p><strong>Snippet:</strong> {match.snippet}</p>
          <p><strong>Similarity Score:</strong> {(match.similarity * 100).toFixed(2)}%</p>
          <p><strong>Link:</strong> <a href={match.link} target="_blank" rel="noopener noreferrer">Visit Site</a></p>
          <hr />
        </div>
      ))}
      {Tips.length===0 && (
      <button onClick={generateTips}>
        {loading ? "Generating Tips..." : "Get Tips"}
      </button>
      )}

      {Tips.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Suggested Improvements:</h3>
          <ul>
            {Tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={() => navigate("/")}>Check Another Idea</button>
    </div>
  );
}
