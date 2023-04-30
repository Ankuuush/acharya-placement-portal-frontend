import React, { useEffect } from "react";
import RangeSlider from "../RangeSlider";
import "./Filter.css";

const Filter = ({ filterArray, setFilterArray }) => {
  const [amount, setAmount] = React.useState([]);

  const handleChange = (e) => {
    if (e.target.checked) {
      let newArr = [...filterArray];
      newArr.push(e.target.value);
      setFilterArray(newArr);
      return;
    }

    let arr = filterArray.filter((item) => item !== e.target.value);
    setFilterArray(arr);
  };

  useEffect(() => {
    let newArr = filterArray.filter((item)=>!Array.isArray(item))
      newArr.push(amount);
      setFilterArray(newArr);
  }, [amount])

  return (
    <div className="right-component-context">
      <div className="advert-root">
        <p className="advert-textt">Download The Official App</p>
        <img
          src="https://www.citypng.com/public/uploads/small/11639742304fqp5upggd2cke76potjqc5jqctz0p7owqgwzyh1kua0pst1w4oyyrnrzqnzjscwbdvcmgefmcd7ujhczx0cjugnqgllnx8zktb2k.png"
          height={37}
          style={{ marginTop: 10, cursor: "pointer" }}
        />
      </div>
      <div className="filter-root">
        <p className="filter-header">Filter Drives</p>
        <p className="filter-subheader">Job Location</p>
        <input
          type="checkbox"
          id="remote"
          name="location1"
          value="remote"
          onChange={handleChange}
        />
        <label for="remote" className="check-labels">
          Remote
        </label>
        <br />
        <input
          type="checkbox"
          id="onsite"
          name="location1"
          value="On-Site"
          onChange={handleChange}
        />
        <label for="onsite" className="check-labels">
          On-Site
        </label>
        <br />
        <p className="filter-subheader">Job Type</p>
        <input
          type="checkbox"
          id="fulltime"
          name="location1"
          value="full-time"
          onChange={handleChange}
        />
        <label for="fulltime" className="check-labels">
          Fulltime
        </label>
        <br />
        <input
          type="checkbox"
          id="internship"
          name="location1"
          value="internship"
          onChange={handleChange}
        />
        <label for="internship" className="check-labels">
          Internship
        </label>
        <br />
        <p className="filter-subheader">Compensation</p>
        <RangeSlider width={"100%"} setAmount={setAmount} />
        <div className="filter-amount">
          <div>
          <h5 style={{color:""}}>Min amount:</h5>
          <h5>Rs. {amount[0]}</h5>
          </div>
          <div>
          <h5>Max amount:</h5>
          <h5>Rs. {amount[1]}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
