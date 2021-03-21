import React, { Component } from 'react';
import { View, Platform, StyleSheet,Text, ScrollView, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import  Home  from './HomeComponent'
import Dish from './DishComponent';
import Cart from './CartComponent';
import Favorites from './FavoritesComponent';
import Account from './AccountComponent'
import { fetchPopulars } from '../redux/ActionCreators'
import { populars } from '../redux/popularDishesReducer';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const HomeNavigator = createStackNavigator(
    {
        Dish: { screen: Dish },
        Home: { screen: Home }
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#039FB6'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }

)
const CartNavigator = createStackNavigator(
    {
        Cart: { screen: Cart }
    },
    {
        initialRouteName: 'Cart',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#039FB6'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
)
const AccountNavigator = createStackNavigator(
    {
        Account: { screen: Account}
    },
    {
        initialRouteName: 'Account',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#039FB6'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
)
const FavoritesNavigator = createStackNavigator(
    {
        Favorites: { screen: Favorites }
    },
    {
        initialRouteName: 'Favorites',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#039FB6'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
)
const mapDispatchToProps = {
    fetchPopulars
};
const mapStateToProps = populars => {
    return {
        
        populars
    };
};
const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Account: { screen: AccountNavigator},
        Cart: { screen: CartNavigator },
        Favorites: { screen: FavoritesNavigator }
    }
)
const AppNavigator = createAppContainer(MainNavigator)
 class Main extends Component {

    render() {
        return (
            <View
            style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
                
        }}>
                
        
      
            <AppNavigator />
         
            </View>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
// export default Main
