import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Lazyload from 'react-lazyload';
import load_img from '../../assets/images/cut-loop.gif';
import propTypes from 'prop-types';

export const GalleryCard = ({ index, pokemon, condition }) => {
  const [_pokemon, set_pokemon] = useState(pokemon);
  const [_show, set_show] = useState(false);
  const [img, setImg] = useState(load_img);

  useEffect(() => {
    fetch(pokemon.url)
      .then((response) => response.json())
      .then((data) => {
        set_pokemon({ ...pokemon, ...data });
      });
    // unmount
    return () => {
      set_pokemon(pokemon);
    };
  }, [pokemon]);

  useEffect(() => {
    if (_pokemon?.id) {
      setImg(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${_pokemon?.id}.svg`
      );
    }
    return () => {
      setImg(load_img);
    };
  }, [_pokemon]);

  useEffect(() => {
    const { filter_color, filter_habitat } = condition;
    if (
      (filter_color === 'all' || _pokemon?.color?.name === filter_color) &&
      (filter_habitat === 'all' || _pokemon?.habitat?.name === filter_habitat)
    ) {
      set_show(true);
    } else {
      set_show(false);
    }

    return () => {
      set_show(false);
    };
  }, [condition, _pokemon]);

  return _show ? (
    <Lazyload once>
      <div className='gallery__card'>
        <div className='gallery__card__container'>
          <div className='gallery__card__container__image'>
            <img src={img} alt='Card' />
          </div>
          <div className='gallery__card__container__info'>
            <h3 className='gallery__card__container__info__title'>
              {_pokemon?.name}
              <span className='gallery__card__container__info__badge'>
                #{_pokemon?.id}
              </span>
            </h3>
            <h4 className='gallery__card__container__info__subtitle'>
              Habitat: {_pokemon?.habitat?.name}
            </h4>
            <hr />
            <div className='gallery__card__container__info__description'>
              <p>
                <span>Generation: </span> {_pokemon?._generation}
              </p>
              <p>
                <span>Capture rate: </span> {_pokemon?.capture_rate}
              </p>
              <Link
                to={`/pokemon/${_pokemon?.name}`}
                className='gallery__card__container__info__arrow'>
                <span className='material-icons'>arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Lazyload>
  ) : (
    <></>
  );
};

propTypes.defaultProps = {
  index: propTypes.number,
  pokemon: propTypes.object,
  condition: propTypes.object,
};
