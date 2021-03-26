import React from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, TextInput, ImageBackground, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
const mapStateToProps = (populars, products, cart, favorites) => {
    return {
        products,
        populars,
        cart,
        favorites
    };
};

const BottomNavBarComponent = (props) => {
        const {navigation} = props
        return (
            <View style={styles.productsNav}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Home')}>
                        <Image 
                            style={{width: 80, height: 50, marginLeft: -20}}
                            resizeMode="cover"
                            source={{ uri: 'https://i.postimg.cc/W1nYqJvk/asba.png'}} 
                
                        />
                </TouchableOpacity>
                <Icon    
                    raised
                    type='font-awesome'
                    reverse
                    name="star"
                    size={25}
                    color="#E78200"
                    onPress={() => navigation.navigate('My Dishes')}
                    style={{marginTop: 8, marginLeft: -40}}
                    />
                <Icon 
                    raised
                    type='font-awesome'
                    reverse
                    name="shopping-bag"
                    size={22}
                    color="#E78200"
                    onPress={() => navigation.navigate('Cart')}
                    style={{marginTop: 8}}
                    ><Text style={{fontSize: 18}}>(<Text style={{color: 'white'}}>{props.populars.cart.products.length}</Text>)</Text></Icon>
                    <Text style={{fontSize: 18, color: 'white',marginTop: 7}}>{props.populars.cart.total}<Icon name="dollar" color="#039FB6" size={15}/></Text>  
            </View>
        )
    
}
const styles = StyleSheet.create({

    productsNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        backgroundColor: '#3b4e76',
        paddingTop: 5

    },
})
export default connect(mapStateToProps)(BottomNavBarComponent);
