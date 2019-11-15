import {types} from 'mobx-state-tree'


// ACV Work Not Performing Model
const ACVWorkNotPerformingModel = types.model('totals', {
    id: types.number,
    key: types.string,
    itemNumber: types.string,
    description: types.string,
    acv: types.number,
    rcv: types.number
})
// Upgrades and Discounts Model
const UpgradesAndDiscountsModel = types.model('totals', {
    id: types.number,
    key: types.string,
    discount: types.string, 
    description: types.string,
    amount: types.number 

})
// Service Charge Model
const ServiceChargeModel = types.model('totals', {
    id: types.number,
    key: types.string,
    description: types.string, 
    amount: types.number, 
})
// Paid When Incurred Model
const PaidWhenIncurredModel = types.model('totals', {
    id: types.number,
    key: types.string,
    description: types.string, 
    amount: types.number 
})

// Paid When Incurred Model
const MiscellaneousModel = types.model('totals', {
    id: types.number,
    key: types.string,
    description: types.string, 
    amount: types.number 
})

export { 
    ACVWorkNotPerformingModel,
    UpgradesAndDiscountsModel,
    ServiceChargeModel,
    PaidWhenIncurredModel,
    MiscellaneousModel
}