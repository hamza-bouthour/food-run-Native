import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/ActionCreators';


const mapDispatchToProps = {
    fetchProducts
};
const mapStateToProps = (populars, products) => {
    return {
        products,
        populars
    };
};

 class Cart extends Component {
    static navigationOptions = {
        title: 'Cart'
};
// componentDidMount() {
//     this.props.fetchProducts();
// }
    render() {
        return (
            <View>
                <Text>Cart Component</Text>
            </View>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);