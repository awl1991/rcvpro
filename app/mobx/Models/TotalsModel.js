import InitialClaimValuesModel from './initialClaimValuesModel'
import CalculatedValuesModel from './caculatedValuesModel'
import {ACVWorkNotPerformingModel} from './arrayModels'
import {UpgradesAndDiscountsModel} from './arrayModels'
import {ServiceChargeModel} from './arrayModels'
import {PaidWhenIncurredModel} from './arrayModels'
import {MiscellaneousModel} from './arrayModels'
import {types} from 'mobx-state-tree'

const TotalsModel = types.model('totals', {
    initVal: InitialClaimValuesModel,
    calcVal: CalculatedValuesModel,
    wnpArray: types.array(ACVWorkNotPerformingModel),
    uadArray: types.array(UpgradesAndDiscountsModel),
    scArray: types.array(ServiceChargeModel),
    pwiArray: types.array(PaidWhenIncurredModel),
    miscArray: types.array(MiscellaneousModel)
})

export default TotalsModel




































// import { types } from 'mobx-state-tree';



// // ACV Work Not Performing Array Model
// const acvWorkNotPerformingModel = types.model({
//     acvWorkNotPerforming: types.model({ 
//         id: types.identifier,
//         uid: types.number,
//         itemNumber: types.number,
//         description: types.string,
//         acv: types.number,
//         rcv: types.number
//     })
// });

// // Service Charge Array Model
// const serviceChargeModel = types.model({
//     serviceCharge: types.model({ 
//             id: types.identifier,
//             description: types.string, 
//             acv: types.number, 
//             rcv:types.number 
//         }
//     )
// })

// // Paid When Incurred Array Model
// const paidWhenIncurredModel = types.model({
//     paidWhenIncurred: types.model({ 
//         id: types.identifier,
//         description: types.string, 
//         amount: types.number 
//     }
// )
// })
// // Upgrades and Discounts Array Model
// const upgradesAndDiscountsModel = types.model({
// upgradesAndDiscounts: types.array(
//   types.model({ 
//             id: types.identifier,
//             upgradeDiscount: types.boolean, 
//             amount: types.number 
//         }
//     )
// )
// })

// const TotalsModel = types.model({
//     outOfPocket: types.number,
//     contractPrice: types.number,
//     dwelling: types.number,
//     contents: types.number,
//     otherStructures: types.number,
//     deductible: types.number,
//     acvWorkNotPerforming: [acvWorkNotPerformingModel],
//     serviceCharges: [serviceChargeModel],
//     paidWhenIncurred: [paidWhenIncurredModel],
//     upgradesAndDiscounts: [upgradesAndDiscountsModel]
// })



// export default TotalsModel