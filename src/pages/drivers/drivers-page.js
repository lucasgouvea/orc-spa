import { useState } from "react";
import { GenericTable } from "../../components";
import "./drivers-page.css";
import Button from "@mui/material/Button";
import EditDriverModal from "./edit-driver-modal";
import CreateDriverModal from "./create-driver-modal";

const drivers = [
  {
    name: "Sebá",
    licenseA: true,
    licenseB: true,
    licenseC: false,
    licenseD: false,
    age: 30
  },
  {
    name: "João",
    licenseA: true,
    licenseB: false,
    licenseC: false,
    licenseD: false,
    age: 32
  },
  {
    name: "Renato",
    licenseA: true,
    licenseB: true,
    licenseC: true,
    licenseD: false,
    age: 44
  }
];

const cols = ["Nome", "Cartas", "Idade"];

function parseLicenses(driver) {
  const licenses = [];
  if (driver.licenseA) {
    licenses.push("A");
  }
  if (driver.licenseB) {
    licenses.push("B");
  }
  if (driver.licenseC) {
    licenses.push("C");
  }
  if (driver.licenseD) {
    licenses.push("D");
  }
  return licenses.join(",");
}

export function DriversPage() {
  const [rows, setRows] = useState([
    [drivers[0].name, parseLicenses(drivers[0]), drivers[0].age],
    [drivers[1].name, parseLicenses(drivers[1]), drivers[1].age],
    [drivers[2].name, parseLicenses(drivers[2]), drivers[2].age]
  ]);

  const [driverIndex, setDriverIndex] = useState(-1);
  const [newDriverModal, setNewDriverModal] = useState(false);

  const deleteRow = (i) => {
    setRows([...rows.slice(0, i), ...rows.slice(i + 1)]);
  };

  return (
    <div className="drivers-page">
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
    </div>
  );
}
