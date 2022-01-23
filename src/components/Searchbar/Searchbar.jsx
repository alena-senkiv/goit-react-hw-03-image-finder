import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';

import s from './Searchbar.module.css';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleQueryChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    const { query } = this.state;
    const { onSubmit } = this.props;
    e.preventDefault();
    if (!query.trim()) {
      toast.error('Please, enter search query.');
      return;
    }
    onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <header className={s.searchbar}>
          <form className={s.searchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={s.searchFormBtn}>
              <FaSearch />
            </button>
            <input
              className={s.searchFormInput}
              type="text"
              value={query}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleQueryChange}
            />
          </form>
        </header>
      </>
    );
  }
}
