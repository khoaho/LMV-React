import React, { PropTypes } from 'react';

class Viewer extends React.Component {

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    render() {

        const { model } = this.props;

        return (

            <div>

                <div> Viewer </div>
                <div> {model.name} </div>
            </div>
        );
    }

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    componentDidUpdate() {

        console.log('componentDidUpdate')

        //console.log(this.state.viewerState)
    }

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    componentDidMount() {

        console.log('componentDidMount: Viewer')

        //var self = this;
        //
        //var id = Autodesk.Viewing.Private.getParameterByName('id');
        //
        //if(id === ''){
        //    return;
        //}

        //$.get('api/models/' + id, function (model) {
        //
        //    self._loadFromUrn(model.urn);
        //});
    }

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    componentWillUnmount() {

        console.log('componentWillUnmount')
    }
}

Viewer.defaultProps = {
    model: null
};

Viewer.propTypes = {
    model: PropTypes.object
};

export default Viewer;





