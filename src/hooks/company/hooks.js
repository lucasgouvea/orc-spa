import { useQuery } from "react-query";
import { Company } from "./company";
import { CompanyPatchDTO, CompanyPostDTO } from "./company-dto";
import axios from "axios";
import { useMutation } from "react-query";
import { useHeaders } from "..";

let endpoint = "https://orc-api.lucasgouvea.com";
if (process.env.NODE_ENV === "development") {
  endpoint = "";
}
const companiesPath = "/v1/companies";

export function useCompanies() {
  const headers = useHeaders();
  const {
    isLoading,
    error,
    data: companies
  } = useQuery("companies", () =>
    axios(`${endpoint}${companiesPath}`, { headers }).then(({ data: companies }) =>
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
  const headers = useHeaders();
  const { mutate, isLoading } = useMutation(
    (company) =>
      axios
        .post(`${endpoint}${companiesPath}`, { headers }, new CompanyPostDTO(company))
        .then(({ data }) => data),
    { onSuccess, onError }
  );
  return { mutate, isLoading };
}

export function useUpdateCompany(onSuccess, onError) {
  const headers = useHeaders();
  const { mutate, isLoading } = useMutation(
    (company) =>
      axios
        .patch(
          `${endpoint}${companiesPath}/${company.id}`,
          { headers },
          new CompanyPatchDTO(company)
        )
        .then(({ data }) => {
          return data;
        }),
    { onSuccess, onError }
  );
  return { mutate, isLoading };
}

export function useDeleteCompany(onSuccess, onError) {
  const headers = useHeaders();
  const { mutate, isLoading } = useMutation(
    (id) =>
      axios.delete(`${endpoint}${companiesPath}/${id}`, { headers }).then(({ data }) => {
        return data;
      }),
    { onSuccess, onError }
  );
  return { mutate, isLoading };
}
