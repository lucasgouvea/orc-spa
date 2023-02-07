import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { StyledTableCell, StyledTableRow } from './styled';



export function GenericTable({ width, rows, cols }) {
    return (
        <div style={{ width: width || "650px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <StyledTableRow>
                        {cols.map((col, i) => (
                            i === 0 ? <StyledTableCell>{col}</StyledTableCell> : <StyledTableCell align="right">{col}</StyledTableCell>)
                        )}
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) =>
                        <StyledTableRow
                            key={row}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {row.map((item, i) => (
                                i === 0 ? (
                                    <StyledTableCell component="th" scope="row">
                                        {item}
                                    </StyledTableCell>
                                ) : (
                                    <StyledTableCell align="right">{item}</StyledTableCell>
                                )
                            ))}
                        </StyledTableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}