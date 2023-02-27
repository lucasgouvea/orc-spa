import { useEffect, useState } from "react";

import { useQueryClient } from "react-query";
//import { useRoutes, useDeleteRoute } from "../../hooks";
import { GenericTable } from "../../components";
import Button from "@mui/material/Button";

const cols = ["Modelo", "Placa"];

export function RoutesPage() {
  const [rows, setRows] = useState([]);
  const [routeIndex, setRouteIndex] = useState(-1);
  const [newRouteModal, setNewRouteModal] = useState(false);
  //const { routes, error, isLoading } = useRoutes();
  const queryClient = useQueryClient();

  const onSuccess = () => {
    alert("Veículo deletado com sucesso!");
    queryClient.invalidateQueries("routes");
  };

  const onError = () => {
    alert("Houve algum problema!");
  };

  /*   useEffect(() => {
    if (routes) {
      const rows = routes.sort((a, b) => a.name.localeCompare(b.name)).map((d) => d.toRow());
      setRows(rows);
    }
  }, [routes]); */

  return (
    <div className="routes-page">
      {/*       {routes && (
        <>
          <Button variant="contained" onClick={() => setNewRouteModal(true)}>
            Novo veículo
          </Button>

          <div id="table">
            <GenericTable
              rows={rows}
              cols={cols}
              onEdit={(i) => setRouteIndex(i)}
              onDelete={(i) =>
                window.confirm(
                  `Deseja remover o(a) veículo "${routes[i].model}", placa "${routes[i].licensePlate}" ?`
                ) === true && mutate(routes[i].id)
              }
              isLoading={isLoading || isLoadingDelete}
            />
          </div>
        </>
      )} */}
    </div>
  );
}
