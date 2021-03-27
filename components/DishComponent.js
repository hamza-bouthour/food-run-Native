import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, TextInput, ImageBackground, Easing, Alert, Image, Animated, PanResponder,TouchableWithoutFeedback  } from 'react-native';
import { Card, Rating, Input, Tile, Button } from 'react-native-elements';
import { fetchProducts } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { PRODUCTS } from '../shared/products';
import { addProductToCart } from '../redux/ActionCreators';
import { removeProductFromCart } from '../redux/ActionCreators'
import { addProductToTotal } from '../redux/ActionCreators';
import { markFavorite, addDishToCart, addProductToFavorite } from '../redux/ActionCreators';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SwipeRow } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomNavBarComponent from './BottomNavBarComponent';
import Loading from './LoadingComponent';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';


const mapDispatchToProps = {
    fetchProducts,
    addProductToCart,
    addProductToTotal,
    markFavorite,
    removeProductFromCart, 
    addDishToCart,
     addProductToFavorite
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
   
        return (
            <SwipeRow leftOpenValue={100} style={styles.swipeRow}>
            <View >
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
                        name={props.favorite ? "star": "star-o"}
                        size={35}
                        color="#E78200"
                        style={styles.likeIcon}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Card
                    containerStyle={{borderColor: '#fff', borderRadius: 5, padding: 0}}
                    
                    
                    featured={true}
                    activeOpacity={1.5}
                >   
                    <Image 
                        style={{width: 362, height: 250,borderColor: '#039FB6', marginBottom: 2}}
                        resizeMode="cover"
                        source={{ uri: dish.img }}
                    />
                    <View 
                    style={styles.cardCaptions}
                    >
                        <Text style={{marginRight: 10, color: '#3b4e76', fontSize: 15}}>Cost: {dish.cost} <Icon name="clock-o" color="#E78200" size={15}/></Text>
                        <Text style={{marginLeft: 5, color: '#3b4e76', fontSize: 15}}>Time: {dish.time} <Icon name="dollar" color="#E78200" size={15}/></Text>
                    </View>
                   
                          
                </Card>           
            </View>
         </SwipeRow>
        )
    
}
function RenderDishDetails(props) {
    const {dish} = props
    if (dish) {
        return (
            <View style={ {padding: 13, marginBottom: 5}} key={dish.name}>
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
// function RenderNavCart(props) {
//     return (
//         <View style={styles.productsNav}>
//             <Icon    
//                 raised
//                 type='font-awesome'
//                 reverse
//                 name="home"
//                 size={35}
//                 color="#039FB6"
//                 onPress={() => props.navigation.navigate('Home')}
//                 />
//             <Icon 
//                 raised
//                 type='font-awesome'
//                 reverse
//                 name="shopping-cart"
//                 size={35}
//                 color="#039FB6"
//                 onPress={() => props.navigation.navigate('Cart')}
//                 ><Text>{props.productsNumber}</Text></Icon>
//                 <Text style={{marginLeft: 5}}>{props.total}<Icon name="dollar" color="darkgreen" size={15}/></Text>  
//         </View>
//     )
// }
function RenderProduct(props) {
    const {product} = props

    return (
        
    
        
        
        <TouchableWithoutFeedback
            onPressIn={() => props.onFocusFunction()}
            onLongPress={()=> {props.addProductToFavorite(),
            props.sendNotif(product.name)}}
            onPressOut={() => props.onPressOutFunction()}
        >

        <View key={product.productId}> 
            <Card
                containerStyle={{borderColor: props.productInCart? 'green'  : props.productInFavorite? 'pink': props.color ,borderRadius: 15,borderWidth: props.productInFavorite? 3: 1 }}
                
                title={product.name}         
            >
                <Image 
                    source={{uri: product.img}}
                    style={{width: 130, height: 130}}
                    resizeMode={'cover'}
                />
                <Text style={{marginTop: 10}}>{product.price} <Icon name="dollar" color="#3b4e76" size={15}/></Text>
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
                                color='#E78200'
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
        </TouchableWithoutFeedback>


    )

    
    
    
}

class Dish extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products : PRODUCTS,
            onFocus: false
        }
    }
    static navigationOptions = ({navigation}) => ({
        title: `${navigation.getParam('dishName')}`
       
});

componentDidMount() {
    const dishPopularId = this.props.navigation.getParam('dishId')
    this.props.addDishToCart(dishPopularId);
    this.props.fetchProducts()
    console.log(this.props.populars.products.errMess)

}  
onFocus() {
    this.setState({onFocus: true})
} 
onPressOut() {
    this.setState({onFocus: false})
}
addTocart(productId) {
    this.props.addProductToCart(productId);
    this.props.addProductToTotal(this.state.products.filter(x=> x.productId === productId)[0].price)
} 
markFavorite(dishId) {
    this.props.markFavorite(dishId)
}
async presentLocalNotification(product) {
    function sendNotification() {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true
            })
        });

        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Your favorite products list',
                body: `${product} has been added to your favorites list`
            },
            trigger: null
        });
    }

    let permissions = await Notifications.getPermissionsAsync();
    if (!permissions.granted) {
        permissions = await Notifications.requestPermissionsAsync();
    }
    if (permissions.granted) {
        sendNotification();
    }
}

render() {

        const dishPopularId = this.props.navigation.getParam('dishId')
        const dish = this.props.populars.populars.populars.filter(popular => popular.id === dishPopularId)[0]
        const products = this.props.populars.products.products.filter(product => product.dishId.includes(dishPopularId))

        return (
            <Animatable.View
            animation='fadeInRightBig' 
            duration={1000} 
            delay={1000}
            style={{flex: 1}}>
            <ScrollView style={{marginBottom: 50}}>
                
                <RenderDish dish={dish} favorite={this.props.populars.favorites.includes(dishPopularId)} markFavorite={() => this.markFavorite(dishPopularId)}/>
                <RenderDishDetails  dish={dish} />
                <ScrollView
                    horizontal={true}
                    style={{marginBottom: 50}}   
                >
                    {products.map((p, i) => {
                        if(this.props.populars.products.isLoading) {
                            return <Loading key={i}/>
                        }
                        return (
                            <RenderProduct 
                             
                            product={p} 
                            addTocart={() => this.addTocart(p.productId)} 
                            removeProductFromCart={() => this.props.removeProductFromCart(p.productId, p.price)} 
                            productInCart={this.props.populars.cart.products.includes(p.productId)} 
                            productInFavorite={this.props.populars.favoriteProducts.includes(p.productId)}
                            addProductToFavorite={() => this.props.addProductToFavorite(p.productId)}
                            onFocus={this.state.onFocus}
                            onFocusFunction={() => this.onFocus()}
                            onPressOutFunction={() => this.onPressOut()}
                            sendNotif={() => this.presentLocalNotification(p.name)}
                            />
                        )
                    })}
                </ScrollView>
               
            </ScrollView>
                <View style={{position: 'absolute', bottom: 0, width: '100%', marginTop: 50, marginBottom: 0}}>
 
                        <BottomNavBarComponent  navigation={this.props.navigation}/>
                    </View>
              
            </Animatable.View>
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
        justifyContent: 'flex-start',
        padding: 2
        
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
// <RenderNavCart navigation={this.props.navigation} productsNumber={this.props.populars.cart.products.length} total={this.props.populars.cart.total}/>


// <View>
// <TouchableOpacity
//     onPress={()=> props.addProductToFavorite()}
// >
// <Icon
//     reverse
//     name='heart'
//     type='font-awesome'
//     color='red'
//     size={30}
// />
// </TouchableOpacity>
// </View>


