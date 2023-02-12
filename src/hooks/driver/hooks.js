import { useQuery } from "react-query";
import { Driver } from "./driver";
import { DriverPatchDTO, DriverPostDTO } from "./driver-dto";
import axios from "axios";
import { useMutation } from "react-query";

const driversPath = "/v1/drivers";

export function useDrivers() {
  const {
    isLoading,
    error,
    data: drivers
  } = useQuery("drivers", () =>
    axios(driversPath).then(({ data: drivers }) => drivers.map((d) => new Driver(d)))
  );

  return {
    isLoading,
    error,
    drivers
  };
}

export function useCreateDriver(onSuccess, onError) {
  const { mutate, isLoading } = useMutation(
    (driver) => axios.post(driversPath, new DriverPostDTO(driver)).then(({ data }) => data),
    { onSuccess, onError }
  );
  return { mutate, isLoading };
}

export function useUpdateDriver(onSuccess, onError) {
  const { mutate, isLoading } = useMutation(
    (driver) =>
      axios.patch(`${driversPath}/${driver.id}`, new DriverPatchDTO(driver)).then(({ data }) => {
        return data;
      }),
    { onSuccess, onError }
  );
  return { mutate, isLoading };
}

export function useDeleteDriver(onSuccess, onError) {
  const { mutate, isLoading } = useMutation(
    (id) =>
      axios.delete(`${driversPath}/${id}`).then(({ data }) => {
        return data;
      }),
    { onSuccess, onError }
  );
  return { mutate, isLoading };
}
