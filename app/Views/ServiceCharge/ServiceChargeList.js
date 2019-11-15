import React, {Component} from 'react'
import {ListView, StyleSheet, View} from 'react-native'
import {observer} from 'mobx-react'
import {inject} from 'mobx-react'
import * as Haptics from 'expo-haptics'
import {SwipeListView} from 'react-native-swipe-list-view'
import SectionHeader from '../../Components/SectionHeader'
import AddButton from '../../Components/AddButton'
import SwipeButtons from '../../Components/SwipeButtons'
import {Container, ItemContainer} from '../../Components/Containers'
import IdContainer from '../../Components/IdContainer'
import SCItem from './SCItem'
const nanoid = require('nanoid/non-secure')

class ServiceChargeList extends Component  {

  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      listType: 'FlatList',
			items: Array().map((_, i) => ({key: `${i}`, id: `${i}`})),
      id: [],
      isFetching: false,
      refresh: false,
      target: null
    }
    this.store = this.props.totals
    this.arr = 'scArray'
  }

  componentDidMount(){
    this.addItem()
  }

  updateVal = (type, key, val) => {
    this.store
    .updateArrayVal(this.arr, type, key, val)
  }

  clearItem = (arr, key) => {
    this.store
    .clearItem(arr, key)
  }

  addItem = () => {
    const key = nanoid(6)   
    let items = this.state.items,
        id = items.length + 1,
        store = this.props.totals,
        item = {
          id: id, 
          key: key,
          description: '',
          amount: 0
        }      
    this.setState({id: []})
    items.push({id: id, key: key})
    this.setState({refresh: false})
    this.setState({isFetching: true}, () => { 
      store.addItem(this.arr, item)
    })
    return this.setState({isFetching: false})
  }
  deleteItem(item) {
    this.state.items.length > 1 ?            
    Haptics.impactAsync('light'): null
    this.setState({updateId: true, id: []})
      let type = 'sc'
          store = this.props.totals,
          items = this.state.items,
          currentId = item.id
    this.setState({isFetching: true}, () => { 
      items.map(i => {
        i.id > currentId ? 
        i.id = i.id - 1: null
      })
      let array = [...this.state.items],
          index = array.indexOf(item)
          if (items.length > 1) {
            array.splice(index, 1)
            this.setState({items: array})
          }
      store.deleteItem(this.arr, 'amount', item)
    })
    return this.setState({
      isFetching: false, 
      updateId: false
    })
  }

  closeRow(rowMap, rowKey, item) {
    rowMap[rowKey] ?
    rowMap[rowKey].closeRow(): null
    return this.deleteItem(item.item)
  }

  isOdd(num){return num % 2}

  render() { 
    const stateItems = this.state.items

    itemId = (id) => {
      return (this.state.id.map(item => 
        item.id == id ? item.id: null
    ))}

    refreshAdd = () => {
      this.setState({refresh: true})
      Haptics.impactAsync('light')
      return this.addItem()
    }

    clear = () => {
      inputRef.setNativeProps({text: ''})
    }

    onLayout = (event) =>{
      this.setState({
          target: event.nativeEvent.target
      })
    }

    return (
      <View onLayout={onLayout}>
        <Container>
          <SectionHeader
            headerIcon={'wrench'}
            modalIcon={'question-circle-o'}
            mainText={'Service Charges'}
            extraStyle={styles.headerContainer}
            iconSize={23}
          />
          <SwipeListView
            onLayout={onLayout}
            useFlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.items}
            keyExtractor={this._keyExtractor}
            renderItem={data => {
              let id = data.item.id
              return (
                <Container 
                  extraStyle={{backgroundColor: this.isOdd(id) ?'#edf0f5':'#fafbfc'}}
                >
                  <ItemContainer>
                  <IdContainer id={id}>
                      {this.state.updateId ? () => itemId(data.item.id): id}
                    </IdContainer>
                  </ItemContainer>
                  <SCItem
                    ref={ref => this.item = ref}
                    item={data.item}
                    id={data.item.id}
                    key={data.item.key}
                    uid={data.item.key}
                    stateItems={stateItems}
                    _handleInput={this.updateVal}
                    clearItem={this.clearItem}
                  />
                </Container>
              )}
            }
            renderHiddenItem={(data, rowMap) => (
              <SwipeButtons 
                deleteItem={() => {
                  this.closeRow(rowMap, data.item.key, data)
                  this.item.id == 1 ? 
                  this.item.clearInputs() : null
                }}
                clearInputs={() => {
                  this.closeRow(rowMap, data.item.key, data)
                  this.item.clearInputs()
                }}
              />
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
            onRefresh={() => this.addItem()}
            refreshing={this.state.isFetching}
            extraData={this.state.refresh}
          />
          <AddButton  
            addItemClick={refreshAdd}
          />
        </Container>
      </View>
    )
  }
}

export default inject('totals')(observer(ServiceChargeList))

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 
    StyleSheet.hairlineWidth,
    borderColor: '#929292'
  }
})