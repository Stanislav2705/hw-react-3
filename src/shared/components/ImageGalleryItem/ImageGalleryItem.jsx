

const ImageGalleryItem = ({items, onClick}) => {
    const elements = items.map(({ id, pageURL }) => <li key={id} onClick={() => onClick({pageURL})}>{pageURL}</li>);

    return <ul>{elements}</ul>
}

export default ImageGalleryItem;

ImageGalleryItem.defaultProps = {
    items: {}
}
