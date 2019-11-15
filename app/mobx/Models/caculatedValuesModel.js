import {types} from 'mobx-state-tree';

const CalculatedValuesModel = types.model({
    outOfPocket: types.number,
    contract: types.number,
})

export default CalculatedValuesModel