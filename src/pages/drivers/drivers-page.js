import { useEffect, useState } from "react";

import { useDrivers } from "../../hooks";
import { GenericTable } from "../../components";
import "./drivers-page.css";
import Button from "@mui/material/Button";
import EditDriverModal from "./edit-driver-modal";
import CreateDriverModal from "./create-driver-modal";

const cols = ["Nome", "Cartas", "Idade"];

export function DriversPage() {
  const [rows, setRows] = useState([]);
  const [driverIndex, setDriverIndex] = useState(-1);
  const [newDriverModal, setNewDriverModal] = useState(false);
  const { drivers, error, isLoading } = useDrivers();

  const deleteRow = (i) => {
    setRows([...rows.slice(0, i), ...rows.slice(i + 1)]);
  };

  useEffect(() => {
    if (drivers) {
      const rows = drivers.map((d) => d.toRow());
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
              isLoading={isLoading}
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
