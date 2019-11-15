import totals from '../Actions/totalActions'

const totalStore = totals
.create({
    initVal: {
        dwelling: 0,
        contents: 0,
        structures:0,
        deductible: 0
    },
    calcVal: {
        outOfPocket: 0,
        contract: 0
    },
    wnpArray: [],
    uadArray: [],
    scArray: [],
    pwiArray: []
})

export default totalStore