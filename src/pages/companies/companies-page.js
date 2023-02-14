import { useEffect, useState } from "react";

import { useQueryClient } from "react-query";
import { useCompanies, useDeleteCompany } from "../../hooks";
import { GenericTable } from "../../components";
import "./companies-page.css";
import Button from "@mui/material/Button";
import EditCompanyModal from "./edit-company-modal";
import CreateCompanyModal from "./create-company-modal";

const cols = ["Nome", "Tipo"];

export function CompaniesPage() {
  const [rows, setRows] = useState([]);
  const [companyIndex, setCompanyIndex] = useState(-1);
  const [newCompanyModal, setNewCompanyModal] = useState(false);
  const { companies, error, isLoading } = useCompanies();
  const queryClient = useQueryClient();

  const onSuccess = () => {
    alert("Empresa deletada com sucesso!");
    queryClient.invalidateQueries("companies");
  };

  const onError = () => {
    alert("Houve algum problema!");
  };

  const { mutate, isLoading: isLoadingDelete } = useDeleteCompany(onSuccess, onError);

  useEffect(() => {
    if (companies) {
      const rows = companies.sort((a, b) => a.name.localeCompare(b.name)).map((d) => d.toRow());
      setRows(rows);
    }
  }, [companies]);

  return (
    <div className="companies-page">
      {companies && (
        <>
          <Button variant="contained" onClick={() => setNewCompanyModal(true)}>
            Nova empresa
          </Button>

          <div id="table">
            <GenericTable
              rows={rows}
              cols={cols}
              onEdit={(i) => setCompanyIndex(i)}
              onDelete={(i) =>
                window.confirm(`Deseja remover a empresa "${companies[i].name}" ?`) === true &&
                mutate(companies[i].id)
              }
              isLoading={isLoading || isLoadingDelete}
            />
            {/* Modals */}
            <EditCompanyModal
              onClose={() => setCompanyIndex(-1)}
              open={companyIndex !== -1}
              data={companies[companyIndex]}
            />
            <CreateCompanyModal onClose={() => setNewCompanyModal(false)} open={newCompanyModal} />
          </div>
        </>
      )}
    </div>
  );
}
