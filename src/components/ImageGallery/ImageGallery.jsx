import PropTypes from 'prop-types';
import style from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <>
      <ul className={style.imageGallery}>
        {images.map(({ webformatURL, tags, largeImageURL }, idx) => (
          <ImageGalleryItem
            key={idx}
            src={webformatURL}
            alt={tags}
            onClick={() => openModal({ largeImageURL, tags })}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.string,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
  ),
  openModal: PropTypes.func.isRequired,
};
