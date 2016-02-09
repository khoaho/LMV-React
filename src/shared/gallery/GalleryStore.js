import { Store } from 'flummox';

class GalleryStore extends Store {

    constructor(flux) {

        super();

        const actionIds = flux.getActionIds('gallery');

        this.register(
            actionIds.requestItems,
            this.handleRequestItems);

        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            items: null
        };
    }

    handleRequestItems(items) {
        this.setState({ items });
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

export default GalleryStore;
