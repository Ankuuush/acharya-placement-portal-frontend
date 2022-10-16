import React from "react";
import InternshipItem from "./InternshipItem";

const Internships = ({ data }) => {
  return (
    <div>
      <h3>Internship</h3>
      {data.map((item) => (
        <InternshipItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Internships;
