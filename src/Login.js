import React , {useState , useEffect} from 'react';
import { View  , Text , Image , TextInput, StatusBar, PermissionsAndroid} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-toast-message';
import axios from 'axios';

//Styles
import style from './Style';
import Geolocation from '@react-native-community/geolocation';

const Login = props => {
  const [ data , setData ] = useState({});

  //Login Handler
  const loginHandler = () => {
    if (!data.User_Name || !data.User_PWD) {
        return Toast.show({
            text1 : 'Insert Your username & password first',
            type : 'error',
            visibilityTime:3000,
            position : 'bottom'
        });
    };

    //Send user's credintials to server
    axios
        .post('http://account.clockinhr.com/api/employee/login-portal/2', data)
        .then(res => {
            if (res.data.Result) {
              Toast.show({
                text1 : res.data.Message,
                text2 : 'Welcome To Clockin App',
                type:'success',
                visibilityTime:3000,
              });
              return props.navigation.navigate('home', {empId : res.data.data.Emp_ID});
            }

            return Toast.show({
                text1 : 'Please Check Your Credentials',
                type : 'error',
                visibilityTime:3000,
              });
        })
        .catch(error => {
            alert('Something wrong happened !!!!');
        });

  }

  useEffect(() => {
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                    'title': 'Location Access Required',
                    'message': 'This App needs to Access your location'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //To Check, If Permission is granted
            } else {
                alert("Permission Denied");
            }
        } catch (err) {
                alert("err",err);
        }
    }
    requestLocationPermission();
}, [])

  return (
    <View style={style.container}>
        <StatusBar
         backgroundColor="#FFF"
         barStyle={'dark-content'}
        />
        <Animatable.View
            animation={'fadeInDown'}
            style={style.loginHeader}
        >
            <Image 
                source={require('./assets/logo_clock.png')}
                style={{width: 150, height: 80, marginTop :50}}
                resizeMode={'contain'}
            />
            <Text
                style={style.title}
            >
                Login 
            </Text>
        </Animatable.View>
        <View
            style={style.loginForm}
        >
            <TextInput 
                placeholder={'Please Insert Your Username'}
                placeholderTextColor="#CCC"
                keyboardType={'email-address'}              
                onChangeText={(val) => setData({ ...data ,User_Name : val})}
                style={style.textInputContainer}
            />
            <TextInput 
                placeholder={'Please Insert Your Password'}
                placeholderTextColor="#CCC"
                secureTextEntry={true}              
                onChangeText={(val) => setData({ ...data, User_PWD : val})}
                style={style.textInputContainer}
            />
            <RectButton
                style={style.loginButton}
                onPress={loginHandler}
            >
                <Text style={style.loginButtonText}>
                    Login
                </Text>
            </RectButton>
        </View>
    </View>
  );
}

export default Login;