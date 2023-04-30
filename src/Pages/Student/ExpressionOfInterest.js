import React, { useContext, useRef, useState } from "react";
import PlacementLogoSmall from "../../Components/Logo/PlacementLogoSmall";
import SquareBadge from "../../Components/SquareBadge/SquareBadge";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { toast } from "react-toastify";
import Spinner from "../../Components/Spinner/Spinner";
import { Alert, AlertTitle } from "@mui/material";
import "./index.css";

const ExpressionOfInterest = ({ progress, getProfile }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  const ref = useRef(null);
  const onClick = (e) => {
    ref.current.click();
  };
  const [uploading, setUploading] = useState(false);
  const [media, setMedia] = useState(null);
  const handleChange = async (e) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("scope", "expression_interest");
    formData.append("file", e.target.files[0]);
    api
      .post("/student/upload", formData)
      .then((res) => {
        setMedia(res.data.data);
        toast.success("Signed Expression Of Interest Uploaded", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
          hideProgressBar: true,
        });
        setUploading(false);
      })
      .catch((err) => {
        toast.error("Server Error!");
        setUploading(false);
      });
  };
  const eoiPdf = () => {
    api
      .get("/student/profile/expression/pdf", {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "resume.pdf");
        document.body.appendChild(link);
        link.click();

        toast.success("Resume Downloaded!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server Error!!");
      });
  };

  const submiteoiPdf = () => {
    api
      .post("/student/profile/eoiLetter/" + media._id)
      .then((response) => {
        getProfile();
        toast.success("Submitted Successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server Error!!");
      });
  };
  return (
    <div style={{ padding: 20, paddingBottom:progress.eoiUnderVerification && progress.eoi ? 0: 20 }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 60,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <PlacementLogoSmall />
          <SquareBadge text="Student Onboarding" />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginRight: 30 }}>
          <button
            onClick={async () => {
              await logout();
              navigate("/login");
            }}
            className="profile-logout"
          >
            Logout
          </button>
        </div>
      </div>
      <div>
        <div className="profile-form-root" style={{ textAlign: "center" }}>
          <div
            style={{
              padding: 30,
              background: "white !important",
              borderRadius: 15,
              width: "70%",
              justifyContent:
                "center" /* center items vertically, in this case */,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {progress.eoiUnderVerification && progress.eoi ? (
              <div>
                <h2>Expression Of Interest</h2>
                <Alert
                  severity="success"
                  style={{ textAlign: "left", marginTop: 30 }}
                >
                  <AlertTitle>
                    <strong>
                      Expression Of Interest Submitted Successfully!
                    </strong>
                  </AlertTitle>
                  Please wait for your department's TPO to verify your letter,
                  after this you will be able to access your dashboard. You wil
                  receive an email from us when your letter is verified.
                </Alert>
                {/* <div style={{display: "flex",alignItems: "center", justifyContent: "center", justifyItems: "center"}}>
              <div>
              <img style={{marginTop: 30, width: 450, borderRadius: 15,marginLeft: 40, boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px"}} src="https://acharyaplacement-dev.s3.ap-south-1.amazonaws.com/public/random/photo_2023-04-30%2021.40.24.jpeg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiSDBGAiEA%2FVrL1Xv34eqqim6azNSj4F7j7ljIZ16pwsi6DteXKl0CIQDJqkOCM%2FKMk5cbTOtgyUt%2BVxEDDNEkr9IKCw2tPh9rCyrtAgiR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAIaDDE3MDc0NjczNTY1NyIMPIBPwt7PxDy6IQynKsECddZKsWjBmciHrkX%2FdUiZbt4sZAu5IzwWqJYtswx5WbLL5qsBRe08AyS2rI2EbnqaG8gV%2FVv%2Ft8mR8FHrlOPsvl%2FCloDbf18pCymE1jy4AUUrrM6NF49CCFCCsHk%2F2zH9MPhqLcHK8wHjyMX5Fol6U9EeTEy4vxfPVkpNAEgvkmWmeGAdx4Nez3layWL8D7zRMpJRqcuSTCbtyRi%2BuoaXh03gqBp4jTnCOo%2FoXksb0J%2Femtb4SVzv%2BduhstAS5MzQU8%2FgRJHzrZqtxbhyczu4yxwDVBgebwvN8oUF5I6RLU41BPshQH%2BSUz%2BQAV3%2FKK68obKsH%2B4wPYA4KXv%2Fna2N%2Fhz7Vu1OFuYxdN4mQ9gWuxSv81rFeAABrQXSdXXvgSphFGanx3IN%2BFrZtgrJoBMDSVQZcfiRkHK%2F4zwcgVBMuPx1MISluqIGOrICHV9zvTlNvB4yabrSFcEFveJaFtyazwn1bQboxRaCpaibg9SKqMnlnRE0UCcmfezYQx3gApQgQ85Kclg%2B7OZ8hi5i0vgC9Iz2LzZX3OKH2iWyQFHLRkVbTRCKutEzUDjydZtbd6KYxurKwQ9htIp2%2F74He%2FlRIFuDmUUaZDx6y%2FwNgjJffovPH60FBeaf6QfbWnLMEYN8Gg37Z9%2BWmsjSkpFxqaJ8eYOHDHIf8e%2BYJpqpBU1hRNLClucAAREzyDnQd5J0xrGTs2%2BYAXhthF8u4Bl7enQokmnEB2eKPPwr2TktSrrBa6jGvsMzN6sjeXJdHNOTrw0U2dvQdNSHw5M2U3%2FxjXhny5kh8pPpRP8Jc29tvccGrPHRxidrf8RIBXh%2BxBN7SSpzd6wPlcxUegpJGzvb&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230430T161157Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=ASIASPQKMNQURYIVBMAA%2F20230430%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=376c4fae1caaaed22685c327139141c500a12bfb9ef91f99fa96c12a998077bb"/>
              </div>
              <div>
              <img style={{marginTop: 30, width: 300, borderRadius: 15, boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px"}} src="https://acharyaplacement-dev.s3.ap-south-1.amazonaws.com/public/random/photo_2023-04-30%2021.40.30.jpeg"/>
              <img style={{marginTop: 30, width: 300, borderRadius: 15, boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px"}} src="https://acharyaplacement-dev.s3.ap-south-1.amazonaws.com/public/random/photo_2023-04-30%2021.51.29.jpeg"/>
              </div>
              </div> */}
                <section className="carousel-inf" style={{marginTop: 50}}>
                  <article>
                    <div>
                      <ul>
                        <li>
                          <img src="https://acharyaplacement-dev.s3.ap-south-1.amazonaws.com/public/random/photo_2023-04-30%2021.51.29.jpeg" />
                        </li>
                        <li>
                          <img src="https://acharyaplacement-dev.s3.ap-south-1.amazonaws.com/public/random/photo_2023-04-30%2021.40.24.jpeg" />
                        </li>
                        <li>
                          <img src="https://acharyaplacement-dev.s3.ap-south-1.amazonaws.com/public/random/photo_2023-04-30%2021.40.30.jpeg" />
                        </li>
                        <li>
                          <img src="https://acharyaplacement-dev.s3.ap-south-1.amazonaws.com/public/random/photo_2023-04-30%2021.40.36.jpeg" />
                        </li>
                        <li>
                            <img src="https://acharyaplacement-dev.s3.ap-south-1.amazonaws.com/public/random/photo_2023-04-30%2021.39.54.jpeg" />
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul>
                        <li>
                          <img src="https://acharyaplacement-dev.s3.ap-south-1.amazonaws.com/public/random/photo_2023-04-30%2021.40.06.jpeg" />
                        </li>
                        <li>
                          <img src="https://acharyaplacement-dev.s3.ap-south-1.amazonaws.com/public/random/photo_2023-04-30%2021.40.10.jpeg" />
                        </li>
                        <li>
                          <img src="https://acharyaplacement-dev.s3.ap-south-1.amazonaws.com/public/random/photo_2023-04-30%2021.40.15.jpeg" />
                        </li>
                        <li>
                          <img src="https://acharyaplacement-dev.s3.ap-south-1.amazonaws.com/public/random/photo_2023-04-30%2022.02.20.jpeg" />
                        </li>
                        <li>
                            <img src="https://acharyaplacement-dev.s3.ap-south-1.amazonaws.com/public/random/photo_2023-04-30%2022.02.23.jpeg" />
                        </li>
                      </ul>
                    </div>
                  </article>
                </section>
              </div>
            ) : (
              <div>
                <h2>One Final Step!</h2>
                <p style={{ marginTop: 15 }}>
                  Download the Expression Of Interest letter using the button
                  below. Please sign it and re-upload the signed copy back for
                  verification. This is an important step to let the college
                  know you are willing to receive help from us in your placement
                  activities
                </p>
                <button
                  className="profile-logout"
                  style={{ marginTop: 40, padding: 15, fontSize: 17 }}
                  onClick={eoiPdf}
                >
                  Download Expression Of Interest
                </button>
                <br />
                <input
                  name="Signed Expression Of Interest"
                  ref={ref}
                  style={{ display: "none" }}
                  type="file"
                  accept="application/pdf"
                  onChange={handleChange}
                  required
                />
                <button
                  onClick={onClick}
                  className="profile-logout"
                  style={{
                    marginTop: 40,
                    padding: 15,
                    fontSize: 17,
                    backgroundColor: "#f2870d",
                  }}
                >
                  Upload Signed Copy
                </button>
                {media && (
                  <button
                    onClick={submiteoiPdf}
                    className="profile-logout"
                    style={{
                      marginTop: 40,
                      padding: 15,
                      fontSize: 17,
                      marginLeft: 20,
                    }}
                  >
                    Submit Signed Copy
                  </button>
                )}
                <br />
                {uploading && <Spinner />}
                <div style={{ marginTop: 20 }}>
                  {media && (
                    <object
                      data={media.location}
                      randomKey={media.createdOn}
                      type="application/pdf"
                      style={{ minHeight: "100vh", width: "100%" }}
                      key={media.createdOn}
                    ></object>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpressionOfInterest;
