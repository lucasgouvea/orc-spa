import { LoginPostDTO } from "./login-dto";
import axios from "axios";
import { useMutation } from "react-query";

let endpoint = "https://orc-api.lucasgouvea.com";
if (process.env.NODE_ENV === "development") {
  endpoint = "";
}
const loginPath = "/v1/login";

export function useLogin(onSuccess, onError) {
  const { mutate, isLoading } = useMutation(
    (login) =>
      axios.post(`${endpoint}${loginPath}`, new LoginPostDTO(login)).then(({ data }) => data),
    { onSuccess, onError }
  );
  return { mutate, isLoading };
}
