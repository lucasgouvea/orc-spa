
import { useState } from 'react';
import { GenericTable, GenericModal } from '../../components';
import './drivers-page.css';
import Button from '@mui/material/Button';
import EditDriverModal from './edit-driver-modal';
import CreateDriverModal from './create-driver-modal';

const drivers = [
    {
        name: "Sebá",
        licenses: ["A", "B"],
        age: 30
    },
    {
        name: "João",
        licenses: ["A"],
        age: 32
    },
    {
        name: "Renato",
        licenses: ["A", "B", "C"],
        age: 44
    }
]

export function DriversPage() {
    const [rows, setRows] = useState([
        [drivers[0].name, drivers[0].licenses.join(","), drivers[0].age],
        [drivers[1].name, drivers[1].licenses.join(","), drivers[1].age],
        [drivers[2].name, drivers[2].licenses.join(","), drivers[2].age],
    ])
    const [cols, setCols] = useState([
        "Nome",
        "Cartas",
        "Idade",
    ])
    const [driverIndex, setDriverIndex] = useState(-1);
    const [newDriverModal, setNewDriverModal] = useState(false);




    const deleteRow = (i) => {
        setRows([...rows.slice(0, i), ...rows.slice(i + 1)])
    }

    return (
        <div className="drivers-page">
            <Button variant="contained" onClick={() => setNewDriverModal(true)}>Novo motorista</Button>

            <div id="table">
                <GenericTable
                    rows={rows}
                    cols={cols}
                    onEdit={(i) => setDriverIndex(i)} onDelete={(i) => deleteRow(i)}
                    width="100%"
                />
                <GenericModal
                    open={driverIndex !== -1}
                    data={drivers[driverIndex]}
                    title="Atualizar Driver"
                >
                    <EditDriverModal
                        onClose={() => setDriverIndex(-1)}
                        onUpdate={() => setDriverIndex(-1)}
                        onCancel={() => setDriverIndex(-1)}
                    />
                </GenericModal>
                <GenericModal
                    open={newDriverModal}
                    data={drivers[driverIndex]}
                    title="Cadastrar Driver"
                >
                    <CreateDriverModal
                        onClose={() => setNewDriverModal(false)}
                        onUpdate={() => setNewDriverModal(false)}
                        onCancel={() => setNewDriverModal(false)}
                    />
                </GenericModal>
            </div>
        </div>
    );
}

