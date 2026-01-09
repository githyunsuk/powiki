import axios from "axios";
import { generation } from "../constants/pokemon";

export async function fetchPokemonList(gen = 1) {

  const start = generation[gen].start;
  const end = generation[gen].end;

  const promises = Array.from({ length: end-start+1}, async (_, i) => {
    const id = i + start;
    
    const [details, species] = await Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);

    const koreanName = species.data.names.find(
      (n) => n.language.name === "ko"
    ).name;

    return {
      id: details.data.id,
      name: koreanName,
      image: details.data.sprites.other["official-artwork"].front_default,
      pixel: details.data.sprites.front_default,
      types: details.data.types,
    };
  });

  return await Promise.all(promises);
}