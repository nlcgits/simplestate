import { DefaultMap } from '@nextlevelcoder/defaultmap';
import { SimpleState } from './SimpleState';

class SimpleStateMap extends DefaultMap {
    constructor() {
        super(() => new SimpleState());
    }
}

const simpleStateMap = new SimpleStateMap();

export { SimpleStateMap, simpleStateMap };