import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import ScrollTop from "../components/common/ScrollTop";
import { useEffect } from "react";
import { usePokemonStore } from "../store/pokemonStore";

function PokemonLayout() {

  const fetchOnes = usePokemonStore((state) => state.fetchOnes);

  useEffect(() => {
    fetchOnes();
  }, [fetchOnes]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
   
      <Header />
      <Outlet />
      <ScrollTop />
      
    </Container>
  );
}

export default PokemonLayout;