import { useEffect, useState } from "react";

import { useQueryClient } from "react-query";
import { useDrivers, useDeleteDriver } from "../../hooks";
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
  const queryClient = useQueryClient();

  const onSuccess = () => {
    alert("Motorista deletado(a) com sucesso!");
    queryClient.invalidateQueries("drivers");
  };

  const onError = () => {
    alert("Houve algum problema!");
  };

  const { mutate, isLoading: isLoadingDelete } = useDeleteDriver(onSuccess, onError);

  useEffect(() => {
    if (drivers) {
      const rows = drivers.sort((a, b) => a.name.localeCompare(b.name)).map((d) => d.toRow());
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
              onDelete={(i) =>
                window.confirm(`Deseja remover o(a) motorista "${drivers[i].name}"?`) === true &&
                mutate(drivers[i].id)
              }
              isLoading={isLoading || isLoadingDelete}
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
