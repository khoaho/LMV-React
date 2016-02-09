import { Flummox } from 'flummox';

import AppStateActions from './appNavbar/AppStateActions';
import AppStateStore from './appNavbar/AppStateStore';

import HomeActions from './home/HomeActions';
import HomeStore from './home/HomeStore';

import GalleryActions from './gallery/GalleryActions';
import GalleryStore from './gallery/GalleryStore';

import ViewerActions from './viewer/ViewerActions';
import ViewerStore from './viewer/ViewerStore';

class Flux extends Flummox {

    constructor() {

        super();

        this.createActions('appState', AppStateActions);
        this.createActions('gallery', GalleryActions);
        this.createActions('viewer', ViewerActions);
        this.createActions('home', HomeActions);

        this.createStore('appState', AppStateStore, this);
        this.createStore('gallery', GalleryStore, this);
        this.createStore('viewer', ViewerStore, this);
        this.createStore('home', HomeStore, this);
    }
}

export default Flux;
