import { useQuery } from "react-query";
import { Driver } from "./driver";
import { DriverDTO } from "./driver-dto";
import axios from "axios";

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

export async function createDriver(driver) {
  const { data: response } = await axios.post(driversPath, new DriverDTO(driver));
  return response.data;
}
