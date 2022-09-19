export default function TableData(props) {
  return (
    <div
      style={{
        boxShadow: "0px 0px 5px grey",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>Years</th>
            <th>Age</th>
            <th>Yearly Expense</th>
            <th>Yearly Passive Income</th>
            <th>Net Income Needed</th>
            <th>Retirement Corpus Balance</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((dat, key) => (
            <tr key={key}>
              <td>{dat.year}</td>
              <td>{dat.age}</td>
              <td>{dat.yearlyExpense}</td>
              <td>{dat.yearlyPassiveIncome}</td>
              <td>{dat.netIncomeNeeded}</td>
              <td
                style={
                  dat.retirementCorpusBalance < 0
                    ? { color: "red" }
                    : { color: "green" }
                }
              >
                {dat.retirementCorpusBalance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
