import {types} from 'mobx-state-tree';

const InitialClaimValuesModel = types.model('totals', {
   dwelling: types.number,
   contents: types.number,
   structures: types.number,
   deductible: types.number
})

export default InitialClaimValuesModel