import React, { Component } from 'react';
import { Text, View, ScrollView,  StyleSheet, Linking, TouchableOpacity, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { addAccount, logOut, takePhoto } from '../redux/ActionCreators';
import BottomNavBarComponent from './BottomNavBarComponent'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/FontAwesome';




const mapDispatchToProps = {
    addAccount,
    logOut,
    takePhoto
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
             password: null,
             imageUrl: null
         }
     }
    static navigationOptions = {
        title: 'Account'
};
getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
        const capturedImage = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1]
        });
        if (!capturedImage.cancelled) {
            console.log(capturedImage);
            this.props.takePhoto(capturedImage.uri)
            this.setState({imageUrl: capturedImage.uri});
        }
    }
}
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
                    <View 
                        style={{marginTop: 10, flexDirection: 'row',justifyContent: 'center',}}
                    >
                        <Button 
                            title='Sign-up'
                            containerStyle={{color:'#3b4e76'}}
                            color='#3b4e76'
                            buttonStyle={{marginRight: 10, backgroundColor: '#E78200'}}
                            onPress={ () => {
                                this.handleAccount();
                            
                                
                            }}
                        />
                        <Button 
                            title='Avatar'
                            color='#3b4e76'
                            buttonStyle={{marginLeft: 10, backgroundColor: '#3b4e76'}}
                            onPress={ () => {
                                this.getImageFromCamera();
                                
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
                        <View
                            style={{flexDirection: 'row', justifyContent: 'flex-end',}}                
                        >
                            <Icon 
                                name='sign-out'
                                color='#039FB6'  
                                size={25}
                                onPress={ () => {
                                    this.props.logOut();    
                                }}
                            />
                        </View>
                        <View 
                            style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 40}}>
                            <Image 
                                source={{ uri: this.props.populars.account.photo }}
                                style={styles.image}
                            />
                        </View>
                        <Text>Hello, 
                            <Text 
                                style={{fontSize: 20}}> {this.props.populars.account.username}!
                            </Text>
                        </Text>
                        <View style={styles.text}>
                            <Text>Thanks for checking Food-Run,</Text>
                            <Text>Please look up my:</Text>
                        </View>
                        <View style={styles.links}>
                            {links.map((x,i) => {
                                return (
                                    <ExternalLink url={x.url} key={i}>
                                        {x.name}
                                    </ExternalLink>
                                )
                            })}  
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
        marginTop: 40,
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
    },
    image: {
        width: 160,
        height: 160,
        borderRadius: 150
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Account);