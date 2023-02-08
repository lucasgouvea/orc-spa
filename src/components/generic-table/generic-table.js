import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { StyledTableCell, StyledTableRow } from "./styled";
import { FaEdit, FaTrash } from "react-icons/fa";

function Icons({ index, onEdit, onDelete }) {
  return (
    <div className="icons">
      <FaEdit
        className={"edit-icon"}
        color="#042440"
        size="18"
        onClick={() => onEdit(index)}
        style={{ cursor: "pointer" }}
      />
      <FaTrash
        className={"trash-icon"}
        color="#042440"
        size="18"
        style={{ marginLeft: 10, cursor: "pointer" }}
        onClick={() => onDelete(index)}
      />
    </div>
  );
}

export function GenericTable({ width, rows, cols: _cols, onEdit, onDelete }) {
  const cols = [..._cols, "Ações"];

  return (
    <Table sx={{ minWidth: 650, width: width }} aria-label="simple table">
      <TableHead>
        <StyledTableRow>
          {cols.map((col, i) =>
            i === 0 ? (
              <StyledTableCell key={i}>{col}</StyledTableCell>
            ) : (
              <StyledTableCell key={i} align="right">
                {col}
              </StyledTableCell>
            )
          )}
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, i) => (
          <StyledTableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {row.map((item, itemIndex) =>
              itemIndex === 0 ? (
                <StyledTableCell component="th" scope="row" key={itemIndex}>
                  {item}
                </StyledTableCell>
              ) : (
                <StyledTableCell align="right" key={itemIndex}>
                  {item}
                </StyledTableCell>
              )
            )}
            <StyledTableCell align="right" key={i}>
              <Icons index={i} onEdit={onEdit} onDelete={onDelete} />
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}
