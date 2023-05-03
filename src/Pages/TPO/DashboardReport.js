import React, { useEffect, useState } from "react";
import api from "../../api";
// import DReport from "../../Components/DashboardReport/DashboardReport";
import Spinner from "../../Components/Spinner/Spinner";
import DashboardReportTpo from "../../Components/DashboardReportTpo/DashboardReportTpo";

const DashboardReport = ({ change }) => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStatistics("");
  }, []);


  const getStatistics = (query) => {
    api.get("/tpo/stats"+query).then((response) => {
      setStats(response.data.data.stats);
      setLoading(false);
    });
  };

  const toggleSettings = (setting, batch) => {
    api.post("tpo/settings/" + setting + "/" + batch).then((response) => {
        getStatistics(`?batch=${stats.batch}`);
    });
  };


  return (
   <>
    {loading ? <Spinner /> : <DashboardReportTpo stats={stats} change={change} getStatistics={getStatistics} toggleSettings={toggleSettings} />}
   </>
  );
};

export default DashboardReport;
