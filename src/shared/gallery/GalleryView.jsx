import React from 'react';
import FluxComponent from 'flummox/component';

import GalleryList from './components/GalleryList';

class GalleryView extends React.Component {

    static async routerWillRun({ flux }) {

        flux.getActions(
            'appState').setActiveView('gallery');
    }

    render() {

        const { flux } = this.props;

        return (
            <FluxComponent flux={flux} connectToStores={['gallery']}>
                <h2>Gallery</h2>
                <GalleryList />
            </FluxComponent>
        );
    }

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    async componentDidMount() {

        await this.props.flux.getActions(
            'gallery').requestItems();
    }
}

GalleryView.contextTypes = {
    router: React.PropTypes.func
};

export default GalleryView;
