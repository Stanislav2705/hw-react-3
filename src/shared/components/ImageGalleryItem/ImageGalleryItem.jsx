import styles from "./image-galleryItems.module.scss"

const ImageGalleryItem = ({ items, onClick }) => {
  const elements = items.map(({ id, webformatURL, tags}) =>
    <li
      key={id}
      onClick={() => onClick({ id })}
      className={styles.item}
    >
      <img
        src={webformatURL}
        alt={tags}
        className={styles.itemimage}
      />
    </li>)

  return (<ul>{elements}</ul>)


}

export default ImageGalleryItem;

ImageGalleryItem.defaultProps = {
    items: []
}
