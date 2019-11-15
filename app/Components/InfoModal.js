import React from 'react'
import {View, Text, Image, StyleSheet, Platform} from 'react-native'
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'
import Modal from "react-native-modal"

const InfoModal = props => {
    const p = props
    return (
        <Modal isVisible={p.isVisible} style={styles.modal}>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Text style={styles.modalText}>Dwelling Example:</Text>                   
                    <Image
                        renderIndicator={() => null}
                        style={styles.modalImg} 
                        //source={require('../../images/dwelling.jpeg')}                            
                        resizeMode={ImageResizeMode.contain}
                    />
                    <Text style={styles.modalText}>Other Structures Example:</Text>
                    <Image
                        style={styles.modalImg} 
                        //source={require('../../images/otherStructures.jpeg')}
                        resizeMode={ImageResizeMode.contain}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default InfoModal

const styles = StyleSheet.create({
    modal: {
        paddingTop: 50
    },
    container: {
        flex: 1, 
        flexDirection: 'column'
    },
    innerContainer: {
        flex: 6, 
        marginBottom: 30 
    },
    modalText:{
        color:'white', 
        fontFamily: Platform.OS === 'ios' ? 'Avenir-Light' : 'sans-serif-light',
        fontSize: 20
    },
    modalImg: {
        backgroundColor: 'white', 
        flex: 2, width: 100 + '%', 
        borderRadius: 10, 
        marginTop: 10, 
        marginBottom: 15
    }
})