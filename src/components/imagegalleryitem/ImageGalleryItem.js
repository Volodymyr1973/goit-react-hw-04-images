import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  open,
  webformatURL,
  tags,
  largeImageURL,
}) => {
  return (
    <li className={css.gallery__item} onClick={open}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.gallery__image}
        data-tag={tags}
        data-large={largeImageURL}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  open: PropTypes.func,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
};
