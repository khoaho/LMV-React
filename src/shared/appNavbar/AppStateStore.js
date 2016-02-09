import { Store } from 'flummox';

class AppStateStore extends Store {

    constructor(flux) {

        super();

        this.state = this.getInitialState();

        let actionIds = flux.getActionIds('appState');

        this.register(
            actionIds.setActiveView,
            this.handleSetActiveView);
    }

    getInitialState() {

        return {
            navbar:{
                activeView: ''
            }
        };
    }

    handleSetActiveView(view) {

        this.setState(state => {
            state.navbar.activeView = view
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

export default AppStateStore;
