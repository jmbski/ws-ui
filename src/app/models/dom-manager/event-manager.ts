import { ElementConfig } from 'src/app/models/_index';

export class DomEventManager {

    constructor(
        public element: HTMLElement,
        public config: ElementConfig,
    ) {
        
    }
}