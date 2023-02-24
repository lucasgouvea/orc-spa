import { useQuery } from "react-query";
import { Driver } from "./driver";
import { DriverPatchDTO, DriverPostDTO } from "./driver-dto";
import axios from "axios";
import { useMutation } from "react-query";
import { useHeaders } from "..";

let endpoint = "https://orc-api.lucasgouvea.com";
if (process.env.NODE_ENV === "development") {
  endpoint = "";
}
const driversPath = "/v1/drivers";

export function useDrivers() {
  const headers = useHeaders();
  const {
    isLoading,
    error,
    data: drivers
  } = useQuery("drivers", () =>
    axios(`${endpoint}${driversPath}`, { headers }).then(({ data: drivers }) =>
      drivers.map((d) => new Driver(d))
    )
  );

  return {
    isLoading,
    error,
    drivers
  };
}

export function useCreateDriver(onSuccess, onError) {
  const headers = useHeaders();
  const { mutate, isLoading } = useMutation(
    (driver) =>
      axios
        .post(`${endpoint}${driversPath}`, new DriverPostDTO(driver), { headers })
        .then(({ data }) => data),
    { onSuccess, onError }
  );
  return { mutate, isLoading };
}

export function useUpdateDriver(onSuccess, onError) {
  const headers = useHeaders();
  const { mutate, isLoading } = useMutation(
    (driver) =>
      axios
        .patch(`${endpoint}${driversPath}/${driver.id}`, new DriverPatchDTO(driver), { headers })
        .then(({ data }) => {
          return data;
        }),
    { onSuccess, onError }
  );
  return { mutate, isLoading };
}

export function useDeleteDriver(onSuccess, onError) {
  const headers = useHeaders();
  const { mutate, isLoading } = useMutation(
    (id) =>
      axios.delete(`${endpoint}${driversPath}/${id}`, headers).then(({ data }) => {
        return data;
      }),
    { onSuccess, onError }
  );
  return { mutate, isLoading };
}
