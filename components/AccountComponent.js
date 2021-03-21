import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, TextInput } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/ActionCreators';


const mapDispatchToProps = {
    fetchProducts
};
const mapStateToProps = (populars, products, account) => {
    return {
        products,
        populars,
        account
    };
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
// componentDidMount() {
//     this.props.fetchProducts();
// }
    render() {
        if (!this.props.account) {
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
                                    color='#5637DD'
                                    // onPress={ () => {
                                    //     this.handleComment(campsiteId);
                                    //     this.resetForm();
                                    // }}
                                />
                    </View>
                </View>
        
            )
        }
        else {
            <View style={styles.form}>
                    <Input 
                        placeholder='username'
                        onChangeText={values => this.setState({username: values})}
                        value={this.state.username}
                    />
                    <Input 
                        placeholder='password'
                        onChangeText={values => this.setState({password: values})}
                        value={this.state.password}
                    />
                    <View style={{marginHorizontal: 10}}>
                                <Button 
                                    title='Sign-in'
                                    color='#5637DD'
                                    // onPress={ () => {
                                    //     this.handleComment(campsiteId);
                                    //     this.resetForm();
                                    // }}
                                />
                    </View>
                </View>
        }
    }
}
const styles = StyleSheet.create({
    form: {
        padding: 20,
        marginTop: 20
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Account);