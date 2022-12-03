import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../api";
import "./QuestionForm.css";

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
    <>
    <p className="drive-role" style={{textAlign: "center", marginBottom: "40px", fontSize: 23}}>Application Form</p>
    <form onSubmit={handleSubmit}>
      {job.additionalQuestions.map((item,index) => {
        if (item.type === "free-text") {
          return (
            <div key={item._id}>
              <p htmlFor={`${item._id}`} className="add_question">{index+1 + ") " + item.question}  <span style={{color: "red"}}>{ item.required && "*"}</span></p>
             <div style={{paddingLeft: 20, marginTop: 20, marginBottom: 10}}>
             <input type="text" id={`${item._id}`} value={answers[item._id].answer} required={item.required} onChange={event=>handleText(event,item)} className="add_free_Text" />
             </div>
            </div>
          );
        } else if (item.type === "options" && item.multiSelect) {
          return (
            <div key={item._id}>
              <p className="add_question">{index+1 + ") " + item.question}  <span style={{color: "red"}}>{ item.required && "*"}</span> </p>
              <div style={{paddingLeft: 20}}>
              {item.options.map((optionsItem) => {
                return (
                  <div key={optionsItem._id}>
                    <input
                      type="checkbox"
                      id={`${optionsItem._id}`}
                      value={optionsItem._id}
                      onChange={event=>handleCheckbox(event,item)}
                      className="add_check_button"
                      required={item.required && answers[item._id].option.length===0}
                    />
                    <label htmlFor={`${optionsItem._id}`}>
                      {optionsItem.text}{" "}
                    </label>
                  </div>
                );
              })}
              </div>
            </div>
          );
        } else {
          return (
            <div key={item._id}>
              <p className="add_question">{index+1 + ") " + item.question} <span style={{color: "red"}}>{ item.required && "*"}</span> </p>
              <div style={{paddingLeft: 20}}>
              {item.options.map((optionsItem) => {
                return (
                  <div key={optionsItem._id}>
                    <input
                      type="radio"
                      id={`${optionsItem._id}`}
                      name={item._id}
                      value={optionsItem._id}
                      onChange={event=>handleRadio(event,item)}
                      required={item.required}
                      className="add_radio_button"
                    />
                    <label htmlFor={`${optionsItem._id}`}>
                      {optionsItem.text}{" "}
                    </label>
                  </div>
                );
              })}
              </div>
            </div>
          );
        }
      })}
      <div style={{display: "flex", alignItems: "flex-end"}}>
      <button type="submit" className="drive-apply-button apply_btn_app">Apply</button>
      <button className="drive-apply-button apply_btn_app">Cancel</button>
      </div>
    </form>
    </>
  );
};

export default QuestionForm;
