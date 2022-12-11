import React, { useEffect, useState } from "react";
import api from "../../api";
import DReport from "../../Components/DashboardReport/DashboardReport";
import Spinner from "../../Components/Spinner/Spinner";

const DashboardReport = ({ change }) => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStatistics();
  }, []);


  const getStatistics = () => {
    api.get("/student/drives/statistics").then((response) => {
      setStats(response.data.data.stats);
      setLoading(false);
    });
  };


  return (
   <>
    {loading ? <Spinner /> : <DReport stats={stats} change={change} />}
   </>
  );
};

export default DashboardReport;
