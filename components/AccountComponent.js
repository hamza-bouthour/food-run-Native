import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, TextInput, Linking, TouchableOpacity } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { addAccount } from '../redux/ActionCreators';
import { Link } from '@react-navigation/native';
import BottomNavBarComponent from './BottomNavBarComponent'



const mapDispatchToProps = {
    addAccount
};
const mapStateToProps = (populars, products, account) => {
    return {
        products,
        populars,
        account
    };
};
const links = [
    {name: 'Linked-In', url:'https://www.linkedin.com/in/hamza-bouthour-a0265919b/'},
    {name: 'Github', url: 'https://github.com/hamza-bouthour'}
]
const ExternalLink = (props) => {
    const { url, children, style = {}  } = props;
    
    const onPress = () => Linking.canOpenURL(url).then(() => {
        Linking.openURL(url);
    });

    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.text, style]}>{children}</Text>
        </TouchableOpacity>
    );
};


 class Account extends Component {
     constructor(props) {
         super(props)
         this.state= {
             username: null,
             email: null,
             password: null
         }
     }
    static navigationOptions = {
        title: 'Account'
};
handleAccount() {
    this.props.addAccount(this.state.username, this.state.email, this.state.password)
}
    render() {
        if (!this.props.populars.account.username) {
            return (
                <View style={styles.form}>
                    <Input 
                        placeholder='username'
                        onChangeText={values => this.setState({username: values})}
                        value={this.state.username}
                    />
                    <Input 
                        placeholder='email'
                        onChangeText={values => this.setState({email: values})}
                        value={this.state.email}
                    />
                    <Input 
                        placeholder='password'
                        onChangeText={values => this.setState({password: values})}
                        value={this.state.password}
                    />
                    <View style={{marginHorizontal: 10}}>
                                <Button 
                                    title='Sign-up'
                                    color='#3b4e76'
                                    onPress={ () => {
                                        this.handleAccount();
                                        
                                    }}
                                />
                    </View>
                    <View style={{position: 'absolute', bottom: 0, width: '100%', marginTop: 50, marginBottom: 0}}>
 
                    <BottomNavBarComponent  navigation={this.props.navigation}/>
                </View>
                </View>
        
            )
        }
        else {
            return (
                    <View style={styles.profile}>
                        <ScrollView style={{padding: 20}}>
                            
                            <Text>Hello, <Text style={{fontSize: 20}}>{this.props.populars.account.username}!</Text></Text>
                            <View style={styles.text}>
                                <Text>Thanks for checking Food-Run,</Text>
                                <Text>Please look up my:</Text>
                            </View>
                            <View style={styles.links}>
                            {links.map(x => {
                                return (
                                    <ExternalLink url={x.url}>
                                        {x.name}
                                    </ExternalLink>
                                )
                            }
                                

                                
                                )}
                            </View>
                            </ScrollView>
                        <View style={{position: 'absolute', bottom: 0, width: '100%', margin: 0, marginBottom: 0}}>
 
                        <BottomNavBarComponent  navigation={this.props.navigation}/>
                        </View>
                    </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    form: {
        padding: 20,
        marginTop: 20,
        flex: 1
    },
    profile: {
        
        marginTop: 30,
        flex: 1
    },
    text: {
        padding: 20,
        marginTop: 10
    },
    links: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: -20
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Account);