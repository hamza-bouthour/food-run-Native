import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, TextInput, Image, TouchableOpacity,Share, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Card, Rating, Input, Tile, ListItem, Avatar } from 'react-native-elements';
import { fetchProducts } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';
import BottomNavBarComponent from './BottomNavBarComponent';
import { addProductToCart, removeAllProductsFromCart,removeProductFromFavorite,   addProductToTotal, removeProductFromCart } from '../redux/ActionCreators';
import { SwipeRow } from 'react-native-swipe-list-view';
import SwipeButton from 'rn-swipe-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListView } from 'react-native';
import { PRODUCTS } from '../shared/products';


const mapDispatchToProps = {
   
    addProductToCart,
    removeAllProductsFromCart,
    fetchProducts,
    addProductToTotal,
    removeProductFromCart, 
    removeProductFromFavorite

};
const mapStateToProps = (populars, products, cart, favoriteProducts) => {
    return {
        products,
        populars,
        cart,
        favoriteProducts
    };
};
function RenderCartProducts(props) {
    const {product} = props
    if (product) {

        return (
           
           
            <TouchableWithoutFeedback
                
                // onPress={() =>
                //    props.removeProductFromFavorite()
                // }
                onLongPress={()=> props.removeProductFromFavorite()}
            >
                        
                
            
            
    
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
                                    onPress={()=> 
                                        props.removeProductFromCart()
                                    }
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
                    </TouchableWithoutFeedback>
        )
    }
}

const shareList = (title, message) => {
    const msg = message.map((m,i)=> {

     return ` ${i}: ${m.name} `
     })
    Share.share({
        title: title,
        message: msg.toString()
  
    }
    ,{
        dialogTitle: 'Asba ' + title
    });
};
const numColumns = 2;
class FavoriteProducts extends Component {
    constructor(props) {
        super(props)
        this.state ={
            showModal: false,
            productsChecked: [],
            products : PRODUCTS,
            
        }
    }
    static navigationOptions = {
        title: 'Your products'
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
addTocart(productId) {
    this.props.addProductToCart(productId);
    this.props.addProductToTotal(this.state.products.filter(x=> x.productId === productId)[0].price)
} 
    render() {
        const favoritesProducts = this.props.populars.products.products.filter(x => this.props.populars.favoriteProducts.includes(x.productId))
        const dishes = this.props.populars.populars.populars.filter(dish => this.props.populars.cart.dishes.includes(dish.id))
         if (this.props.populars.favoriteProducts.length === 0) {
            return (

                <View style={{flex: 1}}>
                    <ScrollView style={{padding: 80}}>
                    <Text style={{fontSize: 25}}>Your favorite product list is empty </Text>
                    
                    
                    </ScrollView>
                    <View style={{position: 'absolute', bottom: 0, width: '100%', margin: 0, marginBottom: 0}}>
 
                        <BottomNavBarComponent  navigation={this.props.navigation}/>
                        </View>
                </View>
            )
        } else
        return (
            <Animatable.View
                animation='fadeInUp' 
                duration={1000} 
                delay={1000}
                style={{flex: 1}}>
                <ScrollView
                    style={{marginBottom: 100}}   
                >
                    {favoritesProducts.map(p => {
                        return (
                            <RenderCartProducts  
                                product={p}
                                key={p.productId}
                                removeProductFromCart={() => this.props.removeProductFromCart(p.productId, p.price)}
                                productInCart={this.props.populars.cart.products.includes(p.productId)}
                                addTocart={() => this.addTocart(p.productId)} 
                                removeProductFromFavorite={() => this.props.removeProductFromFavorite(p.productId)}
                            />
                        )
                    })}
                    <View 
                        style={styles.controlContainer}>
                        <TouchableOpacity 
                            onPress={() =>
                              this.props.removeAllProductsFromCart() 
                            }
                        >
                            <Text 
                                style={{fontSize: 16, marginRight:20}}>remove all 
                            <Icon 
                                name="trash" 
                                color="#E78200" 
                                size={15}/>
                            </Text>
                        </TouchableOpacity>
                        <Text 
                            style={{fontSize: 16, marginLeft: 40}}> Total: {this.props.populars.cart.total}
                        <Icon 
                            name="dollar" 
                            color="darkgreen" 
                            size={15}/>
                        </Text>
                    </View> 
                    <View 
                        style={{padding: 10}}>
                        <Text>
                            Products for: 
                                {dishes.map((d,i) => {
                                    return <Text key={i} style={{color: '#3b4e76'}}> {d.name}, </Text>      
                                })}
                        </Text>
                    </View>
                    <View 
                        style={{padding: 10}}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', justifyContent: 'flex-start'}}
                            onPress={() => shareList('My list', favoritesProducts)} >
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
            </Animatable.View>
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
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteProducts);

// <SwipeRow leftOpenValue={100} >
//                                     <View>
//                                        <Text>swipte</Text>
//                                     </View>
//                                 </SwipeRow>

// <Icon
// name={props.favorite ? "star": "star-o"}
// size={35}
// color="#E78200"
// style={styles.likeIcon}
// />

