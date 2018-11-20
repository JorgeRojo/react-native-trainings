
import React, {Component} from 'react'; 
import {View, Text, findNodeHandle, Image} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import { BlurView } from 'react-native-blur';

import img from '~/assets/img.jpg';
import styles from './styles.scss';  

import { Style } from '~/utils';
const style = (new Style(styles)).style;

console.log('>>>------------->', styles)
  

export default class TestComponent extends Component {  
    render () { 
        return (
            <View {...style(`box`)} >  
                <Text>HOLA</Text> 
            </View>
        );
    }
}

