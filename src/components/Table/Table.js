import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TableData from "../TableData/TableData";
import { Chart } from "react-google-charts";

export default function Table(props) {
  const navigate = useNavigate();

  const [dataA, setDataA] = useState([]);
  const [dataG, setDataG] = useState([]);
  const [data, setData] = useState([]);
  const [inrRate, setInrRate] = useState();
  let gap;
  let d = new Date();
  let startYear = d.getFullYear();
  let dataArray = [];
  let graphData = [["Age", "Sales"]];

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const generateData = async (res) => {
    let age = getAge(res.dob);
    gap = parseInt(res.retireAge) - getAge(res.dob);

    let ct = 100 - parseInt(res.retireAge);
    let i;
    for (i = 0; i < ct; i++) {
      let yearlyExpense =
        ((parseInt(res.currentExpense) * (1 + parseInt(res.inflation) / 100)) ^
          (res.retireAge + i - getAge(res.dob))) *
        12;
      let yearlyPassiveIncome =
        ((parseInt(res.currentExpense) * (1 + parseInt(res.inflation) / 100)) ^
          ((parseInt(res.retireAge) + i - getAge(res.dob)) * 12)) +
        res.fixedMonthlyPassiveIncomeAfterRetirement * 12;
      let corpus;
      if (i === 0) {
        corpus = res.retirementCorpus;
      } else {
        corpus =
          dataArray[i - 1].retirementCorpusBalance -
          dataArray[i - 1].netIncomeNeeded +
          (dataArray[i - 1].retirementCorpusBalance -
            dataArray[i - 1].netIncomeNeeded) *
            inrRate;
      }

      let temp = {
        year: parseInt(startYear) + parseInt(gap) + i,
        age: parseInt(res.retireAge) + i,
        yearlyExpense: yearlyExpense,
        yearlyPassiveIncome: yearlyPassiveIncome,
        netIncomeNeeded: yearlyExpense - yearlyPassiveIncome,
        retirementCorpusBalance: parseFloat(corpus).toFixed(2),
      };
      if (i % 3 === 0) {
        graphData.push([String(parseInt(res.retireAge) + i), parseInt(corpus)]);
      }
      dataArray.push(temp);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      const gData = async () => {
        await axios
          .get("http://localhost:5000/api/user/" + props.id)
          .then((res) => {
            setInrRate(res.data[0].expectedInvestmentRate / 100);
            generateData(res.data[0]);
            setData(res.data[0]);
          });
      };
      if (props.id !== undefined) {
        gData().then(() => {
          setDataA(dataArray);
          setDataG(graphData);
        });
      }
    }
  }, [props.id]);

  useEffect(() => {
    generateData(data).then(() => {
      setDataA(dataArray);
      setDataG(graphData);
    });
  }, [data]);

  const options = {
    isStacked: true,
    height: 300,
    legend: { position: "top", maxLines: 100 },
    vAxis: { minValue: 0 },
  };

  if (dataArray !== []) {
    return (
      <div className="m-5">
        <div className="d-flex flex-row bd-highlight mb-3">
          <div
            style={{
              width: "60vw",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-between",

              padding: "50px",
              height: "400px",
              marginTop: "30px",
              boxShadow: "0px 0px 5px grey",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label
                  style={{
                    backgroundColor: "#DCF7EE",
                    paddingLeft: "5px",
                    color: "#83AD9F",
                    paddingRight: "5px",
                    marginRight: "10px",
                    borderRadius: "5px",
                  }}
                >
                  A
                </label>
                <label style={{ marginRight: "30px" }}>
                  Retirement Age:{" "}
                  <label style={{ fontWeight: "bold" }}>
                    ₹{data.retireAge}
                  </label>
                </label>
              </div>
              <input
                type="range"
                id="volume"
                name="volume"
                value={data.retireAge}
                min="0"
                max="100"
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    retireAge: e.target.value,
                  }))
                }
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label
                  style={{
                    backgroundColor: "#E5EFFB",
                    paddingLeft: "5px",
                    color: "#BACBE7",
                    paddingRight: "5px",
                    marginRight: "10px",
                    borderRadius: "5px",
                  }}
                >
                  B
                </label>
                <label style={{ marginRight: "30px" }}>
                  Current Monthly Expenses:{" "}
                  <label style={{ fontWeight: "bold" }}>
                    ₹{data.currentExpense}
                  </label>
                </label>
              </div>
              <input
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="1000000"
                value={data.currentExpense}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    currentExpense: e.target.value,
                  }))
                }
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label
                  style={{
                    backgroundColor: "#FBF7CA",
                    paddingLeft: "5px",
                    color: "#BEB977",
                    paddingRight: "5px",
                    marginRight: "10px",
                    borderRadius: "5px",
                  }}
                >
                  C
                </label>
                <label style={{ marginRight: "30px" }}>
                  Estimated inflation rate:{" "}
                  <label style={{ fontWeight: "bold" }}>
                    {data.inflation}%
                  </label>
                </label>
              </div>
              <input
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="100"
                value={data.inflation}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    inflation: e.target.value,
                  }))
                }
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label
                  style={{
                    backgroundColor: "pink",
                    paddingLeft: "5px",
                    color: "white",
                    paddingRight: "5px",
                    marginRight: "10px",
                    borderRadius: "5px",
                  }}
                >
                  D
                </label>
                <label style={{ marginRight: "30px" }}>
                  Current Monthly Passive Income:{" "}
                  <label style={{ fontWeight: "bold" }}>
                    ₹{data.currentMonthlyPassiveIncome}
                  </label>
                </label>
              </div>
              <input
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="1000000"
                value={data.currentMonthlyPassiveIncome}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    currentMonthlyPassiveIncome: e.target.value,
                  }))
                }
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label
                  style={{
                    backgroundColor: "#F7E8EB",
                    paddingLeft: "5px",
                    color: "#A6878C",
                    paddingRight: "5px",
                    marginRight: "10px",
                    borderRadius: "5px",
                  }}
                >
                  E
                </label>
                <label style={{ marginRight: "30px" }}>
                  Fixed Monthly Passive Income after retirement (i.e. Pension
                  etc):{" "}
                  <label style={{ fontWeight: "bold" }}>
                    ₹{data.fixedMonthlyPassiveIncomeAfterRetirement}
                  </label>
                </label>
              </div>
              <input
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="1000000"
                value={data.fixedMonthlyPassiveIncomeAfterRetirement}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    fixedMonthlyPassiveIncomeAfterRetirement: e.target.value,
                  }))
                }
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label
                  style={{
                    backgroundColor: "#DCF7EE",
                    paddingLeft: "5px",
                    color: "#83AD9F",
                    paddingRight: "5px",
                    marginRight: "10px",
                    borderRadius: "5px",
                  }}
                >
                  F
                </label>
                <label style={{ marginRight: "30px" }}>
                  Expected Growth Rate of Passive Income:{" "}
                  <label style={{ fontWeight: "bold" }}>
                    {data.expectedGrowthRateofPassiveIncome}%
                  </label>
                </label>
              </div>
              <input
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="100"
                value={data.expectedGrowthRateofPassiveIncome}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    expectedGrowthRateofPassiveIncome: e.target.value,
                  }))
                }
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label
                  style={{
                    backgroundColor: "#E5EFFB",
                    paddingLeft: "5px",
                    color: "#BACBE7",
                    paddingRight: "5px",
                    marginRight: "10px",
                    borderRadius: "5px",
                  }}
                >
                  G
                </label>
                <label style={{ marginRight: "30px" }}>
                  Expected Investment Rate:{" "}
                  <label style={{ fontWeight: "bold" }}>
                    {data.expectedInvestmentRate}%
                  </label>
                </label>
              </div>
              <input
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="100"
                value={data.expectedInvestmentRate}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    expectedInvestmentRate: e.target.value,
                  }))
                }
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <label
                    style={{
                      backgroundColor: "#FBF7CA",
                      paddingLeft: "5px",
                      color: "#BEB977",
                      paddingRight: "5px",
                      marginRight: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    H
                  </label>
                  <label style={{ marginRight: "30px" }}>
                    Retirement Corpus:{" "}
                    <label style={{ fontWeight: "bold" }}>
                      ₹{data.retirementCorpus}
                    </label>
                  </label>
                </div>
              </div>
              <input
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="10000000"
                value={data.retirementCorpus}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    retirementCorpus: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div
            style={{
              boxShadow: "0px 0px 5px grey",
              margin: "30px",
              marginLeft: "50px",
            }}
          >
            <Chart
              chartType="AreaChart"
              width="40vw"
              height="400px"
              style={{
                display: "flex",
                alignItems: "center",
              }}
              data={dataG}
              options={options}
            />
          </div>
        </div>
        <TableData graphData={dataG} data={dataA} />
      </div>
    );
  }
}
