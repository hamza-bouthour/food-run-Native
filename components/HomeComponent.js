import React, { Component } from 'react'
import { View, Text } from 'react-native';
import { fetchPopulars } from '../redux/ActionCreators';
import { fetchProducts } from '../redux/ActionCreators'
import { connect } from 'react-redux';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Tile } from 'react-native-elements';
import Loading from './LoadingComponent';
import { POPULARS } from '../shared/populars'

import { populars } from '../redux/popularDishesReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationEvents } from 'react-navigation';




const mapDispatchToProps = {
    fetchPopulars,
    fetchProducts
};
const mapStateToProps = populars => {
    return {
        
        populars
    };
};


 class Home extends Component {

static navigationOptions = {
        title: 'Home'
};
  componentDidMount() {
        this.props.fetchPopulars();
        this.props.fetchProducts()
        // console.log(this.state.populars)
        
    }
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

const styles= StyleSheet.create({
    cardCaptions: {
        flexDirection: 'row',
        justifyContent: 'center'
        
    },
   

})
export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home
