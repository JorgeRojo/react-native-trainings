
import React, {Component} from 'react'; 
import {View, Text, Animated, Easing, Image} from 'react-native'; 

import img from '~/assets/img.jpg';
import styles from './styles.scss';  

import { Style } from '~/utils';
const style = (new Style(styles)).style; 

console.log('>>>------------->', styles);
  

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
            console.log('>>>-------------> START', )
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
        return (<>
                <View {...style(`box elevation10`)} ><Text>HOLA</Text></View>
                <View {...style(`box elevation10`)} ><Text>HOLA</Text></View>
                <Animated.View {...this.boxAnimatedStyle} >
                    {/* <Image{...style(`img`)} source={img}/> */}
                    <Text>HOLA</Text>
                </Animated.View>
                <View {...style(`box elevation10`)} ><Text>HOLA</Text></View>
                <View {...style(`box elevation10`)} ><Text>HOLA</Text></View> 
            </>
        );
    }
}

