import React, { useState, useEffect } from 'react';
import { Gallery } from '../../components/Gallery/Gallery';
import { Navbar } from '../../components/Navbar/Navbar';

export const Home = () => {
  const [generation, setGeneration] = useState(1);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    // console.log(generation);

    const url = `https://pokeapi.co/api/v2/generation`;

    fetch(`${url}/${!!generation ? generation : 1}`)
      .then((response) => response.json())
      .then(({ pokemon_species }) => {
        // console.log(pokemon_species);
        setPokemons(
          pokemon_species.map((pokemon) => ({
            ...pokemon,
            _generation: !!generation ? generation : 1,
          }))
        );
        if (!generation) {
          fetch(`${url}/2`)
            .then((res) => res.json())
            .then(({ pokemon_species }) => {
              setPokemons((prev) => [
                ...prev,
                ...pokemon_species.map((pokemon) => ({
                  ...pokemon,
                  _generation: 2,
                })),
              ]);
            });
        }
      });

    // unmount
    return () => {
      setPokemons([]);
    };
  }, [generation]);

  useEffect(() => {}, [pokemons]);

  return (
    <>
      <Navbar generation={generation} setGeneration={setGeneration} />
      <Gallery
        pokemons={pokemons}
        title={
          !!generation ? `Pokemons Generation ${generation}` : 'All Pokemons'
        }
      />
    </>
  );
};
