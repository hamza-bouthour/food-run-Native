import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/ActionCreators';


const mapDispatchToProps = {
    fetchProducts
};
const mapStateToProps = (populars, products,favorites) => {
    return {
        products,
        populars,
        favorites
    };
};

 class Favorites extends Component {
    static navigationOptions = {
        title: 'Favorites'
};
// componentDidMount() {
//     this.props.fetchProducts();
// }
    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) => {
            return (
                <Tile
                    // overlayContainerStyle={{marginBottomn: 10}}
                    title={item.name}
                    // onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                    imageSrc={{uri: item.img}}
                    caption='some caption'
                    onPress={()=> navigate('Dish', { dishId: item.id })}
                    
                >
                <View
                    style={styles.cardCaptions}
                >   
                    
                    <Text style={{marginRight: 10}}>Cost: {item.cost} <Icon name="clock-o" color="darkgreen" size={15}/></Text>
                    <Text style={{marginLeft: 5}}>Time: {item.time} <Icon name="dollar" color="darkgreen" size={15}/></Text>
                   
                </View>
                </Tile>
            );
        };
        if (this.props.populars.populars.isLoading) {
            return <Loading />;
        }
        if (this.props.populars.populars.errMess) {
            return (
                <View>
                    <Text>{this.props.populars.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.populars.populars.populars}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
                horizontal={false}
                numColumns={1}
            />
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);