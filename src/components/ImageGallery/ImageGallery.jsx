import { Component } from 'react'
import axios from 'axios';
import Loader from 'shared/components/Loader/Loader';
import ImageGalleryItem from 'shared/components/ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    page: 1,
  }

  componentDidMount() {
    this.fetchImageGallery();
  }

  fetchImageGallery() {
    const { page } = this.state;
    this.setState({
      loading:true,
    })

    axios.get(`https://pixabay.com/api/?key=29403206-b29e9098c0ff3e75ea37bca5c&image_type=photo&orientation=horizontal&page=${page}&per_page=12`)
      .then(({ data }) => {
        this.setState(({ items }) => {
          return {
            items: { ...items, ...data.hits }
          }
      })
      }).catch(error => {
        this.setState({
        error
      })
    }).finally(() => this.setState({loading: false}))
  }

  // loadMore = () => {
  //   this.setState(({ page }) => {
  //     return {
  //       page: page + 1
  //     }
  //   })
  // }

  render() {
    const { loading, error,items } = this.state;
    const isPosts = Boolean(items.length);
    // const { loadMore } = this;

    return (
      <div>
        <h2>ImageGallery</h2>
        {loading && <Loader />}
        {error && <p>Будь ласка спробуй пізніше...</p>}
        {isPosts && <ImageGalleryItem items={items} />}
        {/* {isPosts && <button onClick={loadMore}>Load more</button> } */}
      </div>
    )
  }
}
