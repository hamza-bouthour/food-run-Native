import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, TextInput } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';

class Dish extends Component {
    static navigationOptions = {
        title: 'Dish'
};
    render() {
        const dishId = this.props.navigation.getParam('dishId')
        return (
            <View>
                <Card>
                    <Text>Hello I'am Dish Componentand I'am "{dishId}"</Text>
                </Card>
            </View>
        )
    }
}

export default Dish
