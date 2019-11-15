import React, {Component} from 'react'
import {View, StyleSheet, Platform} from 'react-native'
import {Input} from 'native-base'
import SegmentControl from '../../Components/SegmentedControlTab';
import * as Haptics from 'expo-haptics'
import {ItemContainer} from '../../Components/Containers'

class UADItem extends Component {
    constructor(props){
        super(props) 
        this.state = {
            index: 0,
            discount: true,
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
        this.props.clearItem('uadArray', this.props.uid)
        this.setState({index: 0, discount: true})
    }

    onLayout = (event) =>{
        this.setState({
            target: event.nativeEvent.target
        })
    }

    render(){
        const p = this.props, 
              s = this.state
        return (
            <View onLayout={this.onLayout}>
                <ItemContainer>
                    <View style={styles.itemContainer}>
                        <SegmentControl
                            values={['Upgrade', 'Discount']}
                            selectedIndex={s.index}
                            height={33}
                            onTabPress={e => {
                                this.setState({index: e, discount: !this.state.discount})
                                p._handleSegment('discount', p.uid, String(this.state.discount))
                                Haptics.impactAsync('light')
                            }} 
                            borderRadius={5}
                            tabTextStyle={{fontFamily: Platform.OS === 'ios' ? 'Avenir-Light' : 'sans-serif-light', fontSize: 16}}
                            activeTabTextStyle={{color: 'white'}}
                        />
                        <View style={styles.inputContainers}>
                            <View style={{flex: 1, flexDirection: 'row', marginTop: 8}}>
                                <Input 
                                    ref={ref => this.desc = ref}
                                    item='uad'
                                    target={this.state.target}
                                    style={[styles.border, {flex: 3, marginRight: 4}]} 
                                    placeholder='  Description'
                                    keyboardType={'default'} 
                                    onEndEditing={e => p._handleDescription('description', p.uid, e.nativeEvent.text)}
                                />
                                <Input 
                                    ref={ref => this.amount = ref}
                                    item='uad'
                                    target={this.state.target}
                                    style={[styles.border, {flex: 1, marginLeft: 4}]} 
                                    placeholder='  Amount' 
                                    keyboardType={'numeric'}
                                    onEndEditing={e => p._handleInput('amount', p.uid, Number(e.nativeEvent.text))}
                                />
                            </View>               
                        </View>
                    </View>
                </ItemContainer>
            </View>
        )
    }
}


export default UADItem


const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 13
    },
    inputContainers: {
        flex: 1, 
        flexDirection: 'row',
    },
    border: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#a7a7a7',
        borderWidth: 1,
        height: 40,
    },
    segment: {
        flex: 1,
        fontFamily: Platform.OS === 'ios' ? 'Avenir-Light' : 'sans-serif-light',
        fontSize: 20
    }
})