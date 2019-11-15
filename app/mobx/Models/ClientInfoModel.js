import {types} from 'mobx-state-tree';

const ClientInfoModel = types.model({
    name: types.string,
    address: types.string,
    carrier: types.string,
    claimNum: types.string
})

export default ClientInfoModel