import React from 'react';
import FluxComponent from 'flummox/component';
import AnimatedBackground from './components/background/AnimatedBackground';

class HomeView extends React.Component {

    static async routerWillRun({ flux }) {

        flux.getActions(
            'appState').setActiveView('home');
    }

    render() {

        const { flux } = this.props;

        return (
            //connectToStores will accept a single store key,
            // an array of store keys,
            // or a map of store keys to getter functions.
            //<FluxComponent connectToStores={{
            //    posts: store => ({
            //        post: store.getPost(this.props.post.id),
            //    }),
            //    comments: store => ({
            //        comments: store.getCommentsForPost(this.props.post.id),
            //    })
            //}}>
            <FluxComponent flux={flux} connectToStores={['home']}>
                <div className="home-container">
                    <AnimatedBackground/>
                </div>
            </FluxComponent>
        );
    }

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    async componentDidMount() {

    }
}

HomeView.contextTypes = {
    router: React.PropTypes.func
};

export default HomeView;
