import { Store } from 'flummox';

class ViewerStore extends Store {

    constructor(flux) {

        super();

        const actionIds = flux.getActionIds('viewer');

        this.register(
            actionIds.requestModelInfo,
            this.handleRequestModelInfo);

        this.register(
            actionIds.setDockProperties,
            this.handleDockProperties);

        this.state = this.getInitialState();
    }

    getInitialState() {

        const nodes = [
            {
                label: 'Employees',
                collapsed: false,
                children: [
                    {
                        label: 'Paul Sgen',
                        collapsed: false,
                        children: [
                            {
                                label: 'Paul1',
                                collapsed: false
                            },
                            {
                                label: 'Paul2',
                                collapsed: false
                            },
                        ]
                    },
                    {
                        label: 'Sarah Lee',
                        collapsed: false
                    },
                ]
            }
        ];

        return {
            model: { name: '' },
            dock:{
                isVisible: false,
                nodes: nodes
            }
        };
    }

    handleDockProperties(dock) {

        this.setState(state => {
            state.dock = dock
        });
    }

    handleRequestModelInfo(model) {

        this.setState(state => {
            state.model = model
        });
    }

    static serialize(state) {
        return JSON.stringify(state);
    }

    static deserialize(state) {
        try {
            return JSON.parse(state);
        } catch (err) {
            // do nothing
        }
    }
}

export default ViewerStore;
