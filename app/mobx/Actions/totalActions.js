import TotalsModel from '../Models/TotalsModel'
import {destroy} from 'mobx-state-tree'
import consoleF from '../../Helpers/helpers'

const totals = TotalsModel
.actions(self => ({
    addItem(arr, item){
        self[arr]
        .push(item)
        consoleF(' DATABASE ', self)
    },
    deleteItem(arr, type, item) {
        let uid = item.key,
            items = self[arr],
            calc = self.calcVal
        items.map(i => {
            if(i.key == uid && items.length > 1){
                if(type == 'acv'){
                    arr == 'wnpArray' ?
                    calc.outOfPocket += i[type]:
                    null
                } else {
                    if(arr == 'uadArray'){
                        if(i[type] > 0){
                            calc.contract -= i[type]
                            calc.outOfPocket -= i[type]
                        } else {
                            calc.contract -= i[type]
                        }
                    } else {
                        calc.contract -= i[type]
                    }
                }

                destroy(i)
            }
        })
        self.updateIds(arr, item)
    },
    clearItem(arr, key){
        let items = self[arr],
            calc = self.calcVal

        items.map(item => {
            if(item.key == key){
                if(arr == 'wnpArray'){
                    calc.outOfPocket += item.acv
                    calc.contract += item.acv;
                    item.itemNum = ''
                    item.desc = ''
                    item.acv = 0
                    item.rcv = 0
                } else if(arr != 'uadArray'){
                    calc.contract -= item.amount
                    item.desc = ''
                    item.amount = 0
                } else {
                    if(item.discount == 'true'){
                        calc.contract -= item.amount
                        item.amount = 0
                    } else {
                        calc.contract -= item.amount
                        calc.outOfPocket -= item.amount
                        item.amount = 0
                    }
                    item.discount = 'false'
                }
            }
        })
    },
    updateIds(arr, item){
        let items = self[arr],
            currentId = item.id
        items.map(i =>
            item.id > currentId ?
            i.id = i.id - 1 : null
        )
    },
    calcOutOfPocket(prev){
        let calc = self.calcVal
        calc.outOfPocket += prev
    },
    calcContract(type, prev){
        let calc = self.calcVal
        type == 'acv' ?
        calc.contract += prev :
        calc.contract -= prev
    },
    resetInitVal(type, i, val){
        let init = self.initVal,
            calc = self.calcVal
        init[type] = val
        calc[i] += val
    },
    initVals(type, i, val){
        let init = self.initVal,
            calc = self.calcVal
        if(init[type]==0){
            init[type] = val
            calc[i] +=val
        } else if(init[type] != 0){
            calc[i] -= init[type]
            self.resetInitVal(type, i, val)
        }
    },
    updateArrayVal(arr, type, key, val){
        let items = self[arr], prev
        let calc = self.calcVal
        if(type == 'acv'){
            items.map(item => {
                if(item.key == key){
                    prev = item[type]
                    item[type] = val
                }
            })
            calc.contract -= val
        } else if(type == 'rcv'){
            items.map(item => {
                if(item.key == key){
                    prev = item[type]
                    item[type] = val
                }
            })
        } else if(type == 'description' || type == 'itemNumber'){
            items.map(item => {
                item.key == key ?
                item[type] = val : null
            })
        } else if(type == 'amount'){
            items.map(item => {
                if(item.key == key){
                    prev = item[type]
                    item[type] = val
                }
            })
        }
        prev == val || type == 'description'
        || type == 'itemNumber' || type == 'rcv' ?
        null : self.resetArrayVal(arr, type, prev, val)
    },
    resetArrayVal(arr, type, prev, val){
        let calc = self.calcVal
        if(prev != 0 && prev != val){
            if(arr == 'scArray' || arr == 'pwiArray'){
                self.calcContract(type, prev)
                calc.contract += val
            } else {
                self.calcOutOfPocket(prev)
                calc.outOfPocket -= val
            }
        }
        if(type == 'acv'){
            calc.outOfPocket -= val
            calc.contract = calc.contract + prev
        }
    },
    updateUadAmount(arr, type, key, val){
        let items = self[arr],
            calc = self.calcVal,
            contract = calc.contract,
            oop = calc.outOfPocket
        items.map(item => {
            let currentVal = item[type]
            if(item.key == key){
                if(val == item[type]){
                    return
                } else if(val == 0){
                    if(currentVal > 0){
                        calc.contract -= currentVal
                        calc.outOfPocket -= currentVal
                    } else {
                        calc.contract -= currentVal
                    }
                    item[type] = val
                } else if(item['discount'] == 'true'){
                    item[type] = -Math.abs(val)
                    contract -= currentVal
                    contract -= val
                    calc.contract = contract
                } else {
                    item[type] = +Math.abs(val)
                    contract -= currentVal
                    contract += val
                    calc.contract = contract
                    oop -= currentVal
                    oop += val
                    calc.outOfPocket = oop

                }
            }
        })
    },
    updateBool(arr, type, key, val){
        let items = self[arr],
            calc = self.calcVal,
            contract = calc.contract,
            oop = calc.outOfPocket
        if(val == 'false'){
            items.map(item =>{
                if(item.key == key){
                    item['amount'] = +Math.abs(item['amount'])
                    let amount = item['amount']
                        amount = amount * 2
                    calc.contract = contract + amount
                    item['amount'] < 0 ?
                    calc.outOfPocket = oop - item['amount'] :
                    calc.outOfPocket = oop + item['amount']
                    item[type] = val
                }
            })
        } else if(val == 'true'){
            items.map(item => {
                if(item.key == key){
                    item['amount'] = -Math.abs(item['amount'])
                    let amount = item['amount']
                        amount = amount*2
                    calc.contract = contract + amount
                    calc.outOfPocket = oop + item['amount']
                    item[type] = val
                }
            })
        }

    }
}))

export default totals
