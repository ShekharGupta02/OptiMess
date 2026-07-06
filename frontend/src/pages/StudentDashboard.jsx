import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/StudentDashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  const fetchCount = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        "/meal/count",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("COUNT RESPONSE:", res.data);

      setCount(res.data.count);
    } catch (error) {
      console.log("COUNT ERROR:", error.response?.data);

      console.log("STATUS:", error.response?.status);

      alert("Count error");
    }
  };

  const markMeal = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      const res = await api.post(
        "/meal/mark",

        {
          date: "2026-05-26",

          willEat: true,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("MARK RESPONSE:", res.data);

      alert("Meal marked");

      fetchCount();
    } catch (error) {
      console.log("MARK ERROR:", error.response?.data);

      console.log("STATUS:", error.response?.status);

      alert("Mark error");
    }
  };

  useEffect(() => {
    fetchCount();
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/meal/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("HISTORY:", res.data);

      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Student Dashboard</h1>

      <h2 className="card">
        Meal Count:
        {count}
      </h2>

      <button onClick={markMeal}>Mark Meal</button>

      <h2>Meal History</h2>

      <ul>
        {history.map((meal) => (
          <li key={meal._id}>
            {meal.date} -{meal.willEat ? "Yes" : "No"}
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          localStorage.removeItem("token");

          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default StudentDashboard;
