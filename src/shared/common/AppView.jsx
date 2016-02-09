import React from 'react';
import { RouteHandler } from 'react-router';
import AppNavbar from '../appNavbar/AppNavbar';
import FluxComponent from 'flummox/component';

class AppView extends React.Component {

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    render() {

        const { flux } = this.props;

        return (

            <div>

                <FluxComponent flux={flux} connectToStores={['appState']}>
                    <AppNavbar/>
                </FluxComponent>

                <RouteHandler {...this.props} />

            </div>
        );
    }
}

AppView.defaultProps = {

};

AppView.contextTypes = {
    router: React.PropTypes.func
};

export default AppView;
