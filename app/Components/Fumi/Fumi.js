import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

export default class Fumi extends BaseInput {
  static propTypes = {
    /*
     * This is the icon component you are importing from react-native-vector-icons.
     * import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
     * iconClass={FontAwesomeIcon}
     */
    iconClass: PropTypes.func.isRequired,
    /*
     * Passed to react-native-vector-icons library as name prop
     */
    iconName: PropTypes.string.isRequired,
    /*
     * Passed to react-native-vector-icons library as color prop.
     * Also used as textInput color.
     */
    iconColor: PropTypes.string,
    /*
     * Passed to react-native-vector-icons library as size prop.
     */
    iconSize: PropTypes.number,

    passiveIconColor: PropTypes.string,
    height: PropTypes.number,
  };

  static defaultProps = {
    height: 37,
    iconColor: '#00aeef',
    iconSize: 20,
    iconWidth: 40,
    inputPadding: 15,
    passiveIconColor: '#a3a3a3',
    animationDuration: 300
  };

  render() {
    const {
      iconClass,
      iconColor,
      iconSize,
      passiveIconColor,
      iconName,
      label,
      style: containerStyle,
      inputStyle,
      height: inputHeight,
      inputPadding,
      iconWidth,
      labelStyle,
    } = this.props;
    const {focusedAnim, value} = this.state;
    const AnimatedIcon = Animated.createAnimatedComponent(iconClass);
    const ANIM_PATH = inputPadding + inputHeight;
    const NEGATIVE_ANIM_PATH = ANIM_PATH * -1;
    oInfo = this.props.oInfo
    return (
      <View // Input Height
        style={[styles.container, containerStyle, {
          height: oInfo ?ANIM_PATH + 5: ANIM_PATH + 2,
        }]}
        onLayout={this._onLayout}
      >
       {/* ICON */}
        <TouchableWithoutFeedback onPress={this.focus}>
          <AnimatedIcon
            name={iconName}
            color={iconColor}
            size={iconSize}
            style={{
              position: 'absolute',
              left: this.props.addPadding,
              bottom: focusedAnim.interpolate({
                inputRange: [0, 0.5, 0.51, 0.7, 1],
                outputRange: [
                  oInfo? 18: 17,
                  ANIM_PATH,
                  NEGATIVE_ANIM_PATH,
                  NEGATIVE_ANIM_PATH,
                  oInfo? 18: 17,
                ],
              }),
              color: focusedAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [passiveIconColor, iconColor, iconColor],
              }),
            }}
          />
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.separator,
            {
              height: oInfo? inputHeight+2: inputHeight,
              left: iconWidth-7,
              top: 8
            },
          ]}
        />
         {/* TEXT POSITION iconWidth = 24 */}
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={{
              position: 'absolute',
              left: 24 + inputPadding,
              height: inputHeight,
              top: focusedAnim.interpolate({
              inputRange: [0, 0.5, 0.51, 0.7, 1],
              outputRange: [
                  25,
                  ANIM_PATH,
                  NEGATIVE_ANIM_PATH,
                  NEGATIVE_ANIM_PATH,
                  inputPadding / 2,
                ],
              }),
            }}
          > 
          {/* TEXT */}
            <Animated.Text
              style={[
                styles.label,
                 {
                  fontSize: focusedAnim.interpolate({
                    inputRange: [0, 0.7, 0.71, 1],
                    outputRange: [14, 14, 12, 12],
                  }),
                  color: focusedAnim.interpolate({
                    inputRange: [0, 0.7],
                    outputRange: ['#696969', '#a3a3a3'],
                  }),
                  marginTop: focusedAnim.interpolate({
                    inputRange: [0, 0.7, 0.71, 1],
                    outputRange: oInfo?[2, 2, 4, 4]: [0, 0, 4, 4],
                  })
                },
                labelStyle,
              ]}
            >
              {label}
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TextInput
          ref={this.input}
          {...this.props}
          style={[
            styles.textInput,
            {
              marginLeft: 25 + inputPadding,
              color: iconColor,
              marginTop: oInfo? 0:4
            },
            inputStyle,
          ]}
          value={value}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          onChange={this._onChange}
          underlineColorAndroid={'transparent'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    paddingTop: 10,
    backgroundColor: '#f7f9fb' 
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    bottom: 8
  },
  textInput: {
    flex: 1,
    color: 'black',
    fontSize: 18,
    padding: 4,
    paddingLeft: 0

  },
  separator: {
    position: 'absolute',
    width: 1,
    backgroundColor: '#d3d3d3',
  },
});
