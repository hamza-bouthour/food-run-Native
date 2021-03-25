import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, TextInput, Image, TouchableOpacity,Share, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Card, Rating, Input, Tile, ListItem, Avatar } from 'react-native-elements';
import { fetchProducts } from '../redux/ActionCreators';
import { PRODUCTS } from '../shared/products';
import BottomNavBarComponent from './BottomNavBarComponent';
import { addProductToCart, removeAllProductsFromCart, removeProductFromCart } from '../redux/ActionCreators';
import { SwipeRow } from 'react-native-swipe-list-view';
import SwipeButton from 'rn-swipe-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListView } from 'react-native';


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
                                        color='#E78200'
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
                                        color='#E78200'
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
                   
                    containerStyle={{borderColor: props.checked? '#E78200': '#3b4e76',padding: 0,
                    borderRadius: 10, marginBottom: -10, opacity: props.checked? 0.2: 1.5}}  
                    title={product.name} 
                >
                    <Image 
                        source={{uri: product.img}} 
                        
                        style={{width: 100, height: 100,marginHorizontal: 128}}
                        resizeMode={'cover'}
                        />
                    <View>
                        <Text style={{marginHorizontal: 155, marginTop: 10, color: 'green', fontSize: 13}}>
                            CHECK
                        </Text> 
                        
                    </View>
                </Card>
            </TouchableOpacity>    
        )
    }
}
const shareCampsite = (title, message) => {
    Share.share({
        title: title,
        message: `${title}: ${message}`,
      
    },{
        dialogTitle: 'Share ' + title
    });
};
const numColumns = 2;
class Cart extends Component {
    constructor(props) {
        super(props)
        this.state ={
            showModal: false,
            productsChecked: []
            
        }
    }
    static navigationOptions = {
        title: 'Your list'
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
            <View style={{flex: 1}}>
                <ScrollView
                
                style={{marginBottom: 100}}   
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
                            <Text style={{fontSize: 16, marginRight:20}}>remove all <Icon name="trash" color="#E78200" size={15}/></Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 16, marginLeft: 30}}> Total: {this.props.populars.cart.total}<Icon name="dollar" color="darkgreen" size={15}/></Text>
                    </View> 
                    <View>
                        <TouchableOpacity style={{marginTop: 20}}
                            onPress={() => this.toggleModal()}
                        >
                            <View style={{ flexDirection: 'row',
                            justifyContent: 'flex-start',}}>
                                <Text>Start local shopping</Text>  
                                <Icon 
                                    name="mobile" 
                                    color="#E78200" 
                                    size={25}
                                    style={{marginLeft: 8}}
                                    />
                            </View>
                            
                            
                            
                            <Modal
                                visible={this.state.showModal}
                                onRequestClose={() => this.toggleModal()}
                                transparent={false}
                                animationType={'slide'}
                                fullscreen
                                
                            >
                            
                               
                            
                            <ScrollView
                                
                            >   
                            <View style={{backgroundColor: 'white', flex: 1, marginBottom: 20}}>
                            {productsCart.map(p => {
                                return (
                                    <RenderProductLocal product={p} checked={this.state.productsChecked.includes(p.productId)} addToChecked={() => this.addToChecked(p.productId)}/>
                                )
                            })}
                         
                            <SwipeButton 
                            containerStyles={{marginTop: 50}}
                            title={<Icon name="long-arrow-right" color="#039FB6" size={45}/>}
                            // railFillBackgroundColor="#E78200" //(Optional)
                            // railFillBorderColor="#E78200" //(Optional)
                            thumbIconBackgroundColor="#039FB6" //(Optional)
                            thumbIconBorderColor="#039FB6" //(Optional)
                            railBackgroundColor="#3b4e76" //(Optional)
                            railBorderColor="#039FB6" //(Optional)
                            onSwipeSuccess={() => {
                                this.toggleModal();
                              }}
                        />
                            </View>
                            </ScrollView>
                        
                                    
                            </Modal>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', justifyContent: 'flex-start'}}
                            onPress={() => shareCampsite('hello', 'share here')} >
                            <Text>Share list </Text>
                            <Icon
                                name={'share-alt'}
                                type='font-awesome'
                                color='#E78200'
                                size={18}
                                
                            />
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
                    
                    <View style={{position: 'absolute', bottom: 0, width: '100%', marginTop: 50}}>
                    
                        <BottomNavBarComponent  navigation={this.props.navigation}/>
                    </View>
               
              
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
    container: {
        flex: 1,
        marginVertical: 20,
      },
    productsContainerView: {
        padding: 0,
        // flexDirection: 'row',
        // justifyContent: 'flex-start',
        borderColor: 'green',
      
     
    },
    bottomView: {
        width: '100%',
        height: 50,
        backgroundColor: '#EE5407',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
      },
    parent: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / numColumns, // approximate a square
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

