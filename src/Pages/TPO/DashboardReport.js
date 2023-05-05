import React, { useContext, useEffect, useState } from "react";
import api from "../../api";
// import DReport from "../../Components/DashboardReport/DashboardReport";
import Spinner from "../../Components/Spinner/Spinner";
import DashboardReportTpo from "../../Components/DashboardReportTpo/DashboardReportTpo";
import AuthContext from "../../Context/AuthContext/AuthContext";

const DashboardReport = ({ change }) => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const context=useContext(AuthContext)
  const {token}=context

  useEffect(() => {
    getStatistics("");
  }, []);


  const getStatistics = (query) => {
    api.get(`${token.account}/stats`+query).then((response) => {
      setStats(response.data.data.stats);
      setLoading(false);
    });
  };

  const toggleSettings = (setting, batch) => {
    api.post(`${token.acount}/settings/` + setting + "/" + batch).then((response) => {
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
