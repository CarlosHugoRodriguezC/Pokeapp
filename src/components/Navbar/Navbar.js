import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { useQuery } from '../../hooks/useQuery';

export const Navbar = ({ generation, setGeneration }) => {
  const query = useQuery();

  useEffect(() => {
    setGeneration(query.get('generation'));
    // return () => {
    //   setGeneration(null);
    // };
  }, [query, generation]);

  return (
    <div className='navbar'>
      <nav className='navbar__nav'>
        <Link
          to='/Pokeapp/pokemons'
          className={
            !!query.get('generation')
              ? 'navbar__nav-link'
              : 'navbar__nav-link navbar__nav-link--active'
          }>
          All Pokemon
        </Link>
        <Link
          to='/Pokeapp/pokemons?generation=1'
          className={
            query.get('generation') && query.get('generation') === 1
              ? 'navbar__nav-link navbar__nav-link--active'
              : 'navbar__nav-link'
          }>
          Generation 1
        </Link>
        <Link
          to='/Pokeapp/pokemons?generation=2'
          className={
            query.get('generation') && query.get('generation') === 2
              ? 'navbar__nav-link navbar__nav-link--active'
              : 'navbar__nav-link'
          }>
          Generation 2
        </Link>
      </nav>
    </div>
  );
};

propTypes.defaultProps = {
  generation: propTypes.number,
  setGeneration: propTypes.func,
};
