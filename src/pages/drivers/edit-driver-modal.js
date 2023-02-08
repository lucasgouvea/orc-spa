import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

export default function EditDriverModal({ onUpdate, onCancel, data }) {
  return (
    <>
      <Box style={{ marginTop: 50, width: 400 }}>
        <TextField
          id="name"
          label="Nome"
          variant="outlined"
          error={false}
          helperText={false} //"Incorrect entry."
          fullWidth
          value={data?.name}
        />
      </Box>

      <Box style={{ marginTop: 20, width: 400 }}>
        <Typography id="title" variant="h8">
          Cartas:
        </Typography>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Checkbox checked={data?.licenses.find((license) => license === "A")} />A
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Checkbox checked={data?.licenses.find((license) => license === "B")} />B
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Checkbox checked={data?.licenses.find((license) => license === "C")} />C
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Checkbox checked={data?.licenses.find((license) => license === "D")} />D
      </Box>

      <Box style={{ marginTop: 20, width: 100 }}>
        <TextField
          id="age"
          label="Idade"
          variant="outlined"
          error={false}
          helperText={false} //"Incorrect entry."
          value={data?.age}
        />
      </Box>

      <Box
        style={{ marginTop: 50, display: "flex", width: "100%", justifyContent: "space-around" }}>
        <Button variant="contained" onClick={onUpdate}>
          Atualizar
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancelar
        </Button>
      </Box>
    </>
  );
}
