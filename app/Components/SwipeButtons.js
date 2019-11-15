import React from 'react'
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
  
const SwipeButtons = props => {
    const p = props

    return (
        <View style={[styles.container, p.extraStyle]}>
            <TouchableOpacity onPress={p.clearInputs}>
                <View style={styles.btnL}>
                    <FontAwesomeIcon name='refresh' style={styles.swipeIcon} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={p.deleteItem}>
                <View style={styles.btnR}>
                    <FontAwesomeIcon name='trash' style={styles.swipeIcon} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default SwipeButtons

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingRight: 9,
        paddingLeft: 9
      },
    swipeIcon:{
        fontSize:22,
        color: 'white',
    },
    btnL: {
        height: 55,
        backgroundColor: '#ffc107',
        alignItems: 'center',
        justifyContent: 'center', 
        width: 55,
        borderRadius: 10,
        opacity: .6
    },
    btnR: {
        height: 55,
        backgroundColor: '#dc3545',
        alignItems: 'center',
        justifyContent: 'center', 
        width: 55,
        borderRadius: 10,
        opacity: .6
    }
})