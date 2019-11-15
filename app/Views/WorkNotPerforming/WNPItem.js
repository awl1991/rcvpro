import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {Input} from "native-base"
class WNPItem extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      target: null
    }
    this.itemNum
    this.desc
    this.acv
    this.rcv
    this.id = this.props.id
    this.clearInputs = this.clearInputs.bind(this)
  }

  clearInputs(){
   this.itemNum.setNativeProps({text: ''})
   this.desc.setNativeProps({text: ''})
   this.acv.setNativeProps({text: ''})
   this.rcv.setNativeProps({text: ''})
   this.props.clearItem('wnpArray', this.props.uid)
  }

  onLayout = (event) =>{
   this.setState({target: event.nativeEvent.target})
  }

  render(){
    const p = this.props
    return (
        <View onLayout={this.onLayout} style={styles.itemContainer}>
            <View style={styles.inputContainers}>
                <Input
                  ref={ref => this.itemNum = ref}
                  item='wnp'
                  target={this.state.target}
                  style={[styles.border, {flex: 1, marginRight: 4, marginBottom: 8}]}
                  placeholder='  Item #'
                  keyboardType={'default'}
                  onEndEditing={e => p._handleInput('itemNumber', p.uid, e.nativeEvent.text)}
                />
                <Input
                  ref={ref => this.desc = ref}
                  item='wnp'
                  target={this.state.target}
                  style={[styles.border, {flex: 3, marginLeft: 4, marginBottom: 8}]}
                  placeholder='  Description'
                  keyboardType={'default'}
                  onEndEditing={e => p._handleInput('description', p.uid, e.nativeEvent.text)}
                />
            </View>
            <View style={styles.inputContainers}>
                <Input
                  ref={ref => this.acv = ref}
                  item='wnp'
                  target={this.state.target}
                  style={[styles.border, {flex: 1, marginRight: 4}]}
                  placeholder={'  ACV'}
                  keyboardType={'numeric'}
                  onEndEditing={e => p._handleInput('acv', p.uid, Number(e.nativeEvent.text))}
                />
                <Input
                  ref={ref => this.rcv = ref}
                  item='wnp'
                  target={this.state.target}
                  style={[styles.border, {flex: 1, marginLeft: 4}]}
                  placeholder={'  RCV'}
                  keyboardType={'numeric'}
                  onEndEditing={e => p._handleInput('rcv', p.uid, Number(e.nativeEvent.text))}
                />
            </View>
        </View>
    )
  }
}


export default WNPItem


const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      flexDirection: 'column',
      paddingBottom: 13
    },
    inputContainers: {
      flex: 1, 
      flexDirection: 'row',
      paddingLeft: 9,
      paddingRight: 9
    },
    border: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#a7a7a7',
      borderWidth: 1,
      height: 40
    }
})