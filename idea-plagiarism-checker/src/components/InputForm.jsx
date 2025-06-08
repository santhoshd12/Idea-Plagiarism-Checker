import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkPlagiarism } from "../api";
import "./InputForm.css";

const InputForm = () => {
  const [idea, setidea] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const navi = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    seterror("");

    try {
      const result = await checkPlagiarism({ idea });

      navi("/results", { state: { idea,"result":result } });
    } catch (err) {
      console.log(err);
      seterror("Something went wrong...");
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <div>
        <h1>Idea Plagiarism Checker</h1>
        <form onSubmit={handlesubmit}>
          <h3>Enter your Idea to check existance....</h3>
          <textarea
            rows="8"
            style={{ width: "100%" }}
            value={idea}
            onChange={(e) => setidea(e.target.value)}
            required
            placeholder="Enter the words in your mind..."
          />
          <br />
          <button type="submit" disabled={loading}>
            {loading ? "Checikingg...." : "Check Plagiarism"}
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
};

export default InputForm;
