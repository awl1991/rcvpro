import ClientInfoModel from '../Models/ClientInfoModel'

const ciActions = ClientInfoModel
.actions(self => ({
    updateName(val){
        self.name = val
    },
    updateAddress(val){
        self.address = val
    },
    updateCarrier(val){
        self.carrier = val
    },
    updateClaimNum(val){
        self.claimNum = val
    }
 }))

export default ciActions
