
import { GenericTable } from '../../components/generic-table';
import './motoristas-page.css';

const rows = [
    ['Sebá', "A, B", 30],
    ['João', "A", 32],
    ['Renato', "A, B, C", 44],
];

const cols = [
    "Nome",
    "Cartas",
    "Idade",
]

export function MotoristasPage() {
    return (
        <div className="motoristas-page">
            <GenericTable rows={rows} cols={cols} />
        </div>
    );
}

