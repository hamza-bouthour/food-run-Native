import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, TextInput, ImageBackground, Alert, Image } from 'react-native';
import { Card, Rating, Input, Tile, Button } from 'react-native-elements';
import { fetchProducts } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { PRODUCTS } from '../shared/products';
import { addProductToCart } from '../redux/ActionCreators';
import { removeProductFromCart } from '../redux/ActionCreators'
import { addProductToTotal } from '../redux/ActionCreators';
import { markFavorite } from '../redux/ActionCreators';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SwipeRow } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';

const mapDispatchToProps = {
    fetchProducts,
    addProductToCart,
    addProductToTotal,
    markFavorite,
    removeProductFromCart
};
const mapStateToProps = (populars, products, cart, favorites) => {
    return {
        products,
        populars,
        cart,
        favorites
    };
};

function RenderDish(props) {
    const {dish} = props
    if (dish) {
        return (
            <SwipeRow leftOpenValue={100} style={styles.swipeRow}>
            <View>
                <TouchableOpacity
                    style={styles.deleteTouchable }
                    onPress={() =>
                        Alert.alert(
                            'Add to Favorites?',
                            'Are you sure you want to add ' + dish.name + ' to your favorites?',
                            [
                                {
                                    text: 'No',
                                    onPress: () => console.log('Not Deleted'),
                                    style: 'cancel'
                                },
                                {
                                    text: 'Yes',
                                    onPress: () => props.markFavorite()
         
                                },
                            ],
                            { cancelable: false }
                        )
                    }
                >
                            
                    
                    <Icon
                    name={props.favorite ? "thumbs-up": "thumbs-o-up"}
                    size={35}
                    color="#039FB6"
                    style={styles.likeIcon}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Card
                    containerStyle={{borderColor: '#039FB6', borderRadius: 5}}
                    title={dish.name}
                    imageSrc={{uri: dish.img}}
                    featured={true}
                    activeOpacity={1.5}
                >   
                    <Image 
                        style={{width: 350, height: 250, borderRadius: 5,borderColor: '#039FB6', marginBottom: 2}}
                        resizeMode="cover"
                        source={{ uri: dish.img }}
                    />
                    <View 
                    style={styles.cardCaptions}
                    >
                        <Text style={{marginRight: 10}}>Cost: {dish.cost} <Icon name="clock-o" color="darkgreen" size={15}/></Text>
                        <Text style={{marginLeft: 5}}>Time: {dish.time} <Icon name="dollar" color="darkgreen" size={15}/></Text>
                    </View>
                   
                          
                </Card>           
            </View>
         </SwipeRow>
        )
    }
}
function RenderDishDetails(props) {
    const {dish} = props
    if (dish) {
        return (
            <View style={ {padding: 13, marginBottom: 5}} key={dish.id}>
                <Text style={{marginBottom: 20}}>{dish.description}</Text>
                {dish.directions.map((dir, i) => {
                    return (
                        <Text key={i}>{dir}</Text>
                    )
                })} 
            </View>
        )
    }
}
function RenderNavCart(props) {
    return (
        <View style={styles.productsNav}>
            <Icon    
                raised
                type='font-awesome'
                reverse
                name="home"
                size={35}
                color="#039FB6"
                onPress={() => props.navigation.navigate('Home')}
                />
            <Icon 
                raised
                type='font-awesome'
                reverse
                name="shopping-cart"
                size={35}
                color="#039FB6"
                onPress={() => props.navigation.navigate('Home')}
                ><Text>{props.productsNumber}</Text></Icon>
                <Text style={{marginLeft: 5}}>{props.total}<Icon name="dollar" color="darkgreen" size={15}/></Text>  
        </View>
    )
}
function RenderProduct(props) {
    const {product} = props
    if (product) {
        return (
            <View key={product.productId}> 
                <Card
                    containerStyle={{borderColor: props.productInCart? 'green' : '#05D6F5',borderRadius: 15}}
                    
                    title={product.name}         
                >
                    <Image 
                        source={{uri: product.img}}
                        style={{width: 130, height: 130}}
                        resizeMode={'cover'}
                    />
                    <Text style={{marginTop: 10}}>{product.price} <Icon name="dollar" color="darkgreen" size={15}/></Text>
                    <View style={styles.productBtn}>
                        {!props.productInCart ?
                            <TouchableOpacity
                                style={styles.productBtn}
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
                                style={styles.productBtn}
                                onPress={()=> {
                                    props.removeProductFromCart()
                                }}
                            >
                                <Icon
                                    reverse
                                    name='times'
                                    type='font-awesome'
                                    color='red'
                                    size={30}
                                />
                            </TouchableOpacity>}
                    </View>
                </Card>
            </View>
        )
    }
}

class Dish extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products : PRODUCTS,
            
            // name: this.props.navigation.getParam('name')
        }
    }
    static navigationOptions = {
        title: 'Dish'
};

componentDidMount() {
    this.props.fetchProducts()

}   
addTocart(productId) {
    this.props.addProductToCart(productId);
    this.props.addProductToTotal(this.state.products.filter(x=> x.productId === productId)[0].price)
} 
markFavorite(dishId) {
    this.props.markFavorite(dishId)
}
render() {
        
        const dishPopularId = this.props.navigation.getParam('dishId')
        const dish = this.props.populars.populars.populars.filter(popular => popular.id === dishPopularId)[0]
        const products = this.props.populars.products.products.filter(product => product.dishId.includes(dishPopularId))
  
        return (
            <ScrollView>
                
                <RenderDish dish={dish} key={dish.id} favorite={this.props.populars.favorites.includes(dishPopularId)} markFavorite={() => this.markFavorite(dishPopularId)}/>
                <RenderDishDetails key={dish.id + 'details'} dish={dish} />
                <ScrollView
                    horizontal={true}
                    style={{marginBottom: 50}}   
                >
                    {products.map(p => {
                        return (
                            <RenderProduct  product={p} addTocart={() => this.addTocart(p.productId)} removeProductFromCart={() => this.props.removeProductFromCart(p.productId, p.price)} productInCart={this.props.populars.cart.products.includes(p.productId)}/>
                        )
                    })}
                </ScrollView>
                <RenderNavCart navigation={this.props.navigation} productsNumber={this.props.populars.cart.products.length} total={this.props.populars.cart.total}/>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    productsContainer: {
        flexDirection: 'row',
        justifyContent: 'center' 
    },
    productsNav: {
        flexDirection: 'row',
        justifyContent: 'space-around' 
    },
    cardCaptions: {
        flexDirection: 'row',
        justifyContent: 'center'
        
    },
 
    productBtn: {
        flexDirection: 'row',
        justifyContent: 'center' 
    },
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'black',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    },
    likeIcon: {
        
        textAlign: 'left',
        marginLeft: 30,
        
    },
    shadow: {
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        // iOS
        shadowOffset: {
            width: 0,            // These can't both be 0
            height: 1,           // i.e. the shadow has to be offset in some way
        },
        // Android
        shadowOffset: {
            width: 0,            // Same rules apply from above
            height: 1,           // Can't both be 0
        },
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Dish);



