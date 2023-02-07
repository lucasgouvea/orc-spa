
import { useState } from 'react';
import { GenericTable } from '../../components/generic-table';
import './motoristas-page.css';


export function MotoristasPage() {
    const [rows, setRows] = useState([
        ['Sebá', "A, B", 30],
        ['João', "A", 32],
        ['Renato', "A, B, C", 44],
    ])
    const [cols, setCols] = useState([
        "Nome",
        "Cartas",
        "Idade",
    ])

    const deleteRow = (i) => {
        setRows([...rows.slice(0, i), ...rows.slice(i + 1)])
    }

    return (
        <div className="motoristas-page">
            <GenericTable rows={rows} cols={cols} onEdit={(i) => alert(i)} onDelete={(i) => deleteRow(i)} />
        </div>
    );
}

