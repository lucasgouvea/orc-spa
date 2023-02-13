import { useQuery } from "react-query";
import { Vehicle } from "./vehicle";
import { VehiclePatchDTO, VehiclePostDTO } from "./vehicle-dto";
import axios from "axios";
import { useMutation } from "react-query";

let endpoint = "https://orc-api.lucasgouvea.com";
if (process.env.NODE_ENV === "development") {
  endpoint = "";
}
const vehiclesPath = "/v1/vehicles";

export function useVehicles() {
  const {
    isLoading,
    error,
    data: vehicles
  } = useQuery("vehicles", () =>
    axios(`${endpoint}${vehiclesPath}`).then(({ data: vehicles }) =>
      vehicles.map((d) => new Vehicle(d))
    )
  );

  return {
    isLoading,
    error,
    vehicles
  };
}

export function useCreateVehicle(onSuccess, onError) {
  const { mutate, isLoading } = useMutation(
    (vehicle) =>
      axios
        .post(`${endpoint}${vehiclesPath}`, new VehiclePostDTO(vehicle))
        .then(({ data }) => data),
    { onSuccess, onError }
  );
  return { mutate, isLoading };
}

export function useUpdateVehicle(onSuccess, onError) {
  const { mutate, isLoading } = useMutation(
    (vehicle) =>
      axios
        .patch(`${endpoint}${vehiclesPath}/${vehicle.id}`, new VehiclePatchDTO(vehicle))
        .then(({ data }) => {
          return data;
        }),
    { onSuccess, onError }
  );
  return { mutate, isLoading };
}

export function useDeleteVehicle(onSuccess, onError) {
  const { mutate, isLoading } = useMutation(
    (id) =>
      axios.delete(`${endpoint}${vehiclesPath}/${id}`).then(({ data }) => {
        return data;
      }),
    { onSuccess, onError }
  );
  return { mutate, isLoading };
}
