import React from 'react'
import {Provider} from 'mobx-react'
import totalStore from './app/mobx/Stores/totalStore'
import ciStore from './app/mobx/Stores/ciStore'
import Home from './app/Views/Home'
import PolicyHolderInfo from './app/Views/PolicyHolderInfo/PolicyHolderInfo'
import WorkNotPerformingList from './app/Views/WorkNotPerforming/WorkNotPerformingList'
import UpgradesAndDiscountList from './app/Views/UpgradesAndDiscounts/UpgradesAndDiscountList'
import ServiceChargeList from './app/Views/ServiceCharge/ServiceChargeList'
import PaidWhenIncurredList from './app/Views/PaidWhenIncurred/PaidWhenIncurredList'
import MiscellaneousList from './app/Views/Miscellaneous/MiscellaneousList'

const App = () => {  
  return (
      <Provider 
        totals={totalStore} 
        ciStore={ciStore}
      >
      <Home>
        <PolicyHolderInfo />
        <WorkNotPerformingList />
        <ServiceChargeList />
        <PaidWhenIncurredList />
        <UpgradesAndDiscountList />
        <MiscellaneousList />
      </Home>
    </Provider>
  )
}

export default App