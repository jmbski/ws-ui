import { ElementConfig } from '@models';

export class DomEventManager {

    constructor(
        public element: HTMLElement,
        public config: ElementConfig,
    ) {
        
    }
}