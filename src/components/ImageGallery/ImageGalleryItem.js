import React from 'react';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ id, src, alt, url, openModal }) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        id={id}
        src={src}
        alt={alt}
        className={s.ImageGalleryItemImage}
        onClick={() => openModal({ url, alt })}
      />
    </li>
  );
}
