import React, { PropTypes } from 'react';
import Griddle from 'griddle-react';


var fakeData =  [
    {
        "id": 0,
        "name": "Mayer Leonard",
        "city": "Kapowsin",
        "state": "Hawaii",
        "country": "United Kingdom",
        "company": "Ovolo",
        "favoriteNumber": 7
    }
];


class GalleryList extends React.Component {

    render() {

        return (
            <div>
                <Griddle results={fakeData}
                    tableClassName="table"
                    showFilter={true}
                    showSettings={true}
                    columns={["name", "city", "state", "country"]}/>
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
