/**
 * @providesModule InputScrollView
 * @author Junjie.Bai
 * @license MIT
 */

import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {
    StyleSheet,
    View,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    Animated,
    UIManager,
} from 'react-native'

const isIOS = Platform.OS === 'ios'

let debounce

if (isIOS) {
    debounce = function(func, wait) {
        wait = wait || 0
        let id, count;
        let action = function(event) {
            if (count) {
                count--
                id = requestAnimationFrame(() => action.call(this, event))
            } else {
                func.call(this, event)
            }
        };
        return function(event) {
            event.persist()
            cancelAnimationFrame(id)
            count = wait
            action.call(this, event)
        };
    };
} else {
    debounce = function(func, wait) {
        wait = wait || 0
        let id, count
        let action = function(event) {
            if (count) {
                count--
                id = setTimeout(() => action.call(this, event))
            } else {
                func.call(this, event)
            }
        }
        return function(event) {
            event.persist()
            clearTimeout(id)
            count = wait
            action.call(this, event)
        }
    }
}

export default class extends PureComponent {
    static propTypes = {
        topOffset: PropTypes.number,
        keyboardOffset: PropTypes.number,
        multilineInputStyle: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
            PropTypes.number,
        ]),
        useAnimatedScrollView: PropTypes.bool,
        keyboardAvoidingViewProps: PropTypes.object
    }

    static defaultProps = {
        keyboardOffset: 40,
        multilineInputStyle: null,
        useAnimatedScrollView: false,
        keyboardAvoidingViewProps: null
    }

    state = {
        measureInputVisible: false,
        measureInputValue: '',
        measureInputWidth: 0,
        prev: null,
        keyboard: '',
        item: '',
        itemOffset: 0,
        itemTarget: null
    }

    componentWillMount() {
        this._root = null
        this._curFocus = null
        this._measureCallback = null
        this._keyboardShow = false
        this._inputInfoMap = {};
        this._topOffset = this.props.topOffset
        this._addListener()
        this._extendScrollViewFunc()
    }

    componentWillUnmount() {
        this._removeListener()
    }

    render() {
        const {
            topOffset,
            keyboardOffset,
            multilineInputStyle,
            useAnimatedScrollView,
            keyboardAvoidingViewProps,
            children,
            ...otherProps
        } = this.props

        const kavProps = Object.assign(
            {
                behavior: isIOS ? 
                'padding': null 
            }, 
            keyboardAvoidingViewProps
        )

        const {
            measureInputVisible,
            measureInputValue,
            measureInputWidth,
        } = this.state

        const newChildren = this._cloneDeepComponents(children)

        const ScrollComponent = useAnimatedScrollView ? 
                                Animated.ScrollView: 
                                ScrollView

        return (
            <KeyboardAvoidingView {...kavProps}>
                <View style={styles.wrap}>
                    <ScrollComponent 
                        ref={this._onRef}
                        onFocus={this._onFocus}
                        onBlur={this._onBlur} 
                        {...otherProps}
                    >
                        <View 
                            onStartShouldSetResponderCapture={
                                isIOS ? this._onTouchStart: null
                            }
                        >
                            {newChildren}
                            <View style={styles.hidden}
                                pointerEvents="none"
                            >
                                {
                                    measureInputVisible &&
                                    <TextInput 
                                        style={[
                                            multilineInputStyle, 
                                            {width: measureInputWidth}
                                        ]}
                                        value={measureInputValue}
                                        onContentSizeChange={
                                            this._onContentSizeChangeMeasureInput
                                        }
                                        editable={false}
                                        multiline 
                                    />
                                }
                            </View>
                        </View>
                    </ScrollComponent>
                </View>
            </KeyboardAvoidingView>
        );
    }

    _addListener() {
        this._keyboardShowListener = Keyboard.addListener(isIOS ? 
                                        'keyboardWillShow': 
                                        'keyboardDidShow', 
                                        this._onKeyboardShow
                                    )
        this._keyboardHideListener = Keyboard.addListener(isIOS ? 
                                        'keyboardWillHide': 
                                        'keyboardDidHide', 
                                        this._onKeyboardHide
                                    )
    }

    _removeListener() {
        this._keyboardShowListener && this._keyboardShowListener.remove()
        this._keyboardHideListener && this._keyboardHideListener.remove()
        this._keyboardShowListener = null
        this._keyboardHideListener = null
    }

    _extendScrollViewFunc() {
        const funcArray = [
            'scrollTo',
            'scrollToEnd',
        ];
        funcArray.forEach(funcName => {
            this[funcName] = (...args) => {
                this._root[funcName](...args)
            }
        })
    }

    _cloneDeepComponents(Component) {
        if(Component instanceof Array){
            return Component.map(subComponent => this._cloneDeepComponents(subComponent))
        } else if (Component && Component.props && Component.props.children){
            const newComponent = {...Component}
            newComponent.props = {...Component.props}
            newComponent.props.children = this._cloneDeepComponents(Component.props.children)
            return newComponent
        } else if(Component && Component.props && Component.props.multiline){
            const newComponent = {...Component}
            newComponent.props = {...Component.props}
            return this._addMultilineHandle(newComponent)
        } else {
            return Component
        }
    }

    _addMultilineHandle(Component) {
        const onChange = Component.props.onChange
        const onSelectionChange = Component.props.onSelectionChange
        const onContentSizeChange = Component.props.onContentSizeChange

        Component.props.onChange = event => {
            this._onChange(event)
            onChange && onChange(event)
        }

        Component.props.onSelectionChange = event => {
            event.persist()
            if (isIOS) {
                requestAnimationFrame(() => this._onSelectionChange(event))
            } else {
                setTimeout(() => this._onSelectionChange(event))
            }
            onSelectionChange &&
            onSelectionChange(event)
        };

        Component.props.onContentSizeChange = debounce(event => {
            this._onContentSizeChange(event)
            onContentSizeChange && onContentSizeChange(event)
        }, 2)

        return Component
    }

    _getInputInfo(target) {
        return this._inputInfoMap[target] = this._inputInfoMap[target] || {}
    }

    _measureCursorPosition(text, width, callback) {
        this._measureCallback = callback;
        this.setState({
            measureInputVisible: true,
            measureInputValue: text,
            measureInputWidth: width,
        })
    }

    _onContentSizeChangeMeasureInput = debounce(event => {
        if (!this._measureCallback) return
        this._measureCallback(event.nativeEvent.contentSize.height)
        this._measureCallback = null
        this.setState({measureInputVisible: false})
    }, 3)

    _onRef = root => {
        const { useAnimatedScrollView } = this.props
        if (!root) return
        this._root = root

        if (useAnimatedScrollView && this._root._component) {
            this._root = this._root._component
        }

        const getTopOffset = () => {
            this.props.topOffset === undefined &&
            this._root._innerViewRef &&
            this._root._innerViewRef.measureInWindow((x, y) => {
                if (y > 0) this._topOffset = y
            })
        }

        setTimeout(getTopOffset)
    }

    _scrollToKeyboardRequest = () => {
        if (!this._keyboardShow) return

        const curFocusTarget = this._curFocus
        if (!curFocusTarget) return

        const scrollResponder = this._root && this._root.getScrollResponder()
        if (!scrollResponder) return

        UIManager.viewIsDescendantOf(
            curFocusTarget,
            scrollResponder.getInnerViewNode(),
            (isAncestor) => {

                if (!isAncestor) return

                const { text, selectionEnd, width, height } = this._getInputInfo(curFocusTarget)
                const cursorAtLastLine = !text ||
                    selectionEnd === undefined ||
                    text.length === selectionEnd

                if (cursorAtLastLine) {
                    return this._scrollToKeyboard(curFocusTarget, 0)
                }

                this._measureCursorPosition(
                    text.substr(0, selectionEnd),
                    width,
                    cursorRelativeTopOffset => {
                        this._scrollToKeyboard(
                            curFocusTarget,
                            Math.max(0, height - cursorRelativeTopOffset)
                        )
                    }
                )
            }
        )
    }

    _scrollToKeyboard = (target, offset) => {
        let toKeyboardOffset = this._topOffset + this.props.keyboardOffset - offset,
            item = this.state.item,
            itemOffset = this.state.itemOffset,
            itemTarget = this.state.itemTarget, 
            keyboard = this.state.keyboardType,
            prev = this.state.prev, 
            scrollTo

        if(Platform.OS  === 'ios'){
            if(item == 'ph'){
                if(prev == null || keyboard == prev){
                    scrollTo = itemOffset - this._topOffset
                } else {
                    prev == 'default' ? 
                    scrollTo = itemOffset - this._topOffset - 44:
                    scrollTo = itemOffset - this._topOffset + 44
                } 
            } else {
                if(prev == null || keyboard == prev){
                    scrollTo = this._topOffset
                } else {
                    prev == 'default' ? 
                    scrollTo = this._topOffset - 44:
                    scrollTo = this._topOffset + 44
                }
            }
        } else {
            if(item == 'ph'){
                if(prev == null || keyboard == prev){
                    scrollTo = itemOffset - this._topOffset - 35
                } else {
                    prev == 'default' ? 
                    scrollTo = itemOffset - this._topOffset - 35:
                    scrollTo = itemOffset - this._topOffset + 9
                }
            } else {
                itemTarget = target
                scrollTo = toKeyboardOffset + 16
            }
        }

        this._root
        .scrollResponderScrollNativeHandleToKeyboard(itemTarget, scrollTo, true)
        this.state.prev = keyboard
    }

    _onKeyboardShow = () => {
        if (this._keyboardShow) return
        this._keyboardShow = true
        this._scrollToKeyboardRequest()
    }

    _onKeyboardHide = () => {
        this._keyboardShow = false
        this.state.prev = null
    }

    _onTouchStart = event => {
        const target = event.target || event.currentTarget
        if (target === this._curFocus) return false

        const targetInst = event._targetInst
        
        const uiViewClassName = targetInst.type || 
              targetInst.viewConfig.uiViewClassName 
        return uiViewClassName === 'RCTTextField' ||
               uiViewClassName === 'RCTTextView' || 
               uiViewClassName === 'RCTMultilineTextInputView'
    }

    _onFocus = event => {
        const target = event.target || event.currentTarget                                          
        let itemOffset = getProps(event._targetInst).offset
        let itemTarget = getProps(event._targetInst).target
        let item = getProps(event._targetInst).item
        let keyboardType = getProps(event._targetInst).keyboardType
        this._curFocus = target 
        this.state.itemOffset = itemOffset
        this.state.itemTarget = itemTarget
        this.state.item = item
        this.state.keyboardType = keyboardType

        focus(target)
        this._scrollToKeyboardRequest()
    }

    _onBlur = event => {
        const target = event.target || event.currentTarget
        if (this._curFocus === target) this._curFocus = null
    }

    _onChange = event => {
        if (!event.nativeEvent) return
        const target = event.target || event.currentTarget
        const inputInfo = this._getInputInfo(target)
        inputInfo.text = event.nativeEvent.text
    }

    _onSelectionChange = debounce(event => {
        const target = event.target || event.currentTarget
        const inputInfo = this._getInputInfo(target)

        inputInfo.selectionEnd = event.nativeEvent.selection.end

        if (inputInfo.text === undefined) {
            inputInfo.text = getProps(event._targetInst).value
        }

        if (!isIOS) return

        if (inputInfo.onFocusRequireScroll) {
            inputInfo.onFocusRequireScroll = false
            this._scrollToKeyboardRequest()
        }
    }, 1)

    _onContentSizeChange = event => {
        if (!event.nativeEvent) return
        const target = event.target || event.currentTarget
        const inputInfo = this._getInputInfo(target);
        inputInfo.width = event.nativeEvent.contentSize.width
        inputInfo.height = event.nativeEvent.contentSize.height
        if (inputInfo.text === undefined) {
            inputInfo.text = getProps(event._targetInst).value
        }
        this._scrollToKeyboardRequest(true)
    }
}

function focus(targetTag) {
    if (isIOS) {
        UIManager.focus(targetTag);
        TextInput.State && TextInput.State.focusTextInput(targetTag)
    } else {
        const AndroidTextInput = UIManager.getViewManagerConfig 
            && UIManager.getViewManagerConfig('AndroidTextInput')
            || UIManager.AndroidTextInput;
        UIManager.dispatchViewManagerCommand(
            targetTag,
            AndroidTextInput.Commands.focusTextInput,
            null
        )
    }
}

function getProps(targetNode) {
    return targetNode.memoizedProps ||
           targetNode._currentElement.props
}

const styles = StyleSheet.create({
    wrap: {
        height: '100%'
    },
    hidden: {
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0
    }
})
