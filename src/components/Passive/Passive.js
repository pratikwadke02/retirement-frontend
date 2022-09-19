import axios from "axios";
import React, { useState, useEffect } from "react";
import logo from "../../assets/LOGO.jpg";

export default function Passive() {
  const [currentMonthly, setcurrentMonthly] = useState();
  const [fixedMonthly, setFixedMonthly] = useState();
  const [expectedGrowth, setExpectedGrowth] = useState();
  const [expectedInvestment, setExpectedInvestment] = useState();
  const [retirementCorpus, setRetirementCorpus] = useState(false);
  const [id, setId] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setId(queryParams.get("id"));
  });

  const next = () => {
    if (
      currentMonthly !== undefined &&
      fixedMonthly !== undefined &&
      expectedGrowth !== undefined &&
      expectedInvestment !== undefined &&
      retirementCorpus !== undefined
    ) {
      axios
        .post("http://localhost:5000/api/user/id", {
          currentMonthly: currentMonthly,
          fixedMonthly: fixedMonthly,
          expectedGrowth: expectedGrowth,
          expectedInvestment: expectedInvestment,
          retirementCorpus: retirementCorpus,
          id: id,
        })
        .then((res) => {
          if (res.data === "success") {
            window.location.href = "http://localhost:3000/table?id=" + id;
          } else {
            console.log("Failed!!");
          }
        });
    } else {
      alert("Enter Data!!!");
    }
  };

  return (
    <div
      className="row d-flex align-items-center"
      style={{
        // overflow: "hidden",
        margin: "0",
        padding: "0",
      }}
    >
      {/* <div className="col p-0"> */}
      {/* <div className="card card-registration"> */}
      {/* <div className="row"> */}
      <div
        className="col-xl-8"
        style={{
          paddingLeft: "0",
          height: "100vh",
          maxHeight: "max-content",
          backgroundColor: "black",
          color: "white",
          overflowX: "hidden",
        }}
      >
        <h5
          className="mb-3 text-lowercase"
          style={{
            padding: "10px",
            marginTop: "10px",
            marginLeft: "30px",
          }}
        >
          <img src={logo} height="110px" width="110px" />
        </h5>
        <div style={{ marginLeft: "50px" }}>
          <h4>Passive income details</h4>
          <p style={{ fontSize: "17px" }}>
            Enter your passive income details against the labels
          </p>
        </div>
        <div
          style={{ paddingTop: "20px" }}
          className="card-body px-5 text-black"
        >
          <div style={{ marginTop: "-15px" }} className="row">
            <div className="col-md-6 mb-3">
              <div className="form-outline">
                <label
                  style={{ fontWeight: "bold", color: "white" }}
                  className="form-label"
                >
                  Current Monthly Passive Income:
                </label>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-outline">
                <input
                  type="number"
                  id="form3Example1n"
                  className="form-control form-control-sm"
                  onChange={(e) => setcurrentMonthly(e.target.value)}
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
                  Monthly Passive Income after retirement:
                </label>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-outline">
                <input
                  type="number"
                  id="form3Example1n1"
                  className="form-control form-control-sm"
                  onChange={(e) => setFixedMonthly(e.target.value)}
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
                  Expected Growth Rate of Passive Income:
                </label>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-outline">
                <input
                  type="number"
                  id="form3Example1n1"
                  className="form-control form-control-sm"
                  onChange={(e) => setExpectedGrowth(e.target.value)}
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
                  Expected Investment Rate:
                </label>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-outline">
                <div className="form-outline">
                  <input
                    type="number"
                    id="form3Example1n1"
                    className="form-control form-control-sm"
                    onChange={(e) => setExpectedInvestment(e.target.value)}
                  />
                </div>
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
                  Retirement Corpus:
                </label>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-outline">
                <div className="form-outline">
                  <input
                    type="number"
                    id="form3Example1n1"
                    className="form-control form-control-sm"
                    onChange={(e) => setRetirementCorpus(e.target.value)}
                  />
                </div>
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
                // marginTop: "15px",
                marginBottom: "20px",
              }}
              onClick={() => {
                next();
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div
        className="col-xl-6 d-none d-xl-block"
        style={{ backgroundColor: "#ffd700" }}
      ></div>
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}
