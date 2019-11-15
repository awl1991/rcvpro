import React from 'react'
import {View, StyleSheet} from 'react-native'

const LineDivider = () => <View style={styles.line} />

export default LineDivider

const styles = StyleSheet.create({
    line: {
        flex: 15, 
        borderBottomColor: '#929292', 
        borderBottomWidth: StyleSheet.hairlineWidth, 
        marginBottom: 8
    }
})