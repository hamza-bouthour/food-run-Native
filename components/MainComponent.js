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
import Account from './AccountComponent';
import FavoriteProducts from './FavoriteProductsComponent'
import { fetchPopulars } from '../redux/ActionCreators'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

const mapDispatchToProps = {
    fetchPopulars
};
const mapStateToProps = (populars, account) => {
    return {
        account,
        populars
    };
};
const HomeNavigator = createStackNavigator(
    {
        Dish: { screen: Dish },
        Home: { screen: Home }
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: ({navigation}) => {
            // let asba = props.navigation.state.account.username
            return ({

                headerTitleAlign: 'left',
                headerStyle: {
                    backgroundColor: '#3b4e76', 
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                
                    flex:1 
                },
                headerLeft:  
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Home')}>
                        <Image 
                            style={{width: 80, height: 50, marginTop: 18}}
                            resizeMode="cover"
                            source={{ uri: 'https://i.postimg.cc/W1nYqJvk/asba.png'}} 
                
                        />
                    </TouchableOpacity>,
                headerRight: <Text><Icon
                name={'user-o'}
                size={25}
                color="#039FB6"
                style={{marginRight: 10, marginTop: 6}}
                onPress={() => navigation.navigate('Account')}
            />  </Text>
            })
                
        }
    }
)
const CartNavigator = createStackNavigator(
    {
        Cart: { screen: Cart }
    },
    {   
        defaultNavigationOptions: ({navigation}) => ({
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#3b4e76', 
            },
            headerTintColor: 'white',
            headerTitleStyle: {
            
                flex:1 
            },
            headerLeft:  
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Home')}>
                    <Image 
                        style={{width: 80, height: 50, marginTop: 18}}
                        resizeMode="cover"
                        source={{ uri: 'https://i.postimg.cc/W1nYqJvk/asba.png'}} 
            
                    />
                </TouchableOpacity>,
            headerRight:  
                <Icon
                    name='user-o'
                    size={25}
                    color="#039FB6"
                    style={{marginRight: 10, marginTop: 6}}
                    onPress={() => navigation.navigate('Account')}
                />  
        }) 
    }
)
const AccountNavigator = createStackNavigator(
    {
        Account: { screen: Account}
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#3b4e76', 
            },
            headerTintColor: 'white',
            headerTitleStyle: {
            
                flex:1 
            },
            headerLeft:  
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Home')}>
                    <Image 
                        style={{width: 80, height: 50, marginTop: 18}}
                        resizeMode="cover"
                        source={{ uri: 'https://i.postimg.cc/W1nYqJvk/asba.png'}} 
            
                    />
                </TouchableOpacity>,
            headerRight:  
                <Icon
                    name='user-o'
                    size={25}
                    color="#039FB6"
                    style={{marginRight: 10, marginTop: 6}}
                    onPress={() => navigation.navigate('Account')}
                />  
        }) 
    }
)
const FavoritesNavigator = createStackNavigator(
    {
        'My Dishes': { screen: Favorites }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#3b4e76', 
            },
            headerTintColor: 'white',
            headerTitleStyle: {
            
                flex:1 
            },
            headerLeft:  
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Home')}>
                    <Image 
                        style={{width: 80, height: 50, marginTop: 18}}
                        resizeMode="cover"
                        source={{ uri: 'https://i.postimg.cc/W1nYqJvk/asba.png'}} 
            
                    />
                </TouchableOpacity>,
            headerRight:  
                <Icon
                    name='user-o'
                    size={25}
                    color="#039FB6"
                    style={{marginRight: 10, marginTop: 6}}
                    onPress={() => navigation.navigate('Account')}
                />  
        }) 
    }
)
const FavoriteProductsNavigator = createStackNavigator(
    {
        'My products': { screen: FavoriteProducts }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#3b4e76', 
            },
            headerTintColor: 'white',
            headerTitleStyle: {
            
                flex:1 
            },
            headerLeft:  
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Home')}>
                    <Image 
                        style={{width: 80, height: 50, marginTop: 18}}
                        resizeMode="cover"
                        source={{ uri: 'https://i.postimg.cc/W1nYqJvk/asba.png'}} 
            
                    />
                </TouchableOpacity>,
            headerRight:  
                <Icon
                    name='user-o'
                    size={25}
                    color="#039FB6"
                    style={{marginRight: 10, marginTop: 6}}
                    onPress={() => navigation.navigate('Account')}
                />  
        }) 
    }
)
const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView 
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}
        >
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image 
                    source={{ uri: 'https://i.postimg.cc/W1nYqJvk/asba.png'}} 
                        style={styles.drawerImage}
                    />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Food-RUN</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);
const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Account: { screen: AccountNavigator},
        Cart: { screen: CartNavigator },
        'My dishes': { screen: FavoritesNavigator },
        'My products': { screen: FavoriteProductsNavigator }
    },
    {
        initialRouteName: 'Home',
        drawerBackgroundColor: '#3b4e76',
        contentOptions: {
            labelStyle: {
             
              color: 'white',
            },
          },
        contentComponent: CustomDrawerContentComponent
        
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
 
        backgroundColor: '#3b4e76',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
     
        height: 130,
        width: 130
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
// export default Main
