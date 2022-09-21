import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/LOGO.jpg";

export default function Login() {
  const [e_mail, setE_mail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const login = () => {
    if (e_mail !== undefined && password !== undefined) {
      const response = axios
        .post("https://s1crorek.herokuapp.com/api/user/login", {
          e_mail: e_mail,
          password: password,
        })
        .then((res) => {
          if (res.data.message === "Login successful") {
            localStorage.setItem("token", res.data.token);
            // window.location.href =
            //   "http://localhost:3000/table?id=" + res.data.id;
            navigate("/table?id=" + res.data.id);
          } else {
            console.log("No User Found");
          }
        });
    } else {
      alert("Enter Data!!!");
    }
  };

  return (
    <div style={{ overflow: "hidden", margin: "0", padding: "0" }}>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col">
          <div className="card card-registration ">
            <div className="row g-0">
              <div
                className="col-xl-8 d-flex justify-content-center align-items-left"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  height: "100vh",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <h5
                  className="text-lowercase"
                  style={{
                    padding: "10px",
                    marginTop: "10px",
                    marginLeft: "30px",
                  }}
                >
                  <img src={logo} height="110px" width="110px" />
                </h5>
                <div style={{ marginLeft: "50px", marginTop: "5px" }}>
                  <h4>Login to your account</h4>
                  <p style={{ fontSize: "17px" }}>
                    Access exclusive features by logging back into your account
                  </p>
                </div>
                <div className="card-body p-5 text-black">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-outline">
                        <label
                          style={{ fontWeight: "bold", color: "white" }}
                          className="form-label"
                        >
                          E-mail
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-outline">
                        <input
                          type="email"
                          id="form3Example1n"
                          className="form-control form-control-md"
                          onChange={(e) => setE_mail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-outline">
                        <label
                          style={{ fontWeight: "bold", color: "white" }}
                          className="form-label"
                        >
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-outline">
                        <input
                          type="password"
                          id="form3Example1n1"
                          className="form-control form-control-md"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <hr style={{ color: "#ffd700" }} />

                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-warning btn-md ms-2"
                      style={{
                        backgroundColor: "#ffd700",
                        color: "black",
                        fontWeight: "bold",
                      }}
                      onClick={() => {
                        login();
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-4"
                style={{ backgroundColor: "#ffd700", height: "100vh" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
