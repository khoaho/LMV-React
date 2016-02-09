import { Actions } from 'flummox';

class GalleryActions extends Actions {

    async requestItems() {

        let items = [
            {id: 1, title: 'iPad Air', price: 100.99},
            {id: 2, title: 'iPad Air 2', price: 200.99},
            {id: 3, title: 'iPad Air 3', price: 200.99}
        ];

        return new Promise(resolve => {
            setTimeout(() => {
                resolve(items);
            }, 3000);
        });
    }
}

export default GalleryActions;
