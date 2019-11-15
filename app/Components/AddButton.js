import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const AddButton = (props) => {
    return (
        <View style={styles.container}>
          <TouchableOpacity  onPress={props.addItemClick} style={styles.addBtn}>
            <FontAwesomeIcon name='plus-circle' style={styles.addBtnIcon}/>
          </TouchableOpacity>
        </View>
    )
}

export default AddButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginRight: 7,
        marginLeft: 7
    },
    addBtn: {
        flex:1, 
        flexDirection: 'row', 
        width: '100%', 
        borderColor: '#545454',
        borderRadius: 10, 
        justifyContent: 'center', 
        backgroundColor: '#e5e5e5',
        marginBottom: 5,
        marginTop: 5
    },
    addBtnIcon: {
        fontSize: 20, 
        padding: 8, 
        color: '#b1b1b1'
    }
})