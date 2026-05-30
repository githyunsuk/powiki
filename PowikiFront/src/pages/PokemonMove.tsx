import { Box, Typography, Card, Tooltip, Chip, Tabs, Tab, Paper, CircularProgress } from "@mui/material";
import TypeFilter from "../components/features/TypeFilter";
import MoveSearchBar from "../components/PokemonMove/MoveSearchBar";
import TypeBadge from "../components/common/TypeBadge";
import { useEffect, useRef, useState } from "react";
import api from "../api/axiosInstance";
import Loading from "../components/common/Loading";

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
  moveClass:{
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

export default function PokemonMove() {

  const [moveData, setMoveData] = useState<MoveData[]>([]);
  const [loading, setLoading] = useState(false);
  const [itemLimit, setItemLimit] = useState(40);
  const observerTarget = useRef(null);

  // 기술 데이터 불러오기
  useEffect(() => {
    const getMoveData = async() => {
      try{
        setLoading(true);
        const response = await api.get("/api/moves");
        setMoveData(response.data.data);
        console.log(response.data);
      } catch(error) {
        console.log("기술 데이터 정보 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    }
    getMoveData();
  }, [])

  useEffect(() => {
    setItemLimit((prev) => (prev !== 40 ? 40 : prev));
  }, [moveData]); // 나중에 필터링 로직 짜면 filteredData로 교체

  useEffect(() => {
    if (moveData.length === 0 || itemLimit >= moveData.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setItemLimit((prev) => prev + 20);
        }
      }, { threshold: 1.0, rootMargin: "100px" }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);

    return () => observer.disconnect();
  }, [moveData.length]);

  const displayData = moveData.slice(0, itemLimit);

  if (loading || !moveData) return <Loading />

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
                {displayData.map((move) => {
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
                        minHeight: "80px",      // 모든 카드의 최소 높이를 통일 (설명 2줄 기준)
                        boxSizing: "border-box", // 패딩이 높이에 영향을 주지 않도록 설정
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

                {itemLimit < moveData.length && (
                <Box
                  ref={observerTarget}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 5, 
                    gap: 2
                  }}
                >
                  <CircularProgress size={30} sx={{ color: "#e3350d" }} />
                </Box>
              )}
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