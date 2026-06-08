import { Box, CircularProgress } from "@mui/material";
import { MoveData } from "../../types/Pokemon";
import { useEffect, useRef, useState } from "react";
import MoveCard from "./MoveCard";

interface MoveListProps {
  moveData: MoveData[]
}

export default function MoveList({ moveData }: MoveListProps) {

  const [itemLimit, setItemLimit] = useState(40);
  const observerTarget = useRef(null);

  useEffect(() => {
      setItemLimit((prev) => (prev !== 40 ? 40 : prev));
  }, [moveData]);

  useEffect(() => {
      if (moveData.length === 0 || itemLimit >= moveData.length) return;
  
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setItemLimit((prev) => prev + 40);
          }
        }, { threshold: 1.0, rootMargin: "100px" }
      );
  
      if (observerTarget.current) observer.observe(observerTarget.current);
  
      return () => observer.disconnect();
    }, [moveData.length]);
  
    const displayData = moveData.slice(0, itemLimit);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {displayData.map((move) => 
        <MoveCard move={move} />
      )}

      {itemLimit < moveData.length && (
        <Box ref={observerTarget} sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 5, gap: 20}}>
          <CircularProgress size={30} sx={{ color: "#e3350d" }} />
        </Box>
      )}                
    </Box>
  )
}