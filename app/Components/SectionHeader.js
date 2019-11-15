import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const SectionHeader = props => {
    const p = props
    return (
      <View style={[styles.container, p.extraStyle]}>
        <FontAwesomeIcon name={p.headerIcon} style={[styles.listIcon, {fontSize: p.iconSize, paddingTop: p.paddingTop}]}/>
        <Text style={styles.headerText}>
          {p.mainText}
        </Text>
        {/* Toggle Model Button */}
        <TouchableOpacity onPress={p.toggleModal}>
          <FontAwesomeIcon name={p.modalIcon} style={styles.infoIcon}/>
        </TouchableOpacity>
      </View>
    )
  }
export default SectionHeader  

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignContent: 'center', 
        paddingTop: 20,
        paddingBottom: 4
    },
    headerText: {
      fontFamily: Platform.OS === 'ios' ? 'Avenir-Light' : 'sans-serif-light',
      fontSize: 20,
        color: '#494949'
    },
    listIcon: {
        color: '#8B9DC3', 
        alignSelf: 'flex-start', 
        marginRight: 10, 
        marginBottom: 8 
      },
    infoIcon: {
      fontSize: 15, 
      color: '#808080', 
      alignSelf: 'flex-end', 
      marginLeft: 3, 
      marginBottom: 14 
    }
})