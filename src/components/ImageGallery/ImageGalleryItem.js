import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ src, alt, url, openModal }) {
  return (
    <li className={s.imageGalleryItem}>
      <img
        src={src}
        alt={alt}
        className={s.imageGalleryItemImage}
        onClick={() => openModal({ url, alt })}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
