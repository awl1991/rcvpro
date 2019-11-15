import React from 'react'
import {View, StyleSheet, Text, Platform} from 'react-native'

const DisplayPocketTotal = props => {
    const p = props
    return (
        <View style={p.totals}>
            <Text style={[styles.smallFont, p.colorChange]}>{p.title}</Text>
            <View style={p.totalsContainerStyle}>
                <Text style={styles.totals}>
                    {p.children}
                </Text>
            </View>
        </View>
    )
}

const DisplayContractTotal = props => {
    const p = props
    return (
        <View style={p.totals}>
            <Text style={[styles.smallFont, p.colorChange]}>{p.title}</Text>
            <View style={p.totalsContainerStyle}>
                <Text style={styles.totals}>
                    {p.children}
                </Text>
            </View>
        </View>
    )
}

export {DisplayPocketTotal, DisplayContractTotal}

const styles = StyleSheet.create({
    smallFont: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 12,
        fontFamily:  Platform.OS === 'ios' ? 'Avenir-Light' : 'sans-serif-light',
        bottom: Platform.OS === "ios" ? -12 : -5,
        fontWeight: 'bold'
    },
    totals: { 
        color: '#ffffff', 
        fontFamily: Platform.OS === 'ios' ? 'Avenir-Light' : 'sans-serif-light',
        fontSize: 18    
    }
})