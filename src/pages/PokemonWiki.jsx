import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
  Radio,
  RadioGroup,
} from "@mui/material";
import PokemonList from "../components/PokemonList";
import { pokemonTypes } from "../constants/pokemon";
import { useOutletContext } from "react-router-dom";

function PokemonWiki() {
  const { selectedTypes, handleType, currentGen, handleGen } =
    useOutletContext();
  const GENERATIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <Box sx={{ width: "100%" }}>
      {/* 1. 세대 선택 필터 (Radio) */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 2 },
          mb: 2, // 타입 필터와의 간격
          borderRadius: "20px",
          backgroundColor: "#f5f5f5", // 배경색을 살짝 다르게 하여 구분
          border: "1px solid #e0e0e0",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            mb: 1.5,
            fontWeight: 900,
            color: "#555",
            px: 1,
            fontSize: "0.8rem",
          }}
        >
          📅 세대 선택
        </Typography>

        <RadioGroup
          row
          value={currentGen}
          onChange={(e) => handleGen(e.target.value)}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(3, 1fr)",
              sm: "repeat(5, 1fr)",
              md: "repeat(9, 1fr)",
            },
            gap: 1,
          }}
        >
          {GENERATIONS.map((gen) => {
            const isSelected = currentGen === gen;
            return (
              <FormControlLabel
                key={gen}
                value={gen}
                control={<Radio sx={{ display: "none" }} />} // 라디오 버튼 숨김
                label={`${gen}세대`}
                sx={{
                  margin: 0,
                  height: "36px",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  border: isSelected ? "2px solid #333" : "2px solid #ddd",
                  backgroundColor: isSelected ? "#333" : "#fff",
                  color: isSelected ? "#fff" : "#888",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  "&:hover": {
                    borderColor: "#333",
                  },
                }}
              />
            );
          })}
        </RadioGroup>
      </Paper>

      {/* 2. 타입 필터 영역 (기존 디자인 유지) */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 5,
          borderRadius: "24px",
          backgroundColor: "#fcfcfc",
          border: "1px solid #f0f0f0",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ mb: 2, fontWeight: 900, color: "#222", px: 1 }}
        >
          🏷️ 타입 필터
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(3, 1fr)",
              sm: "repeat(6, 1fr)",
              md: "repeat(9, 1fr)",
            },
            gap: 1.5,
          }}
        >
          {Object.entries(pokemonTypes).map(([key, value]) => {
            const isSelected = selectedTypes.includes(key);
            const typeName = value.label;
            const typeColor = value.color;

            return (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleType(key)}
                    sx={{ display: "none" }}
                  />
                }
                label={typeName}
                sx={{
                  margin: 0,
                  height: "40px",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border: `2px solid ${typeColor}`,
                  backgroundColor: isSelected ? typeColor : "transparent",
                  color: isSelected ? "#fff" : typeColor,
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                  "&:active": {
                    transform: "scale(0.95)",
                  },
                }}
              />
            );
          })}
        </Box>
      </Paper>

      <PokemonList selectedTypes={selectedTypes} />
    </Box>
  );
}

export default PokemonWiki;
