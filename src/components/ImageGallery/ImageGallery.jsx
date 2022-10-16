import { Component } from 'react'
import { fetchImages } from 'shared/api';
import { Notify } from 'notiflix';
import styles from './button.module.scss'
import Loader from 'shared/components/Loader/Loader';
import SearchBar from 'components/SearchBar/SearchBar';
import ImageGalleryItem from 'shared/components/ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  state = {
    images: [],
    imageName: '',
    loading: false,
    page: 1,
    totalPages: null,
  }

  componentDidMount() {
    this.fetchPosts();
  }

  componentDidUpdate(_, prevState) {
    const { page, imageName } = this.state;
    if (
      (prevState.imageName !== imageName) ||
      (prevState.page !== page )
    ) {
      this.fetchPosts(imageName, page)
    }
  }

   async fetchPosts() {
    const { page, imageName } = this.state;
    this.setState({
      loading: true,
    });

    try {
      const data = await fetchImages(imageName, page);
      if (data.totalHits === 0) {
        return Notify.failure('No such pictures');
      }
      this.setState(({ images }) => {
        return {
          images: [...images, ...data.hits],
        };
      });
      const totalPages = Math.ceil(data.totalHits / 15);
      this.setState({
        totalPages,
      });
      if (page >= totalPages) {
        Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    } finally {
      this.setState({
        loading: false,
      });
    }
   }

   handleSubmitForm = ({ imageName }) => {
    this.setState({ imageName, images: [] });
  };


  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1
      }
    })
  }

  render() {
    const { loading,images } = this.state;
    const isImages  = Boolean(images.length);
    const { loadMore,handleSubmitForm } = this;

    return (
      <div className={styles.container}>
        <SearchBar onSubmit={handleSubmitForm} />
        {loading && <Loader />}
        {isImages && <ImageGalleryItem items={images} />}
        {isImages && <button onClick={loadMore} className={styles.button}>Load more</button> }
      </div>
    )
  }
}
