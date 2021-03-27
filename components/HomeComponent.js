import React, { Component } from 'react'
import { View, Text } from 'react-native';
import { fetchPopulars, fetchProducts } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { Tile } from 'react-native-elements';
import Loading from './LoadingComponent';
import { POPULARS } from '../shared/populars'
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNavBarComponent from './BottomNavBarComponent';
import * as Animatable from 'react-native-animatable';

const mapDispatchToProps = {
    fetchPopulars,
    fetchProducts
};
const mapStateToProps = (populars,account) => {
    return {
        
        populars,
        account
    };
};

class Home extends Component {
     constructor(props) {
         super(props)
         this.state ={
             populars: POPULARS
         }
     }

static navigationOptions = {
        title: 'Home',      
};
  componentDidMount() {
        this.props.fetchPopulars(); 
    }
    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) => {
            return (
                <Tile
                    title={item.name}
                    imageSrc={{uri: item.img}}
                    onPress={()=> navigate('Dish', { dishId: item.id, dishName: item.name })}
                    titleStyle={{color: '#3b4e76'}}
                    containerStyle={{height: 450}}  
                >
                    <View
                        style={styles.cardCaptions}
                    >   
                    <Text style={{marginRight: 10, color: '#3b4e76', fontSize: 15}}>Cost: {item.cost} <Icon name="dollar" color="#039FB6" size={15}/></Text>
                    <Text style={{marginLeft: 5, color: '#3b4e76', fontSize: 15}}>Time: {item.time} <Icon name="clock-o" color="#E78200" size={15}/></Text>
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Text>{item.description}</Text>
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
            <Animatable.View
            animation='fadeInRightBig' 
            duration={2000} 
            delay={1000}
            style={{flex: 1}}>
            <ScrollView>
                <FlatList
                    data={this.props.populars.populars.populars}
                    renderItem={renderDirectoryItem}
                    keyExtractor={item => item.id.toString()}
                    horizontal={false}
                    numColumns={1}
                />
                <BottomNavBarComponent  navigation={this.props.navigation}/>
            </ScrollView>
            </Animatable.View>
        );
    }
}

const styles= StyleSheet.create({
    cardCaptions: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,   
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);