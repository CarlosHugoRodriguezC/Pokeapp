import React, { useEffect, useState } from 'react';
import Lazyload from 'react-lazyload';
import { GalleryCard } from './GalleryCard';
import PropTypes from 'prop-types';

export const Gallery = ({ pokemons = [], title = 'All Pokemons' }) => {
  const [filters, setFilters] = useState({
    filter_color: 'all',
    filter_habitat: 'all',
  });

  const [colors, setColors] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon-habitat')
      .then((res) => res.json())
      .then(({ results }) => {
        setTypes(results);
      });

    fetch('https://pokeapi.co/api/v2/pokemon-color')
      .then((res) => res.json())
      .then(({ results }) => {
        setColors(results);
      });
    return () => {
      setColors([]);
      setTypes([]);
    };
  }, []);

  useEffect(() => {
    // unmout
    return () => {
      setFilters({
        filter_color: 'all',
        filter_habitat: 'all',
      });
    };
  }, [pokemons]);

  const handleFilter = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='gallery'>
      <div className='gallery__header'>
        <h1 className='gallery__header__title'>{title}</h1>
        <div className='gallery__header__options'>
          <div className='form-group'>
            <label className='form-group__label'>Filter by Color</label>
            <select
              className='form-group__control'
              name='filter_color'
              id='filter_color'
              value={filters.filter_color}
              onChange={handleFilter}>
              <option value='all'>All</option>
              {colors.map((color) => (
                <option key={color.name} value={color.name}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label className='form-group__label'>Filter by Habitat</label>
            <select
              className='form-group__control'
              name='filter_habitat'
              id='filter_habitat'
              value={filters.filter_habitat}
              onChange={handleFilter}>
              <option value='all'>All</option>
              {types.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className='gallery__grid'>
        {pokemons.map((pokemon, index) => (
          <GalleryCard
            key={index}
            index={index}
            pokemon={pokemon}
            condition={filters}
          />
        ))}
      </div>
    </div>
  );
};

PropTypes.defaultProps = {
  pokemons: PropTypes.array,
  title: PropTypes.string,
};
