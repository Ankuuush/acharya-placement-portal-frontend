import React, { useState, useEffect } from "react";
import api from "../api";
import Spinner from "../Components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';

const Companies = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = () => {
    api.get("/student/drives/companies/all").then((response) => {
      setCompanies(response.data.data.companies);
      setLoading(false);
    });
  };

  const styleAppliedRoot = {
    height: "auto",
    padding: "5px",
    display: "flex",
    backgroundColor: "#f3f4f8",
  };

  const styleLeftJobRoot = {
    flex: "4",
    height: "fitContent",
  };

  return (
    <div style={styleAppliedRoot}>
      <div style={styleLeftJobRoot}>
        <div className="search-root">
          <h4>Companies List</h4>
          <p>
            The list here shows the list of companies that have been whitelisted
            onto the platform and/or have atleast one drive attached to them,
            this list is not a cumulative list of all companies
          </p>
        </div>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner />
          </div>
        ) : companies.length > 0 ? (
          <div
            className="applied-jobs-grid"
            style={{ padding: 15, background: "white", borderRadius: 10 }}
          >
            {companies.map((company) => (
              <div
                className="drive-header rep-com-root"
                style={{ marginTop: 5 }}
                onClick={() => navigate("/student/company/" + company.slug)}
              >
                <img
                  src={company.logoUrl}
                  style={{ height: 55, width: 55, boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px", }}
                  className="drive-logo"
                />
                <div className="drive-header-group">
                  <h4 className="drive-company">{company.name}</h4>
                  {company.rating && <div style={{display: "flex", alignItems: "center", marginTop: 5}}>
                  <Rating name="read-only" value={company.rating} readOnly precision={0.1} />
                  <p style={{marginLeft: 10}}>{company.rating}/5</p>
                </div>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3 style={{ textAlign: "center", marginTop: "2rem" }}>
            No applications found!!
          </h3>
        )}
      </div>
      {/* {filterOpen && <Filter />} */}
    </div>
  );
};

export default Companies;
