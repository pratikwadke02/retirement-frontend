import Table from "../components/Table/Table";
import { useState, useEffect } from "react";

export default function TablePage() {
  const [id, setId] = useState();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setId(queryParams.get("id"));
  });

  return <Table id={id} />;
}
