import React from "react"
import { View, StyleSheet, Platform } from "react-native"
import { observer, inject } from "mobx-react"
import { Container, Header } from "native-base"
import InputScrollView from "../Helpers/Keyboard"
import { ListsContainer } from "../Components/Containers"
import {
  DisplayPocketTotal,
  DisplayContractTotal
} from "../Components/DisplayTotals"
import AppName from "../Components/AppName"
import PolicyHolderInfo from "./PolicyHolderInfo/PolicyHolderInfo"
import WorkNotPerformingList from "./WorkNotPerforming/WorkNotPerformingList"
import UpgradesAndDiscountList from "./UpgradesAndDiscounts/UpgradesAndDiscountList"
import ServiceChargeList from "./ServiceCharge/ServiceChargeList"
import PaidWhenIncurredList from "./PaidWhenIncurred/PaidWhenIncurredList"
import MiscellaneousList from "./Miscellaneous/MiscellaneousList"

const Home = props => {
  const store = props.totals.calcVal,
    pocket = store.outOfPocket,
    contract = store.contract

  return (
    <Container style={styles.container}>
      <Header style={styles.header}>
        <View style={styles.innerHeaderContainer}>
          <DisplayPocketTotal
            title={"Out of Pocket"}
            totals={styles.totalLeft}
            totalsContainerStyle={styles.totalsContainer}
            colorChange={
              pocket >= 0
                ? { color: pocket != 0 ? "#804040" : null }
                : { color: "#408040" }
            }
          >
            $
            {pocket < 1000 && pocket > -1000
              ? pocket.toFixed(2)
              : pocket.toLocaleString("en", { maximumFractionDigits: 2 })}
          </DisplayPocketTotal>
          <AppName style={{ flex: 1 }} />
          <DisplayContractTotal
            title={"Contract Price"}
            totals={styles.totalRight}
            totalsContainerStyle={styles.totalsContainer}
            colorChange={
              contract >= 0
                ? { color: contract != 0 ? "#408040" : null }
                : { color: "#804040" }
            }
          >
            $
            {contract < 1000 && contract > -1000
              ? contract.toFixed(2)
              : contract.toLocaleString("en", { maximumFractionDigits: 2 })}
          </DisplayContractTotal>
        </View>
      </Header>
      <ListsContainer extraStyle={styles.scrollContainer}>
        <InputScrollView>
          <ListsContainer extraStyle={styles.innerScroll}>
            <PolicyHolderInfo />
            <WorkNotPerformingList />
            <UpgradesAndDiscountList />
            <ServiceChargeList />
            <PaidWhenIncurredList />
            <MiscellaneousList />
          </ListsContainer>
        </InputScrollView>
      </ListsContainer>
    </Container>
  )
}

export default inject("totals")(observer(Home))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  header: {
    height: Platform.OS === "ios" ? 90 : 120,
    paddingTop: 10,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: "#e5e5e5",
    paddingBottom: 6,
    paddingRight: 6,
    paddingLeft: 6
  },
  totalLeft: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : 40,
    marginRight: 17,
    marginTop: 8
  },
  totalRight: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : 40,
    marginLeft: 17,
    marginTop: 8
  },
  innerHeaderContainer: {
    flex: 1,
    flexDirection: "row"
  },
  totalsContainer: {
    flex: 1,
    backgroundColor: "#4E69A2",
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 4 : 6,
    paddingBottom: Platform.OS === "ios" ? 4 : 7
  },
  scrollContainer: {
    backgroundColor: "#f4f4f4"
  },
  innerScroll: {
    marginBottom: 130
  }
})
