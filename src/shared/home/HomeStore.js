import { Store } from 'flummox';

class HomeStore extends Store {

    constructor(flux) {

        super();

        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
        };
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

export default HomeStore;
