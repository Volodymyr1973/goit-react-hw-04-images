import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './SearchBar.module.css';

export const SearchBar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleChangeName = event => {
    setName(event.currentTarget.value);
  };

  const handleSubmitName = event => {
    event.preventDefault();

    if (name.trim() === '') {
      // alert('Insert name');
      toast.error('Insert name');
      return;
    }
    onSubmit(name);
    setName('');
    event.target[1].value = '';
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchform} onSubmit={handleSubmitName}>
        <button type="submit" className={css.searchform__button}>
          <span className={css.searchform__label}>Search</span>
        </button>

        <input
          className={css.searchform__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChangeName}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
