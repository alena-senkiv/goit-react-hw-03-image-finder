import React from 'react';
import PropTypes from 'prop-types';
import s from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ handleLoadMore }) {
  return (
    <button
      type="button"
      className={s.loadMoreBtn}
      onClick={() => handleLoadMore()}
    >
      Load more
    </button>
  );
}

LoadMoreBtn.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
