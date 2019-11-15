import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {Input} from "native-base"
import {ItemContainer} from '../../Components/Containers'


class MiscItem
 extends Component  {
    
    constructor(props){
        super(props)
        this.state = {
            target: null
        }
        this.desc
        this.amount
        this.id = this.props.id
        this.clearInputs = this.clearInputs.bind(this)
    }

    clearInputs() {
        this.desc.setNativeProps({text: ''})
        this.amount.setNativeProps({text: ''})
        this.props.clearItem('pwiArray', this.props.uid)
    }

    onLayout = (event) =>{
        this.setState({
            target: event.nativeEvent.target
        })
    }

    render() {
        const p = this.props
        return (
            <View onLayout={this.onLayout}>
                <ItemContainer>
                    <View style={styles.itemContainer}>
                        <View style={styles.inputContainers}>
                            <Input
                                ref={ref => this.desc = ref}
                                item='misc'
                                target={this.state.target}
                                style={[styles.border, {flex: 3, marginRight: 4}]} 
                                placeholder='  Misc Contract Addition'
                                keyboardType={'default'}
                                onEndEditing={e => p._handleInput('description', p.uid, e.nativeEvent.text)}
                            />
                            <Input
                                ref={ref => this.amount = ref}
                                item='misc'
                                target={this.state.target}          
                                style={[styles.border, {flex: 1, marginLeft: 4}]} 
                                placeholder='  Amount' 
                                keyboardType={'numeric'}
                                onEndEditing={e => p._handleInput('amount', p.uid, Number(e.nativeEvent.text))}                     
                            />               
                        </View>
                    </View>
                </ItemContainer>
            </View>
        )
    }
}


export default MiscItem


const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 13
    },
    inputContainers: {
        flex: 1, 
        flexDirection: 'row'
    },
    border: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#a7a7a7',
        borderWidth: 1,
        height: 40
    }
})