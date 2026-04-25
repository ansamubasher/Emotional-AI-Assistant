import "../styles/journal.css";
import "../styles/dashboard.css";
import Layout from "../components/Layout";
import girl from "../assets/girl-pt2.svg";
import PieChartComponent from "../components/PieChart";
import BarChartComponent from "../components/BarChart";


const Dashboard = () => {
  const data1 = [
            { name: "Completed", value: 70 },
            { name: "Remaining", value: 30 },
          ];
  const data2 = [
            { name: "Completed", value: 60 },
            { name: "Remaining", value: 40 },
          ];
  const data3 = [
            { name: "Completed", value: 80 },
            { name: "Remaining", value: 20 },
          ];
  return (
    <Layout>
      <div className="dashboard-content">
        <h1>Analytics:</h1>
        <div className="charts-container">

          <PieChartComponent data={data1} />
          <PieChartComponent data={data2} />
          <PieChartComponent data={data3} />
        </div>
        <img src={girl} alt="girl" className="girl-img2" />
      </div>
    
    </Layout>
  );
};


export default Dashboard;