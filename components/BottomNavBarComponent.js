import React from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, TextInput, ImageBackground, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

const mapStateToProps = (populars, products, cart, favorites) => {
    return {
        products,
        populars,
        cart,
        favorites
    };
};

const BottomNavBarComponent = (props) => {
   
        return (
            <View style={styles.productsNav}>
                <Icon    
                    raised
                    type='font-awesome'
                    reverse
                    name="home"
                    size={25}
                    color="#039FB6"
                    onPress={() => props.navigation.navigate('Home')}
                    />
                <Icon    
                    raised
                    type='font-awesome'
                    reverse
                    name="thumbs-up"
                    size={25}
                    color="#039FB6"
                    onPress={() => props.navigation.navigate('Favorites')}
                    />
                <Icon 
                    raised
                    type='font-awesome'
                    reverse
                    name="shopping-cart"
                    size={25}
                    color="#039FB6"
                    onPress={() => props.navigation.navigate('Cart')}
                    ><Text style={{fontSize: 18, marginLeft: 8}}>({props.populars.cart.products.length})</Text></Icon>
                    <Text style={{fontSize: 18}}>{props.populars.cart.total}<Icon name="dollar" color="darkgreen" size={15}/></Text>  
            </View>
        )
    
}
const styles = StyleSheet.create({

    productsNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        padding: 10

    },
})
export default connect(mapStateToProps)(BottomNavBarComponent);
