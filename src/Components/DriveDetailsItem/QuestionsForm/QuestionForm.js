import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../api";

const QuestionForm = ({job,initialQues}) => {
    const [answers, setAnswers] = useState(initialQues)
    const navigate=useNavigate()
    const handleText=(e,item)=>{
        let newObj={...answers[item._id]}
        newObj.answer=e.target.value;
        setAnswers({...answers,[item._id]:newObj})
    }
    const handleRadio=(e,item)=>{
      let newObj={...answers[item._id]}
        newObj.option=[e.target.value];
        setAnswers({...answers,[item._id]:newObj})
    }
    const handleCheckbox=(e,item)=>{
      let newObj={...answers[item._id]}
      if(e.target.checked)
        newObj.option.push(e.target.value);
        else
        {
          let newArr=newObj.option.filter((item)=>item!=e.target.value)
          newObj.option=newArr
        }
        setAnswers({...answers,[item._id]:newObj})
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    let arr=[]
    for(const item in answers)
    arr.push(answers[item])
    console.log(arr)
    api.post(`student/drives/${job._id}/apply`,{answers:arr}).then((response)=>{
      toast.success("Application successful!!")
      navigate('/student/applied-jobs')
    })
    .catch((error)=>{
      toast.error("Server Error")
      console.log(error)
    })

  };

  useEffect(() => {
    console.log(answers)
  }, [answers])
  
  
  return (
    <form onSubmit={handleSubmit}>
      {job.additionalQuestions.map((item) => {
        if (item.type === "free-text") {
          return (
            <div key={item._id}>
              <label htmlFor={`${item._id}`}>{item.question} </label>
              <input type="text" id={`${item._id}`} value={answers[item._id].answer} required onChange={event=>handleText(event,item)} />
            </div>
          );
        } else if (item.type === "options" && item.multiSelect) {
          return (
            <div key={item._id}>
              <p>{item.question} </p>
              {item.options.map((optionsItem) => {
                return (
                  <div key={optionsItem._id}>
                    <input
                      type="checkbox"
                      id={`${optionsItem._id}`}
                      value={optionsItem._id}
                      onChange={event=>handleCheckbox(event,item)}
                    />
                    <label htmlFor={`${optionsItem._id}`}>
                      {optionsItem.text}{" "}
                    </label>
                  </div>
                );
              })}
            </div>
          );
        } else {
          return (
            <div key={item._id}>
              <p>{item.question} </p>
              {item.options.map((optionsItem) => {
                return (
                  <div key={optionsItem._id}>
                    <input
                      type="radio"
                      id={`${optionsItem._id}`}
                      name={item._id}
                      value={optionsItem._id}
                      onChange={event=>handleRadio(event,item)}
                      required
                    />
                    <label htmlFor={`${optionsItem._id}`}>
                      {optionsItem.text}{" "}
                    </label>
                  </div>
                );
              })}
            </div>
          );
        }
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionForm;
