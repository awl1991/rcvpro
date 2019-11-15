import React from 'react'
import {View, Image, StyleSheet, Platform} from 'react-native'

const AppHeading = () => {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/header.png")}
        />
      </View>
    )
}
export default AppHeading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: Platform.OS === "ios" ? null : "center"
  },
  logo: {
    flex: 1,
    width: 115,
    height: 90,
    resizeMode: "contain",
    opacity: .7
  }
})
