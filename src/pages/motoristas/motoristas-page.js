
import { Typography } from '@mui/material';
import { useState } from 'react';
import { GenericTable, Modal } from '../../components';
import './motoristas-page.css';
import Button from '@mui/material/Button';

const motoristas = [
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

export function MotoristasPage() {
    const [rows, setRows] = useState([
        [motoristas[0].name, motoristas[0].licenses.join(","), motoristas[0].age],
        [motoristas[1].name, motoristas[1].licenses.join(","), motoristas[1].age],
        [motoristas[2].name, motoristas[2].licenses.join(","), motoristas[2].age],
    ])
    const [cols, setCols] = useState([
        "Nome",
        "Cartas",
        "Idade",
    ])
    const [motoristaIndex, setMotoristaIndex] = useState(-1);



    const deleteRow = (i) => {
        setRows([...rows.slice(0, i), ...rows.slice(i + 1)])
    }

    return (
        <div className="motoristas-page">
            <Button variant="contained">Novo motorista</Button>

            <div id="table">
                <GenericTable
                    rows={rows}
                    cols={cols}
                    onEdit={(i) => setMotoristaIndex(i)} onDelete={(i) => deleteRow(i)}
                    width="100%"
                />
                <Modal
                    open={motoristaIndex !== -1}
                    onClose={() => setMotoristaIndex(-1)}
                    onUpdate={() => setMotoristaIndex(-1)}
                    onCancel={() => setMotoristaIndex(-1)}
                    data={motoristas[motoristaIndex]}
                />
            </div>
        </div>
    );
}

