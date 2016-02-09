import { Actions } from 'flummox';

class ViewerActions extends Actions {

    async requestModelInfo() {

        return  new Promise(resolve => {
            setTimeout(() => {
                let model = { name: 'Engine' }
                resolve(model);
            }, 500);
        });
    }

    setDockProperties(dock) {

        return dock
    }
}

export default ViewerActions;
