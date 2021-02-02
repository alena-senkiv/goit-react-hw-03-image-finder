import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from 'components/Loader';
import ErrorSearch from 'components/ErrorSearch';
import LoadMoreBtn from 'components/LoadMoreBtn';
import pixabayAPI from 'services/pixabay-api';
import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    showModal: false,
    status: 'idle',
  };

  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    if (prevQuery !== nextQuery) {
      this.reset();
      this.setState({ status: 'pending' });
      this.fetchImages(nextQuery);
    }
  }

  fetchImages = nextQuery => {
    const { page } = this.state;
    pixabayAPI
      .fetchImg(nextQuery, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          return Promise.reject(new Error('Oops! Nothing found'));
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(() => {
        this.incrementPage();
      });
  };

  incrementPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  reset = () => {
    this.setState({ page: 1, images: [] });
  };

  scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  handleLoadBtnClick = () => {
    const nextQuery = this.props.searchQuery;
    this.fetchImages(nextQuery);
    this.scrollDown();
  };

  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <div></div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <ErrorSearch message={error.message} />;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery}>
            {images.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                src={webformatURL}
                alt={tags}
              />
            ))}
          </ul>
          <LoadMoreBtn handleLoadMore={this.handleLoadBtnClick} />
        </>
      );
    }
  }
}
