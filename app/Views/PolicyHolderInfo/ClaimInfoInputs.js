import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import Fumi  from '../../Components/Fumi/Fumi'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import LineDivider from '../../Components/LineDivider'
import {ItemContainer} from '../../Components/Containers'

const NameAddress = props => {
    const p = props
    return (
        <ItemContainer>
            <Fumi
                oInfo={true}
                addPadding={9}
                label={'Name'}
                iconClass={FontAwesomeIcon}
                iconName={'user'}
                iconColor={'#545454'}
                iconSize={20}
                style={styles.border}
                onEndEditing={e => p.updateName(e.nativeEvent.text)}
            />
            <Fumi
                oInfo={true}
                addPadding={11}
                label={'Address'}
                iconClass={FontAwesomeIcon}
                iconName={'map-marker'}
                iconColor={'#545454'}
                iconSize={20}
                style={styles.border}
                onEndEditing={e => p.updateAddress(e.nativeEvent.text)}
            />
        </ItemContainer>
    )
}

class ClaimInfo extends Component {

    constructor(props){
        super(props)
        this.state = {
            offset:0,
            target: ''
        }
    }

    onLayout = (event) =>{
        this.setState({
            offset: event.nativeEvent.layout.y,
            target: event.nativeEvent.target
        })
    }

    render(){
        const p = this.props
        return (
            <View onLayout={this.onLayout}>
                <ItemContainer>
                    <Fumi
                        item='ph' 
                        offset={this.state.offset}
                        target={this.state.target}
                        addPadding={10}
                        style={styles.border}
                        label={'Insurance Carrier'}
                        iconClass={FontAwesomeIcon}
                        iconName={'building'}
                        iconColor={'#545454'}
                        iconSize={18}
                        style={styles.border}
                        keyboardType={'default'}
                        onEndEditing={e => p.updateCarrier(e.nativeEvent.text)}
                    />
                    <Fumi
                        item='ph'   
                        offset={this.state.offset}
                        target={this.state.target}
                        addPadding={9}
                        style={styles.border}
                        label={'Claim Number'}
                        iconClass={FontAwesomeIcon}
                        iconName={'file-text'}
                        iconColor={'#545454'}
                        iconSize={18}
                        keyboardType={'default'}
                        onEndEditing={e => p.updateClaimNum(e.nativeEvent.text)}
                    />
                    <LineDivider />
                    <View style={styles.inputs}>
                        <Fumi
                            item='ph'
                            offset={this.state.offset}
                            target={this.state.target}
                            addPadding={7}
                            style={[styles.border, {flex: 2, marginRight: 4}]}
                            label={'Dwelling'}
                            iconClass={FontAwesomeIcon}
                            iconName={'home'}
                            iconColor={'#545454'}
                            iconSize={22}
                            keyboardType={'numeric'}
                            onEndEditing={e => p.initVals('dwelling', 'contract', Number(e.nativeEvent.text))}
                        />
                        <Fumi
                            item='ph'
                            offset={this.state.offset}
                            target={this.state.target}
                            addPadding={8.5}
                            style={[styles.border, {flex: 2, marginLeft: 4}]}
                            label={'Other Structures'}
                            iconClass={FontAwesomeIcon}
                            iconName={'plus-square'}
                            iconColor={'#545454'}
                            iconSize={19}
                            keyboardType={'numeric'}
                            onEndEditing={e => p.initVals('structures', 'contract', Number(e.nativeEvent.text))}
                        />
                    </View>
                    <View style={styles.inputs}>
                        <Fumi
                            item='ph'
                            offset={this.state.offset}
                            target={this.state.target}
                            style={[styles.border, {flex: 2, marginRight: 4}]}
                            addPadding={8}
                            label={'Contents'}
                            iconClass={FontAwesomeIcon}
                            iconName={'archive'}
                            iconColor={'#545454'}
                            iconSize={18}
                            keyboardType={'numeric'}
                            onEndEditing={e => p.initVals('contents', 'contract', Number(e.nativeEvent.text))}
                        />
                        <Fumi
                            item='ph'
                            offset={this.state.offset}
                            target={this.state.target}
                            style={[styles.border, {flex: 2, marginLeft: 4}]}
                            addPadding={11}
                            label={'Deductible'}
                            iconClass={FontAwesomeIcon}
                            iconName={'usd'}
                            iconColor={'#545454'}
                            iconSize={19}
                            keyboardType={'numeric'}
                            onEndEditing={e => p.initVals('deductible', 'outOfPocket', Number(e.nativeEvent.text))}
                        />
                    </View>
                </ItemContainer>
            </View>
        )
    }
}


export {NameAddress, ClaimInfo}

const styles = StyleSheet.create({
    inputs: {
        flex: 1, 
        justifyContent: 'center', 
        alignContent: 'center',
        flexDirection: 'row'
    },
    border: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#a7a7a7',
        marginBottom: 8,
        backgroundColor: '#f4f4f4'
    },
    itemContainer: {
        flex: 1,
        paddingLeft: 9,
        paddingRight: 9
    }
})