// import styles from "./image-galleryItems.module.scss"

const ImageGalleryItem = ({ id, webformatURL, largeImageURL, onClick }) => {
  return (<ul>
    <li
      key={id}
      onClick={() => onClick({largeImageURL})}
      >
      <img src={webformatURL} alt={id} />
    </li>
  </ul>)


}

export default ImageGalleryItem;

// ImageGalleryItem.defaultProps = {
//     items: []
// }
