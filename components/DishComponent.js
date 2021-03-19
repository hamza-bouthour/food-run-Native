import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, TextInput, ImageBackground } from 'react-native';
import { Card, Rating, Input, Tile, Image, Button } from 'react-native-elements';
import { fetchProducts } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { PRODUCTS } from '../shared/products';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addProductToCart } from '../redux/ActionCreators';
import { addProductToTotal } from '../redux/ActionCreators';

const mapDispatchToProps = {
    fetchProducts,
    addProductToCart,
    addProductToTotal
};
const mapStateToProps = (populars, products) => {
    return {
        products,
        populars
    };
};

function RenderDish(props) {
    const {dish} = props
    if (dish) {
        return (
            <View>
                <Tile
                    title={dish.name}
                    imageSrc={{uri: dish.img}}
                >
                 
                </Tile>
            </View>
        )
    }
}
function RenderDishDetails(props) {
    const {dish} = props
    if (dish) {
        return (
            <View style={ {padding: 13, marginBottom: 5}}>
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
function RenderProduct(props) {
    const {product} = props
    if (product) {
        return (
            <View key={product.productId}> 
                <Card

                    containerStyle={styles.cardProduct}
                    title={product.name}
                >
                    <Image 
                    source={{uri: product.img}}
                    style={{width: 130, height: 130}}
                    resizeMode={'cover'}
                    />
                    <Text style={{marginTop: 10}}>{product.price} <Icon name="dollar" color="darkgreen" size={15}/></Text>
                    <Button
                        icon={
                            <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                            />
                        }
                        title="Add"
                        onPress={()=> {
                            props.addTocart()
                        }}
                        />
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
render() {
        
        const dishPopularId = this.props.navigation.getParam('dishId')
        const dish = this.props.populars.populars.populars.filter(popular => popular.id === dishPopularId)[0]
        const products = this.state.products.filter(product => product.dishId.includes(dishPopularId))
  
        return (
            <ScrollView>
                
                <RenderDish dish={dish} key={dish.id} />
                <RenderDishDetails key={dish.id + 20} dish={dish} />
                <ScrollView
                    horizontal={true}
                    style={{marginBottom: 50}}   
                >
                {products.map(p => {
                    return (
                        <RenderProduct  product={p} addTocart={() => this.addTocart(p.productId)}/>
                    )
                })}
                </ScrollView>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    productsContainer: {
        flexDirection: 'row',
        justifyContent: 'center' 
    },
    cardProduct: {
        padding: 10,
        paddingBottom: 1,
        borderRadius: 5
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Dish);


