import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { GenericTable } from "../../components";
import "./drivers-page.css";
import Button from "@mui/material/Button";
import EditDriverModal from "./edit-driver-modal";
import CreateDriverModal from "./create-driver-modal";
import axios from "axios";

class Driver {
  constructor({
    age,
    created_at,
    id,
    license_a,
    license_b,
    license_c,
    license_d,
    license_e,
    name
  }) {
    this.age = age;
    this.createdAt = created_at;
    this.id = id;
    this.licenses = "";
    this.licenseA = license_a;
    this.licenseB = license_b;
    this.licenseC = license_c;
    this.licenseD = license_d;
    this.licenseE = license_e;

    this.name = name;

    this.setLicenses();
  }

  setLicenses() {
    const licenses = [];
    if (this.licenseA) {
      licenses.push("A");
    }
    if (this.licenseB) {
      licenses.push("B");
    }
    if (this.licenseC) {
      licenses.push("C");
    }
    if (this.licenseD) {
      licenses.push("D");
    }

    this.licenses = licenses.join(",");
  }

  toRow() {
    return [this.name, this.licenses, this.age];
  }
}
const cols = ["Nome", "Cartas", "Idade"];

export function DriversPage() {
  const [rows, setRows] = useState([]);

  const [driverIndex, setDriverIndex] = useState(-1);
  const [newDriverModal, setNewDriverModal] = useState(false);

  const {
    isLoading,
    error,
    data: drivers
  } = useQuery("repoData", () =>
    axios("/v1/drivers").then(({ data: drivers }) => drivers.map((d) => new Driver(d)))
  );

  const deleteRow = (i) => {
    setRows([...rows.slice(0, i), ...rows.slice(i + 1)]);
  };

  useEffect(() => {
    if (drivers) {
      const rows = drivers.map((d) => d.toRow());
      console.log(rows);
      setRows(rows);
    }
  }, [drivers]);

  return (
    <div className="drivers-page">
      {drivers && (
        <>
          <Button variant="contained" onClick={() => setNewDriverModal(true)}>
            Novo motorista
          </Button>

          <div id="table">
            <GenericTable
              rows={rows}
              cols={cols}
              onEdit={(i) => setDriverIndex(i)}
              onDelete={(i) => deleteRow(i)}
              width="100%"
            />
            {/* Modals */}
            <EditDriverModal
              onClose={() => setDriverIndex(-1)}
              open={driverIndex !== -1}
              data={drivers[driverIndex]}
            />
            <CreateDriverModal onClose={() => setNewDriverModal(false)} open={newDriverModal} />
          </div>
        </>
      )}
    </div>
  );
}
