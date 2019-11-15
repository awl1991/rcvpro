import React from 'react'
import {View, Text, StyleSheet, Platform} from 'react-native'

const IdContainer = props => {
    const p = props
    return (
        <View style={[styles.container, p.extraStyle]}>
            <Text style={[styles.id, {flex: p.id < 10 ? 1: 2}]}>
                {p.children}.
            </Text>
            <View style={[styles.line, {flex: p.id < 10 ? 15: 20}]}/>
        </View>
    )
}

export default IdContainer

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row',
        paddingTop: 8,
    },
    line: { 
        flex: 15, 
        borderBottomColor: '#929292', 
        borderBottomWidth: StyleSheet.hairlineWidth, 
        marginBottom: 10,
        marginLeft: -5,
        marginRight: 2
      },
      id:  {
        flex: 1, 
        marginBottom: 7, 
        fontSize: 18, 
        fontFamily: Platform.OS === 'ios' ? 'Avenir-Light' : 'sans-serif-light',
        color: '#494949'
    }
})