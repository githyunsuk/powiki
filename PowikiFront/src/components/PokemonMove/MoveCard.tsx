import { Box, Card, Typography } from "@mui/material";
import { MoveData } from "../../types/Pokemon";
import TypeBadge from "../common/TypeBadge";
import { COLUMN_WIDTHS } from "../../pages/PokemonMove";
import MoveBadge from "./MoveBadge";
import React from "react";

interface MoveCardProps {
  move: MoveData
}

function MoveCard({ move }: MoveCardProps) {

  const typeColor = move.type.color || "#e0e0e0";

  return (
    <Card
      key={move.id}
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        p: "16px 24px",
        borderRadius: "12px",
        border: `1px solid #eee`, 
        borderLeft: `6px solid ${typeColor}`, 
        bgcolor: "#ffffff",
        transition: "all 0.2s ease-in-out",
        minHeight: "80px",      
        boxSizing: "border-box", 
        "&:hover": {
          transform: "translateX(1px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }
      }}
    >
      <Typography sx={{ width: COLUMN_WIDTHS.name, fontWeight: "bold", fontSize: "1rem" }}>
        {String(move.id).padStart(3, '0')} {move.name}
      </Typography>

      <Box sx={{ width: COLUMN_WIDTHS.type, display: "flex", justifyContent: "center" }}>
        <TypeBadge name={move.type.name} color={move.type.color} />
      </Box>

      <Typography variant="body2" sx={{ width: COLUMN_WIDTHS.category, textAlign: "center", color: "text.secondary" }}>
        {move.moveClass.name}
      </Typography>

      <Typography variant="body2" sx={{ width: COLUMN_WIDTHS.power, textAlign: "center", fontWeight: 700 }}>
        {move.power ?? "—"}
      </Typography>

      <Typography variant="body2" sx={{ width: COLUMN_WIDTHS.accuracy, textAlign: "center" }}>
        {move.accuracy ?? "—"}
      </Typography>

      <Typography variant="body2" sx={{ width: COLUMN_WIDTHS.pp, textAlign: "center", color: "text.secondary" }}>
        {move.pp}
      </Typography>

      <Box sx={{ width: COLUMN_WIDTHS.description, pl: 2 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            color: "#666", 
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2, 
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            wordBreak: "keep-all"
          }}
        >
          {move.description}
        </Typography>
      </Box>
      
      {/* 뱃지 */}
      <Box sx={{ width: COLUMN_WIDTHS.etc, display: "flex", justifyContent: "center", gap: 0.5, flexWrap: "wrap" }}>
        {[move.ailment, move.category, move.target].map((item, index) => (
          item && <MoveBadge key={index} name={item.name} description={item.description} />
        ))}
      </Box>

    </Card>
  )
}

export default React.memo(MoveCard);