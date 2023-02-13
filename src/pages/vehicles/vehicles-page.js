import { useEffect, useState } from "react";

import { useQueryClient } from "react-query";
import { useVehicles, useDeleteVehicle } from "../../hooks";
import { GenericTable } from "../../components";
import "./vehicles-page.css";
import Button from "@mui/material/Button";
import EditVehicleModal from "./edit-vehicle-modal";
import CreateVehicleModal from "./create-vehicle-modal";

const cols = ["Modelo", "Placa"];

export function VehiclesPage() {
  const [rows, setRows] = useState([]);
  const [vehicleIndex, setVehicleIndex] = useState(-1);
  const [newVehicleModal, setNewVehicleModal] = useState(false);
  const { vehicles, error, isLoading } = useVehicles();
  const queryClient = useQueryClient();

  const onSuccess = () => {
    alert("Veículo deletado com sucesso!");
    queryClient.invalidateQueries("vehicles");
  };

  const onError = () => {
    alert("Houve algum problema!");
  };

  const { mutate, isLoading: isLoadingDelete } = useDeleteVehicle(onSuccess, onError);

  useEffect(() => {
    if (vehicles) {
      const rows = vehicles.sort((a, b) => a.name.localeCompare(b.name)).map((d) => d.toRow());
      setRows(rows);
    }
  }, [vehicles]);

  return (
    <div className="vehicles-page">
      {vehicles && (
        <>
          <Button variant="contained" onClick={() => setNewVehicleModal(true)}>
            Novo veículo
          </Button>

          <div id="table">
            <GenericTable
              rows={rows}
              cols={cols}
              onEdit={(i) => setVehicleIndex(i)}
              onDelete={(i) =>
                window.confirm(
                  `Deseja remover o(a) veículo "${vehicles[i].model}", placa "${vehicles[i].licensePlate}" ?`
                ) === true && mutate(vehicles[i].id)
              }
              isLoading={isLoading || isLoadingDelete}
            />
            {/* Modals */}
            <EditVehicleModal
              onClose={() => setVehicleIndex(-1)}
              open={vehicleIndex !== -1}
              data={vehicles[vehicleIndex]}
            />
            <CreateVehicleModal onClose={() => setNewVehicleModal(false)} open={newVehicleModal} />
          </div>
        </>
      )}
    </div>
  );
}
