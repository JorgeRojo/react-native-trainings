import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import TestComponent from './src/components/TestComponent/index.js';


export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TestComponent />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(100,180,200)',        
    },
});
