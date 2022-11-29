import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../api";

const Application = () => {
  const { applicationId } = useParams();
  const [quesAns, setQuesAns] = useState([]);

  useEffect(() => {
    api
      .get(`/student/drives/applications/${applicationId}`)
      .then((response) => {
        setQuesAns(response.data.data.application.answers);
      })
      .catch((error) => {
        toast.error("Server Error!!");
      });
  }, []);

  return (
    <div>
      <h3>Application Details</h3>
      <div>
        {quesAns? quesAns.map((item) => {
          return (
            <div>
              <p>{item.question}</p>
              <div>
                {item.options? item.options.map((item2) => {
                  return <p>{item2}</p>;
                }):<p>{item.answer}</p>}
              </div>
            </div>
          );
        }):<p>You have successfully applied for this drive.</p>}
      </div>
    </div>
  );
};

export default Application;
