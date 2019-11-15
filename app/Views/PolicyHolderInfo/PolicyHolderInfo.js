import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import GestureRecognizer from 'react-native-swipe-gestures'
import InfoModal from '../../Components/InfoModal'
import LineDivider from '../../Components/LineDivider'
import {Container} from '../../Components/Containers'
import SectionHeader from '../../Components/SectionHeader'
import {NameAddress, ClaimInfo} from './ClaimInfoInputs'

const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
};


class PolicyHolderInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {isModalVisible: false}
        this.t = props.totals
        this.c= props.ciStore
    }

    _toggleModal = () => this.setState({ 
        isModalVisible: !this.state.isModalVisible 
    })
    
    name = (val) => this.c.updateName(val)
    address = (val) => this.c.updateAddress(val)
    carrier = (val) => this.c.updateCarrier(val)
    claimNum = (val) => this.c.updateClaimNum(val)
    handleInitVals = (type, i, val) => this.t.initVals(type, i, val)
   
    render() {
        const visible = this.state.isModalVisible
        return (
        <Container>
            <SectionHeader
                mainText={`Policy Holder Information`}
                headerIcon={'address-card-o'}
                iconSize={23}
            />
            <LineDivider />
            <NameAddress 
                updateName={this.name}
                updateAddress={this.address}
            />
            <SectionHeader
                mainText={'General Claim Information'}
                headerIcon={'file-text-o'}
                modalIcon={'question-circle-o'}
                toggleModal={this._toggleModal}
                iconSize={23}
            />
            <GestureRecognizer
                onSwipeUp={this._toggleModal}
                onSwipeDown={this._toggleModal}
                onSwipeLeft={this._toggleModal}
                onSwipeRight={this._toggleModal}
                config={config}
            >
            <InfoModal isVisible={visible} />   
            </GestureRecognizer>
            <LineDivider />
                <ClaimInfo 
                    initVals={this.handleInitVals}
                    updateCarrier={this.carrier}
                    updateClaimNum={this.claimNum}
                />
        </Container>
    )
  }
}

export default inject('totals', 'ciStore')(observer(PolicyHolderInfo))