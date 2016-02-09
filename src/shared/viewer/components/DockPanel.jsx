import React, { PropTypes } from 'react';
import TreeView from 'react-treeview';
import Dock from 'react-dock';

class DockPanel extends React.Component {

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    render() {

        const { flux, dock } = this.props;

        return (

            <div>
                <Dock position='left' isVisible={dock.isVisible}>
                    <div className='dock-panel-close-btn' onClick={(e) => {

                        e.preventDefault();
                        flux.getActions('viewer').setDockProperties({
                            isVisible: false
                        });
                    }}>x
                    </div>

                    {this.renderTreeViewRec(dock.nodes)}

                </Dock>
            </div>
        );
    }

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    renderTreeViewRec(parentNodes) {

        if(parentNodes) {

            return (
                <div>
            {parentNodes.map((node, i) => {

                const label = <span className="node">{node.label}</span>;

                const key = node.label + '-' + i;

                if (node.children) {

                    return (
                        <TreeView key={key} nodeLabel={label} defaultCollapsed={false}>
                          {
                              this.renderTreeViewRec(node.children)
                              }
                        </TreeView>
                    );
                }
                else {
                    return (<div key={key} className="info"> {node.label} </div>);
                }
            })}
                </div>
            );
        }
    }

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    componentDidUpdate() {

    }

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    componentDidMount() {

    }

    /////////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////
    componentWillUnmount() {

    }
}

export default DockPanel;





