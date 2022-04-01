import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const PokemonDetail = () => {
  const params = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPokemon(data);
      });

    return () => {
      // unmount
    };
  }, []);

  const leadingZeros = (num, zeros) => {
    return (Array(zeros).join('0') + num).slice(-zeros);
  };

  return !!pokemon ? (
    <div className='pokemon-detail'>
      <h1 className='pokemon-detail__title'>
        {pokemon.name} #{leadingZeros(pokemon.id, 3)}
      </h1>
      <h2 className='pokemon-detail__subtitle'>
        {' '}
        {pokemon.types[0].type.name}{' '}
      </h2>
      <div className='pokemon-detail__image-container'>
        <img
          className='pokemon-detail__image'
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon?.id}.svg`}
          alt='Pokemon'
        />
      </div>

      <div className='pokemon-detail__grid'>
        <div className='pokemon-detail__grid-item'>
          <h3 className='pokemon-detail__grid-item__title'>
            Pokedex Information
          </h3>
        </div>
        <div className='pokemon-detail__grid-item'>
          <h3 className='pokemon-detail__grid-item__title'>
            Pokemon Information
          </h3>
          <table className='pokemon-detail__poke-info'>
            <tbody>
              <tr className='pokemon-detail__grid-item__info-item'>
                <td className='pokemon-detail__grid-item__label'>Height: </td>
                <td className='pokemon-detail__grid-item__value'>
                  {pokemon.height / 10}m
                </td>
              </tr>
              {/* Weight */}
              <tr className='pokemon-detail__grid-item__info-item'>
                <td className='pokemon-detail__grid-item__label'>Weight: </td>
                <td className='pokemon-detail__grid-item__value'>
                  {pokemon.weight / 10}kg
                </td>
              </tr>
              {/* Abilities */}
              <tr className='pokemon-detail__grid-item__info-item'>
                <td className='pokemon-detail__grid-item__label'>
                  Abilities:{' '}
                </td>
                <td className='pokemon-detail__grid-item__value'>
                  {pokemon.abilities.map((ability, index) => (
                    <span key={ability.ability.name}>
                      {ability.ability.name}
                      {index > 0 ? ' ' : ', '}
                    </span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div className='pokemon-detail'>Loading...</div>
  );
};
