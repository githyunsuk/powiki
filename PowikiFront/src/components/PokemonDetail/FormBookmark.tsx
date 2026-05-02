import { Box } from "@mui/material";

interface BookmarkItem {
  id: string | number;
  label: string;
}

interface FormBookmarkProps {
  items: BookmarkItem[];
  activeId: string | number | null;
  onSelect: (id: any) => void;
  accentColor: string;
  side: "left" | "right";
}

export default function FormBookmark({ items, activeId, onSelect, accentColor, side }: FormBookmarkProps)  {
  const isLeft = side === "left";

  return (
    <Box
      sx={{
        position: "absolute",
        [side]: { xs: -35, md: -45 }, 
        top: 40,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        zIndex: 1,
      }}
    >
      {items.map((item) => {
        const isSelected = activeId === item.id;
        
        return (
          <Box
            key={item.id}
            onClick={() => onSelect(item.id)}
            sx={{
              width: { xs: "35px", md: "45px" },
              minHeight: "80px",
              padding: "15px 4px",
              fontSize: "0.85rem",
              textAlign: "center",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              userSelect: "none",
              transition: isLeft ? "all 0.2s" : "none", 
              borderRadius: isLeft ? "10px 0 0 10px" : "0 10px 10px 0",
              backgroundColor: isSelected ? "#fff" : "#f1f5f9",
              color: isSelected ? accentColor : "#94a3b8",
              fontWeight: isSelected ? 900 : 600,
              boxShadow: isSelected 
                ? `${isLeft ? "-4px" : "4px"} 0 10px rgba(0,0,0,0.08)` 
                : "none",
              border: `1px solid ${isSelected ? "#ddd" : "transparent"}`,
              [isLeft ? "borderRight" : "borderLeft"]: isSelected ? "1px solid #fff" : "none",
              [isLeft ? "mr" : "ml"]: isSelected ? "-1px" : 0,
              "&:hover": { color: accentColor },
            }}
          >
            {item.label.split("").map((char, i) => (
              <span key={i} style={{ lineHeight: 1.1 }}>
                {char}
              </span>
            ))}
          </Box>
        );
      })}
    </Box>
  );
};

