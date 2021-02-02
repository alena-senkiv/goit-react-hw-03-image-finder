import s from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ handleLoadMore }) {
  return (
    <button
      type="button"
      className={s.LoadMoreBtn}
      onClick={() => handleLoadMore()}
    >
      Load more
    </button>
  );
}
