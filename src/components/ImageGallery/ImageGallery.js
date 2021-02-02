import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pixabayAPI from 'services/pixabay-api';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from 'components/Loader';
import ErrorSearch from 'components/ErrorSearch';
import LoadMoreBtn from 'components/LoadMoreBtn';
import Modal from 'components/Modal';
import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string,
  };

  state = {
    images: [],
    page: 1,
    error: null,
    showModal: false,
    modalImgProps: { url: '', alt: '' },
    status: 'idle',
  };

  async componentDidUpdate(prevProps) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    if (prevQuery !== nextQuery) {
      await this.reset();
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
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  incrementPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  reset = () => {
    this.setState({ page: 1, images: [] });
  };

  scrollDown = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 1000);
  };

  handleLoadBtnClick = async () => {
    const nextQuery = this.props.searchQuery;
    await this.incrementPage();
    this.fetchImages(nextQuery);
    this.scrollDown();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleImgClick = props => {
    this.setState({ modalImgProps: props });
    this.toggleModal();
  };

  render() {
    const { images, error, status, showModal } = this.state;
    const { url, alt } = this.state.modalImgProps;

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
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={url} alt={alt} className={s.modalImg} />
            </Modal>
          )}
          <ul className={s.imageGallery}>
            {images.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                src={webformatURL}
                url={largeImageURL}
                alt={tags}
                openModal={this.handleImgClick}
              />
            ))}
          </ul>
          <LoadMoreBtn handleLoadMore={this.handleLoadBtnClick} />
        </>
      );
    }
  }
}
