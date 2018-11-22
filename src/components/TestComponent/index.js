
import React, {Component} from 'react'; 
import {View, Text, Animated, Easing, Image} from 'react-native'; 
 
import styles from './styles.scss';  

import { Style } from '~/utils';
import ConfettiView from '../ConfettiView';
const style = (new Style(styles)).style;  
  

export default class TestComponent extends Component {  

    constructor (props) {
        super(props);
        this.rotateAnimation = new Animated.Value(0);
    }

    animate = () => {
        Animated.timing(this.rotateAnimation, {
            toValue: 1,
            useNativeDriver: true,
            duration: 500,
            easing: Easing.linear
        }).start( () => {
            this.rotateAnimation.setValue(0);
            this.animate(); 
        });
    }

    get boxAnimatedStyle () { 
        const newStyle = style(`boxRed`).style;

        const rotate = this.rotateAnimation.interpolate({
            inputRange: [0 ,1, 2],
            outputRange: ['0deg', '361deg', '0deg'],
        });
        newStyle.push({
            transform: [{ rotate }]
        });  
        return {style: newStyle};
    }

    componentDidMount() {
        this.animate();
    }

    render () { 
        return (
            <ConfettiView style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%', 
            }}>
                {/* <View {...style(`box elevation10`)} ><Text>HOLA</Text></View>  */}
                {/* <Animated.View {...this.boxAnimatedStyle} >
                    <Image{...style(`img`)} source={img}/>
                    <Text>HOLA</Text>
                </Animated.View> */}  
            </ConfettiView>
        );
    }
}

