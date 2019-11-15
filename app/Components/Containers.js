import React from 'react'
import {View, StyleSheet} from 'react-native'

const ListsContainer = props => {
    const p = props
    return (
        <View style={[styles.container, p.extraStyle]}>
            {props.children}
        </View>
    )
}

const ItemContainer = props => {
    const p = props
    return (
        <View style={[styles.itemContainer, p.extraStyle]}>
            {props.children}
        </View>
    )
}

const Container = props => {
    const p = props
    return (
        <View style={[styles.container, p.extraStyle]}>
            {props.children}
        </View>
    )
}

export {ListsContainer, ItemContainer, Container}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    itemContainer: {
        flex: 1,
        paddingLeft: 9,
        paddingRight: 9
    },
    container: {
        flex: 1,
        flexDirection: 'column'
    }
})