import {
  IconButton,
  InputBase,
  Paper,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  ClickAwayListener, 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Close";
import { usePokemonStore } from "../../store/pokemonStore";
import { PokemonListData } from "../../types/Pokemon";
import { useMemo, useState } from "react";
import { getPokemonImageUrl } from "../../utils/pokemonHelper";
import { useNavigate } from "react-router-dom";

export default function DetailSearchBar() {
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate();
  
  const pokemonListData = usePokemonStore((state) => state.pokemonListData);
  
  const suggestions = useMemo(() => {
    if (!keyword.trim()) return [];
    return pokemonListData
      .filter(
        (pokemon: PokemonListData) =>
          pokemon.name.includes(keyword) && pokemon.formType === "default"
      )
      .slice(0, 10);
  }, [keyword, pokemonListData]);

  const showSuggestions = open && keyword.length > 0 && suggestions.length > 0;

  const handleKeyword = (value: string) => {
    setKeyword(value);
    setOpen(true); 
  };

  const handleClickAway = () => {
    setOpen(false); 
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: "relative", width: "100%", maxWidth: 500, height: "48px", zIndex: 100 }}>
        <Paper
          elevation={showSuggestions ? 8 : 3}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            borderRadius: showSuggestions ? "24px" : "50px",
            border: "2px solid #3c5aa6",
            backgroundColor: "#fff",
            overflow: "hidden",
            transition: "all 0.3s ease-in-out",
          }}
        >
          {/* 검색창 본체 영역 */}
          <Box sx={{ p: "4px 12px", display: "flex", alignItems: "center", height: "48px" }}>
            <SearchIcon sx={{ ml: 1, color: "#3c5aa6", opacity: 0.7 }} />
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: "1.1rem" }}
              placeholder="포켓몬 이름을 검색해보세요!"
              value={keyword}
              onChange={(e) => handleKeyword(e.target.value)}
              onFocus={() => setOpen(true)} 
            />
            <IconButton
              onClick={() => {
                handleKeyword("");
                setOpen(false);
              }}
              sx={{ visibility: keyword ? "visible" : "hidden", p: "8px" }}
            >
              <ClearIcon />
            </IconButton>
          </Box>

          {/* 추천 목록 섹션 */}
          <Collapse in={showSuggestions} timeout={300}>
            <Box sx={{ mx: 2, borderTop: "1px solid #f1f5f9" }} />
            <List sx={{ p: 0, maxHeight: "350px", overflowY: "auto" }}>
              {suggestions.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    onClick={() => {navigate(`/pokedex/${item.id}`)}}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      py: 1,
                      px: 3,
                      "&:hover": { bgcolor: "#f8fafc" },
                    }}
                  >
                    <Typography
                      sx={{
                        width: "45px",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "#94a3b8",
                        fontFamily: "monospace",
                      }}
                    >
                      {String(item.id).padStart(4, "0")}
                    </Typography>

                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        fontSize: "1rem",
                        color: "#334155",
                        fontWeight: 600,
                      }}
                    />

                    <Box
                      component="img"
                      src={getPokemonImageUrl(item.id, "PIXEL")}
                      alt={item.name}
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: "contain",
                        imageRendering: "pixelated",
                        "&": {
                          imageRendering: "crisp-edges",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Paper>
      </Box>
    </ClickAwayListener>
  );
}