import React, { PropTypes } from 'react';
import Griddle from 'griddle-react';


var fakeData =  [

        {id: 1, title: 'iPad Air', price: 100.99},
        {id: 2, title: 'iPad Air 2', price: 200.99},
        {id: 3, title: 'iPad Air 3', price: 200.99}

];


class GalleryList extends React.Component {

    render() {

        const { items } = this.props;

        return (
          <div className="gallery">
              <div className="container">

                <h2>Models</h2>

                <Griddle results={items}
                    tableClassName="table"
                    showFilter={true}
                    showSettings={false}
                    resultsPerPage={items.length}
                    columns={["name"]}/>
              </div>
          </div>
        );
    }
}

GalleryList.defaultProps = {
    items: []
};

GalleryList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
};

export default GalleryList;
