import { Box, Typography } from "@mui/material";
import { COLUMN_WIDTHS } from "../../pages/PokemonMove";

export default function MoveTabHeader() {

  return (
    <Box sx={{ display: "flex", px: "24px", mb: 1.5, color: "text.secondary", alignItems: "center" }}>
      <Typography variant="caption" sx={{ width: COLUMN_WIDTHS.name, fontWeight: "bold" }}>기술명</Typography>
      <Typography variant="caption" sx={{ width: COLUMN_WIDTHS.type, fontWeight: "bold", textAlign: "center" }}>타입</Typography>
      <Typography variant="caption" sx={{ width: COLUMN_WIDTHS.category, fontWeight: "bold", textAlign: "center" }}>분류</Typography>
      <Typography variant="caption" sx={{ width: COLUMN_WIDTHS.power, fontWeight: "bold", textAlign: "center" }}>위력</Typography>
      <Typography variant="caption" sx={{ width: COLUMN_WIDTHS.accuracy, fontWeight: "bold", textAlign: "center" }}>명중</Typography>
      <Typography variant="caption" sx={{ width: COLUMN_WIDTHS.pp, fontWeight: "bold", textAlign: "center" }}>PP</Typography>
      <Typography variant="caption" sx={{ width: COLUMN_WIDTHS.description, fontWeight: "bold", pl: 2 }}>효과 설명</Typography>
      <Typography variant="caption" sx={{ width: COLUMN_WIDTHS.etc, fontWeight: "bold", textAlign: "center" }}>기타</Typography>
    </Box>
  )
}