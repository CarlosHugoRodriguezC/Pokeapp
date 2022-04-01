import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { PokemonDetail } from '../pages/PokemonDetail/PokemonDetail';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/pokemons' exact element={<Home />} />
        <Route path='/pokemon/:name' element={<PokemonDetail />} />
        <Route path='/*' element={<Navigate replace to={'/pokemons'} />} />
      </Routes>
    </BrowserRouter>
  );
};
