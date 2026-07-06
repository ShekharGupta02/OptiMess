import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMeals: 0,
    studentsEating: 0,
    studentsSkipping: 0,
  });
  const [prediction, setPrediction] = useState(0);
  const [analytics, setAnalytics] = useState([]);

  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/meal/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("STATS:", res.data);

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPrediction = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/meal/predict", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("PREDICTION:", res.data);

      setPrediction(res.data.prediction);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/meal/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("ANALYTICS:", res.data);

      setAnalytics(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    fetchStats();
    fetchPrediction();
    fetchAnalytics();
  }, []);

  return (
    <div className="stats-container">
      <div className="stats-container">

  <div className="card">
    <h3>Total Meals</h3>
    <h1>{stats.totalMeals}</h1>
  </div>

  <div className="card">
    <h3>Students Eating</h3>
    <h1>{stats.studentsEating}</h1>
  </div>

  <div className="card">
    <h3>Students Skipping</h3>
    <h1>{stats.studentsSkipping}</h1>
  </div>

  <div className="card">
    <h3>Prediction</h3>
    <h1>{prediction}</h1>
  </div>

</div>

      <h2>Meal Analytics</h2>

      <ul>
        {analytics.map((item) => (
          <li key={item._id}>
            {item._id}
            {" - "}
            {item.count}
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

export default AdminDashboard;
