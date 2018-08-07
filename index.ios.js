/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import MapView from './MapView.js';
import React, { Component } from 'react';
import {
    Text,
    AppRegistry,
    Image,
    View,
    StyleSheet,
    TextInput,
    Button,
    TouchableOpacity,
    InteractionManager,
    Animated,
    Easing,
    Platform,

} from 'react-native';
import {
    createStackNavigator,
    StackNavigator,
}from 'react-navigation';
import {RNCamera} from 'react-native-camera';
import {NativeModules} from 'react-native';

var id: String;
var password: String;

class HomeScreen extends React.Component{
    static navigationOptions = {
        title: 'Welcome',
    };
    render(){
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1,flexDirection:'column', alignItems: 'center', justifyContent:'center'}}>
                <View style={{width: '100%',flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
                    <Text>ID:</Text>
                    <TextInput style={{width: 200,height: 40}} placeholder ="Please input ID"
                               onChangeText={(text) => id = text}
                    />
                </View>
                <View style={{width: '100%',flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
                    <Text>Password:</Text>
                    <TextInput  style={{width: 200, height: 40}} placeholder ="Please input Password"
                                password = 'true'
                                onChangeText={(text) => password = text}
                    />
                </View>

                <Button title="Login"
                onPress={() => navigate('Details',{name: 'Jane'})}
                />
            </View>
        );
    }
}

class DetailsScreen extends  React.Component{
    static  navigationOptions = {
      title:'Details',
    };
    componentDidMount(){
        const CalendarManager = NativeModules.CalendarManager;
        let date = new Date();
        CalendarManager.addEvent(
            "Birthday Party",
            "4 Privet Drive, Surrey",
            date.getTime()
        );
    }
    render(){
        const {navigate} = this.props.navigation;



        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text>Welcome user {id}</Text>
                <Button title="Scan"
                        onPress={() => navigate('ScanQR',{name: 'QR'})}
                />
                <MapView style={{flex:1}}/>
            </View>
        );
    }
}

class ScanScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            moveAnim: new Animated.Value(0)
        };
    }

    componentDidMount() {
        this.startAnimation();
    }

    startAnimation = () => {
        this.state.moveAnim.setValue(0);
        Animated.timing(
            this.state.moveAnim,
            {
                toValue: -200,
                duration: 1500,
                easing: Easing.linear
            }
        ).start(() => this.startAnimation());
    };
    //  识别二维码
    onBarCodeRead = (result) => {
        const { navigate } = this.props.navigation;
        const {data} = result;
        navigate('Sale', {
            url: data
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    onBarCodeRead={this.onBarCodeRead}
                >
                    <View style={styles.rectangleContainer}>
                        <View style={styles.rectangle}/>
                        <Animated.View style={[
                            styles.border,
                            {transform: [{translateY: this.state.moveAnim}]}]}/>
                        <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                    </View>
                </RNCamera>
            </View>
        );
    }
}

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen,
        ScanQR: ScanScreen,
    }
);


export default class MyApp extends Component {
  render(){
      return <RootStack />;
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 200,
        height: 2,
        backgroundColor: '#00FF00',
    }
});

AppRegistry.registerComponent('MyApp', () => MyApp);