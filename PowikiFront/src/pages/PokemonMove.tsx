import { Box, Tabs, Tab, Paper } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { tabStyle } from "./PokemonWiki";
import { MoveData } from "../types/Pokemon";
import api from "../api/axiosInstance";
import TypeFilter from "../components/features/TypeFilter";
import MoveSearchBar from "../components/PokemonMove/MoveSearchBar";
import Loading from "../components/common/Loading";
import MoveTabHeader from "../components/PokemonMove/MoveTabHeader";
import MoveList from "../components/PokemonMove/MoveList";

export default function PokemonMove() {

  const [moveData, setMoveData] = useState<MoveData[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [classType, setClassType] = useState("all");

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

  const filteredData = useMemo(() => {
    if (!moveData) return [];

    return moveData.filter((move: MoveData) => {
      const matchesKeyword = move.name.includes(keyword);

      return matchesKeyword;
    })
  }, [moveData, keyword]);

  const handleKeyword = (value: string) => {
    setKeyword(value);
  }

  if (loading || !moveData) return <Loading />

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mb: 4 }}>
        <MoveSearchBar keyword={keyword} handleKeyword={handleKeyword} />
      </Box>

      <Box sx={{ maxWidth: "1250px", margin: "0 auto", px: 2 }}>
        
        <Tabs sx={{minHeight: "auto", "& .MuiTabs-indicator": { display: "none" }, "& .MuiTabs-flexContainer": {position: "relative", zIndex: 1, top: "1px",}}}>
          <Tab label="전체" sx={tabStyle} />
          <Tab label="물리" sx={tabStyle} />
          <Tab label="특수" sx={tabStyle} />
          <Tab label="변화" sx={tabStyle} />
        </Tabs>
        
        <Paper elevation={0} sx={{borderRadius: "0 20px 20px 20px", border: "1px solid #ddd", bgcolor: "#fff", overflow: "hidden", p: { xs: 2, md: 4 }}}>
            
          <TypeFilter />

          <Box sx={{ width: "100%", mt: 5 }}>

            <MoveTabHeader />

            <MoveList moveData={filteredData} />

          </Box>
        </Paper>
      </Box>
    </>
  );
}

export const COLUMN_WIDTHS = {
  name: "15%",
  type: "10%",
  category: "8%",
  power: "7%",
  accuracy: "7%",
  pp: "7%",
  description: "31%",
  etc: "15%",
};