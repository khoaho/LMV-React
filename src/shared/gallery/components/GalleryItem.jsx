import React, { PropTypes } from 'react';

class GalleryItem extends React.Component {

    render() {

        const { title, price } = this.props;

        return (
            <div>{title} - $ {price}</div>
        );
    }
}

GalleryItem.propTypes = {
    title: PropTypes.string,
    price: PropTypes.number
};

export default GalleryItem;
