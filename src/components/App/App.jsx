import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImg } from 'services/pixabay-api';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { LoadMoreBtn } from 'components/LoadMoreBtn';
import { Loader } from 'components/Loader';
import { ErrorSearch } from 'components/ErrorSearch';
import { Modal } from 'components/Modal';

const PER_PAGE = 12;
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    status: Status.IDLE,
    searchQuery: '',
    images: [],
    totalHits: 0,
    page: 1,
    error: null,
    showModal: false,
    modalImgProps: { url: '', alt: '' },
  };

  async componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      await this.reset();
      this.setState({ status: Status.PENDING });
      await this.fetchImages(nextQuery);
    }
  }

  fetchImages = query => {
    const { page } = this.state;
    fetchImg(query, page, PER_PAGE)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          return Promise.reject(new Error('Oops! Nothing found'));
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalHits,
          status: Status.RESOLVED,
        }));
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

  reset = () => {
    this.setState({ page: 1, images: [] });
  };

  handleLoadMoreBtnClick = async () => {
    const query = this.state.searchQuery;
    await this.incrementPage();
    this.fetchImages(query);
    this.scrollDown();
  };

  incrementPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  scrollDown = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 500);
  };

  handleSearchFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleImgClick = ({ largeImageURL: url, tags: alt }) => {
    this.setState({ modalImgProps: { url, alt } });
    this.toggleModal();
  };

  render() {
    const {
      status,
      images,
      error,
      showModal,
      page,
      totalHits,
      modalImgProps: { url, alt },
    } = this.state;

    const totalPages = Math.ceil(totalHits / PER_PAGE);

    return (
      <>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {status === 'idle' && <></>}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <ErrorSearch message={error.message} />}
        {status === 'resolved' && (
          <>
            {showModal && (
              <Modal onClose={this.toggleModal} url={url} alt={alt} />
            )}
            <ImageGallery images={images} openModal={this.handleImgClick} />
            {totalPages !== page && (
              <LoadMoreBtn handleLoadMore={this.handleLoadMoreBtnClick} />
            )}
          </>
        )}

        <ToastContainer />
      </>
    );
  }
}
