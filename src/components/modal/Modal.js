// import { Component } from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ onClick, tag, url }) => {
  useEffect(() => {
    window.addEventListener('keydown', onClick);

    return () => {
      window.removeEventListener('keydown', onClick);
    };
  });

  return (
    <div className={css.overlay} onClick={onClick}>
      <div className={css.modal}>
        <img src={url} alt={tag} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  url: PropTypes.string,
  tag: PropTypes.string,
  onClick: PropTypes.func,
};
