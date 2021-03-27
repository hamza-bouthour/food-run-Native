import React, { Component } from 'react'
import { fetchProducts, unMarkFavorite, fetchPopulars } from '../redux/ActionCreators'
import { connect } from 'react-redux';
import { ScrollView, StyleSheet,Alert, TouchableWithoutFeedback, View, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNavBarComponent from './BottomNavBarComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';




const mapDispatchToProps = {
    fetchPopulars,
    fetchProducts,
    unMarkFavorite
};
const mapStateToProps = (populars, favorites) => {
    return {
        
        populars,
        favorites
    };
};
const RenderDirectoryItem = (props) => {
    const {item} = props
    return (
        <TouchableWithoutFeedback
            onLongPress={()=> navigate('Dish', { dishId: item.id, dishName: item.name })}
        >
            <SwipeRow leftOpenValue={100} style={styles.swipeRow}>
                <View >
                    <TouchableOpacity
                        style={styles.deleteTouchable }
                        onPress={() =>
                            Alert.alert(
                                'Remove',
                                'Are you sure you want to add ' + item.name + ' to your favorites?',
                                [
                                    {
                                        text: 'No',
                                        onPress: () => console.log('Not Deleted'),
                                        style: 'cancel'
                                    },
                                    {
                                        text: 'Yes',
                                        onPress: () => props.unMarkFavorite(item.id)
            
                                    },
                                ],
                                { cancelable: false }
                            )
                        }
                    >
                        <Icon
                        name={ "star"}
                        size={35}
                        color="#E78200"
                        style={styles.likeIcon}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <Card
                        containerStyle={{borderColor: '#fff', borderRadius: 5, padding: 0}}
                        imageSrc={{uri: item.img}}
                        featured={true}
                        activeOpacity={1.5}
                    >   
                        <Image 
                            style={{width: 362, height: 250,borderColor: '#039FB6', marginBottom: 2}}
                            resizeMode="cover"
                            source={{ uri: item.img }}
                        />
                        <View 
                            style={styles.cardCaptions}
                        >
                            <Text style={{marginRight: 10, color: '#3b4e76', fontSize: 15}}>Cost: {item.cost} <Icon name="clock-o" color="#E78200" size={15}/></Text>
                            <Text style={{marginLeft: 5, color: '#3b4e76', fontSize: 15}}>Time: {item.time} <Icon name="dollar" color="#E78200" size={15}/></Text>
                        </View>           
                    </Card>           
                </View>
            </SwipeRow>
        </TouchableWithoutFeedback>
    );
};

class Favorites extends Component {

static navigationOptions = {
        title: 'Favorites'
};

render() {
    const { navigate } = this.props.navigation;
    const favoritesDishes = this.props.populars.populars.populars.filter(d => this.props.populars.favorites.includes(d.id))
    if (this.props.populars.favorites.length === 0) {
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{padding: 80}}>
                    <Text style={{fontSize: 25}}>Your favorite dishes list is empty</Text>
                </ScrollView>
                <View style={{position: 'absolute', bottom: 0, width: '100%', margin: 0, marginBottom: 0}}>
                    <BottomNavBarComponent  navigation={this.props.navigation}/>
                </View>
            </View>
        )
    }
    else   
        return (
            <View style={{flex: 1}}>
                {favoritesDishes.map(p=> {
                    return (
                        <RenderDirectoryItem unMarkFavorite={() => this.props.unMarkFavorite(p.id)} item={p}/>
                    )
                })}
                    <View style={{position: 'absolute', bottom: 0, width: '100%', marginTop: 50, marginBottom: 0, right: 0}}>
                        <BottomNavBarComponent  navigation={this.props.navigation}/>
                    </View>
            </View>   
        );
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
        marginTop: 25,
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
})
   

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
