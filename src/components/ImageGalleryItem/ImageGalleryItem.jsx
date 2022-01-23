import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ src, alt, onClick }) => {
  return (
    <li className={s.imageGalleryItem}>
      <img
        src={src}
        alt={alt}
        className={s.imageGalleryItemImage}
        onClick={onClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
