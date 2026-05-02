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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Close";

interface SearchBarProps {
  keyword: string;
  handleKeyword: (value: string) => void;
  suggestions?: string[];
  onSelect?: (value: string) => void;
}

export default function SearchBar({
  keyword,
  handleKeyword,
  suggestions = ["메가이상해꽃", "메가리자몽X", "메가리자몽Y", "메가거북왕"],
  onSelect,
}: SearchBarProps) {
  const showSuggestions = keyword.length > 0 && suggestions.length > 0;

  return (
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
        <Box
          sx={{
            p: "4px 12px",
            display: "flex",
            alignItems: "center",
            height: "48px",
          }}
        >
          <SearchIcon sx={{ ml: 1, color: "#3c5aa6", opacity: 0.7 }} />
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: "1.1rem" }}
            placeholder="포켓몬 이름을 검색해보세요!"
            value={keyword}
            onChange={(e) => handleKeyword(e.target.value)}
          />
          <IconButton
            onClick={() => handleKeyword("")}
            sx={{ visibility: keyword ? "visible" : "hidden", p: "8px" }}
          >
            <ClearIcon />
          </IconButton>
        </Box>

        {/* 추천 목록 섹션 */}
        <Collapse in={showSuggestions} timeout={300}>
          <Box sx={{ mx: 2, borderTop: "1px solid #f1f5f9" }} />
          <List sx={{ p: 0, maxHeight: "250px", overflowY: "auto" }}>
            {suggestions.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => {
                    onSelect?.(item);
                    handleKeyword(item);
                  }}
                  sx={{
                    py: 1.5,
                    px: 3,
                    "&:hover": {
                      bgcolor: "#f8fafc",
                      "& .MuiSvgIcon-root": { color: "#3c5aa6" }
                    },
                  }}
                >
                  <SearchIcon
                    sx={{ fontSize: "1rem", color: "#cbd5e1", mr: 2, transition: "0.2s" }}
                  />
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{
                      fontSize: "1rem",
                      color: "#334155",
                      fontWeight: 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Paper>
    </Box>
  );
}