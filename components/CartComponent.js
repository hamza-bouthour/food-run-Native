import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Card, Rating, Input, Tile, ListItem, Avatar } from 'react-native-elements';
import { fetchProducts } from '../redux/ActionCreators';
import { PRODUCTS } from '../shared/products';
import BottomNavBarComponent from './BottomNavBarComponent';
import { addProductToCart, removeAllProductsFromCart, removeProductFromCart } from '../redux/ActionCreators';
import { SwipeRow } from 'react-native-swipe-list-view';
import SwipeButton from 'rn-swipe-button';


import Icon from 'react-native-vector-icons/FontAwesome';


const mapDispatchToProps = {
   
    addProductToCart,
    removeProductFromCart,
    removeAllProductsFromCart
};
const mapStateToProps = (populars, products, cart) => {
    return {
        products,
        populars,
        cart
    };
};
function RenderCartProducts(props) {
    const {product} = props
    if (product) {

        return (
            
                    <Card 
                        key={product.productId}
                        wrapperStyle={styles.productsContainer} 
                        containerStyle={{borderColor: '#039FB6',
                        borderRadius: 10, marginBottom: -10 }}   
                    >
                        <Image 
                            source={{uri: product.img}} 
                            
                            style={styles.avatar}
    
                            />
                        <Text
                            style={{marginVertical: 13, marginLeft: 8}}
                        >   
                            {product.name}
                        </Text>
                        <View style={styles.productBtn}>
                            <Text style={{marginRight: 23, fontSize: 16}}>{product.price}<Icon name="dollar" color="darkgreen" size={15}/></Text>
                            {!props.productInCart ?
                                <TouchableOpacity
                                    // style={styles.productBtn}
                                    onPress={()=> {
                                        props.addTocart()
                                    }}
                                    >
                                    <Icon
                                        reverse
                                        name='plus-circle'
                                        type='font-awesome'
                                        color='#039FB6'
                                        size={30}
                                    />
                                </TouchableOpacity> :
                                <TouchableOpacity
                                    // style={styles.productBtn}
                                    onPress={()=> {
                                        props.removeProductFromCart()
                                    }}
                                >
                                    <Icon
                                        reverse
                                        name='times'
                                        type='font-awesome'
                                        color='grey'
                                        size={23}
                                    />
                                </TouchableOpacity>}
                        </View>
                    </Card>
            
        )
    }
}
function RenderProductLocal(props) {
    const {product} = props
    if (product) {

        return (
            <TouchableOpacity
            // style={styles.productBtn}
                onPress={()=> {
                    props.addToChecked(product.productId)
                }}
            >
                <Card 
                    key={product.productId}
                    // wrapperStyle={styles.productsContainerView} 
                    containerStyle={{borderColor: props.checked? 'yellow': 'green',padding: 30,
                    borderRadius: 10, marginBottom: -10, opacity: props.checked? 0.2: 1.5}}  
                    title={product.name} 
                >
                    <Image 
                        source={{uri: product.img}} 
                        
                        style={{width: 300, height: 250}}
                        resizeMode={'cover'}
                        />
                    <View>
                        <Text style={{marginHorizontal: 120, marginTop: 10, color: 'green', fontSize: 20}}>
                            CHECK
                        </Text> 
                        
                    </View>
                </Card>
            </TouchableOpacity>    
        )
    }
}
class Cart extends Component {
    constructor(props) {
        super(props)
        this.state ={
            showModal: false,
            productsChecked: []
            
        }
    }
    static navigationOptions = {
        title: 'Cart'
};
// componentDidMount() {

// }
addToChecked(id) {
  this.setState({
    productsChecked: this.state.productsChecked.concat([id])
  })
    
}
toggleModal() {
    this.setState({showModal: !this.state.showModal});
}
    render() {
        const productsCart = this.props.populars.products.products.filter(x => this.props.populars.cart.products.includes(x.productId))
         if (this.props.populars.cart.products.length === 0) {
            return (

                <View>
                    <Text>Sorry! your cart is empty </Text>
                    <Icon    
                    raised
                    type='font-awesome'
                    reverse
                    name="home"
                    size={35}
                    color="#039FB6"
                    onPress={() => this.props.navigation.navigate('Home')}
                    />
                </View>
            )
        } else
        return (
            <View style={{padding: 10}}>
                <Text>Your list</Text>
                <ScrollView
                
                style={{marginBottom: 50}}   
            >
                {productsCart.map(p => {
                    return (
                        <RenderCartProducts  product={p} removeProductFromCart={() => this.props.removeProductFromCart(p.productId, p.price)} productInCart={this.props.populars.cart.products.includes(p.productId)}/>
                    )
                })}
                    <View style={styles.controlContainer}>
                        <TouchableOpacity 
                            onPress={() =>
                              this.props.removeAllProductsFromCart() 
                            }
                        >
                            <Text style={{fontSize: 16, marginRight:20}}>remove all <Icon name="trash" color="darkgreen" size={15}/></Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 16, marginLeft: 30}}> Total: {this.props.populars.cart.total}<Icon name="dollar" color="darkgreen" size={15}/></Text>
                    </View> 
                    <View>
                        <TouchableOpacity style={{marginTop: 20}}
                            onPress={() => this.toggleModal()}
                        >
                            <Text>Try local shopping view! <Icon name="mobile" color="darkgreen" size={25}/></Text>
                            <Modal
                                visible={this.state.showModal}
                                onRequestClose={() => this.toggleModal()}
                                transparent={false}
                                animationType={'slide'}
                                fullscreen
                            >
                                <View style={{backgroundColor: 'black', flex: 1, marginBottom: 20}}>
                                    <ScrollView
                                        
                                    >   
                                    
                                    {productsCart.map(p => {
                                        return (
                                            <RenderProductLocal product={p} checked={this.state.productsChecked.includes(p.productId)} addToChecked={() => this.addToChecked(p.productId)}/>
                                        )
                                    })}
                                 
                                    </ScrollView>
                                    <SwipeButton 
                                    title={<Icon name="long-arrow-right" color="#039FB6" size={45}/>}
                                    color="white"
                                    railFillBackgroundColor="#039FB6" //(Optional)
                                    railFillBorderColor="white" //(Optional)
                                    thumbIconBackgroundColor="#039FB6" //(Optional)
                                    thumbIconBorderColor="white" //(Optional)
                                    railBackgroundColor="white" //(Optional)
                                    railBorderColor="#bbeaff" //(Optional)
                                    onSwipeSuccess={() => {
                                        this.toggleModal();
                                      }}
                                />
                                </View>
                                    
                            </Modal>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    productsContainer: {
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderColor: 'green',
      
     
    },
    productsContainerView: {
        padding: 0,
        // flexDirection: 'row',
        // justifyContent: 'flex-start',
        borderColor: 'green',
      
     
    },
    avatar: {
        width: 50,
        height:50,
        borderColor: 'green',
        borderStyle: 'solid'
    },
    productBtn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
       position: 'absolute',
       right: 5,
       marginTop: 12
    },
    controlContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
      
        
    },
    swipeButton: {
        position: 'absolute',
        bottom: 2
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

// <SwipeRow leftOpenValue={100} >
//                                     <View>
//                                        <Text>swipte</Text>
//                                     </View>
//                                 </SwipeRow>