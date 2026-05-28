import { Box, Typography, Card, Tooltip, Chip, Tabs, Tab, Paper } from "@mui/material";
import TypeFilter from "../components/features/TypeFilter";
import MoveSearchBar from "../components/PokemonMove/MoveSearchBar";
import TypeBadge from "../components/common/TypeBadge";

interface MoveData {
  id: number;
  name: string;
  type: {
    id: number;
    name: string;
    color: string;
  };
  category: {
    id: number;
    name: string;
    description: string;
  };
  ailment: {
    id: number;
    name: string;
    description: string;
  };
  class:{
    id: number;
    name: string;
    description: string;
  };
  target: {
    id: number;
    name: string;
    description: string;
  };
  power: number;
  accuracy: number;
  pp: number;
  description: string;
}

const dummyMoves: MoveData[] = [
  {
    id: 1,
    name: "10만볼트",
    type: {
      id: 1,
      name: "전기",
      color: "#F7D02C"
    },
    category: {
      id: 1,
      name: "공격",
      description: "상대에게 피해를 입힙니다."
    },
    ailment: {
      id: 1,
      name: "마비",
      description: "전투 도중 12.5%의 확률로 행동이 불가능하게 되며, 스피드가 50% 감소된다."
    },
    class:{
      id: 1,
      name: "물리",
      description: "",
    },
    target: {
      id: 1,
      name: "단일 대상",
      description: "필드 위의 포켓몬 중 1마리를 대상으로 선택합니다.",
    },
    power: 90,
    accuracy: 100,
    pp: 15,
    description: "10만 볼트의 강한 전격을 상대에게 퍼부어 공격한다. 10% 확률로 상대를 마비 상태로 만든다.",
  },
];

export default function PokemonMove() {

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mb: 4 }}>
        <MoveSearchBar />
      </Box>

      <Box sx={{ maxWidth: "1250px", margin: "0 auto", px: 2 }}>
        <Tabs
          sx={{
            minHeight: "auto",
            "& .MuiTabs-indicator": { display: "none" },
            "& .MuiTabs-flexContainer": {
              position: "relative",
              zIndex: 1,
              top: "1px",
            }
          }}
        >
          <Tab label="전체" sx={tabStyle} />
          <Tab label="물리" sx={tabStyle} />
          <Tab label="특수" sx={tabStyle} />
          <Tab label="변화" sx={tabStyle} />
        </Tabs>
        
        <Paper 
          elevation={0} 
          sx={{
            borderRadius: "0 20px 20px 20px", 
            border: "1px solid #ddd", 
            bgcolor: "#fff", 
            overflow: "hidden"
          }}
        >
          <Box sx={{ p: { xs: 2, md: 4 } }}>
            
            <TypeFilter />

            <Box sx={{ width: "100%", mt: 5 }}>
              
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

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {dummyMoves.map((move) => {
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
                        "&:hover": {
                          transform: "translateX(1px)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        }
                      }}
                    >
                      <Typography sx={{ width: COLUMN_WIDTHS.name, fontWeight: "bold", fontSize: "1rem" }}>
                        {move.name}
                      </Typography>

                      <Box sx={{ width: COLUMN_WIDTHS.type, display: "flex", justifyContent: "center" }}>
                        <TypeBadge name={move.type.name} color={move.type.color} />
                      </Box>

                      <Typography variant="body2" sx={{ width: COLUMN_WIDTHS.category, textAlign: "center", color: "text.secondary" }}>
                        {move.class.name}
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
                        {move.ailment && (
                          <Tooltip title={move.ailment.description} arrow>
                          <Chip 
                            label={move.ailment.name} 
                            size="small" 
                            sx={{ 
                              fontSize: "10px", 
                              height: "20px", 
                              bgcolor: "#f5f5f5", 
                              color: "#616161",
                              border: "1px solid #ddd"
                            }}
                          />
                          </Tooltip>
                        )}
                        {move.category && (
                          <Tooltip title={move.category.description} arrow>
                          <Chip 
                            label={move.category.name} 
                            size="small" 
                            sx={{ 
                              fontSize: "10px", 
                              height: "20px", 
                              bgcolor: "#f5f5f5", 
                              color: "#616161",
                              border: "1px solid #ddd"
                            }}
                          />
                          </Tooltip>
                        )}
                        {move.target && (
                          <Tooltip title={move.target.description} arrow>
                          <Chip 
                            label={move.target.name} 
                            size="small" 
                            sx={{ 
                              fontSize: "10px", 
                              height: "20px", 
                              bgcolor: "#f5f5f5", 
                              color: "#616161",
                              border: "1px solid #ddd"
                            }}
                          />
                          </Tooltip>
                        )}
                      </Box>
                    </Card>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

const tabStyle = {
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "0.9rem",
  minWidth: "100px",
  padding: "10px 24px",
  borderRadius: "12px 12px 0 0",
  marginRight: "5px",
  backgroundColor: "#eee",
  color: "#666",
  transition: "0.2s",
  border: "1px solid #ddd",
  borderBottom: "none",
  "&.Mui-selected": {
    backgroundColor: "#fff",
    color: "#e3350d",
    fontWeight: 900,
    zIndex: 2,
  },
};

const COLUMN_WIDTHS = {
  name: "15%",
  type: "10%",
  category: "8%",
  power: "7%",
  accuracy: "7%",
  pp: "7%",
  description: "31%",
  etc: "15%",
};