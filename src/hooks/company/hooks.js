import { useQuery } from "react-query";
import { Company } from "./company";
import { CompanyPatchDTO, CompanyPostDTO } from "./company-dto";
import axios from "axios";
import { useMutation } from "react-query";

let endpoint = "https://orc-api.lucasgouvea.com";
if (process.env.NODE_ENV === "development") {
  endpoint = "";
}
const companiesPath = "/v1/companies";

export function useCompanies() {
  const {
    isLoading,
    error,
    data: companies
  } = useQuery("companies", () =>
    axios(`${endpoint}${companiesPath}`).then(({ data: companies }) =>
      companies.map((d) => new Company(d))
    )
  );

  return {
    isLoading,
    error,
    companies
  };
}

export function useCreateCompany(onSuccess, onError) {
  const { mutate, isLoading } = useMutation(
    (company) =>
      axios
        .post(`${endpoint}${companiesPath}`, new CompanyPostDTO(company))
        .then(({ data }) => data),
    { onSuccess, onError }
  );
  return { mutate, isLoading };
}

export function useUpdateCompany(onSuccess, onError) {
  const { mutate, isLoading } = useMutation(
    (company) =>
      axios
        .patch(`${endpoint}${companiesPath}/${company.id}`, new CompanyPatchDTO(company))
        .then(({ data }) => {
          return data;
        }),
    { onSuccess, onError }
  );
  return { mutate, isLoading };
}

export function useDeleteCompany(onSuccess, onError) {
  const { mutate, isLoading } = useMutation(
    (id) =>
      axios.delete(`${endpoint}${companiesPath}/${id}`).then(({ data }) => {
        return data;
      }),
    { onSuccess, onError }
  );
  return { mutate, isLoading };
}
