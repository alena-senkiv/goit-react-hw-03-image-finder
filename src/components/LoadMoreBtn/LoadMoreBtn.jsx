import PropTypes from 'prop-types';
import s from './LoadMoreBtn.module.css';

export const LoadMoreBtn = ({ handleLoadMore }) => {
  return (
    <button
      type="button"
      className={s.loadMoreBtn}
      onClick={() => handleLoadMore()}
    >
      Load more
    </button>
  );
};

LoadMoreBtn.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
