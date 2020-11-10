import React, {useEffect, useState} from 'react';
import { View  , Text, SafeAreaView , Platform , Image  , PermissionsAndroid} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
//Style
import style from './Style';

const Home = props => {
    const [distance, setDistance] = useState();
    const [companyCoords, setcompanyCoords] = useState({lat: 0.0, long: 0.0});
    const [employeeCoords, setemployeeCoords] = useState({lat:0.0 , long:0.0})

    const getEmployeeLocation = async () => {
        await Geolocation.getCurrentPosition(info =>{
            setemployeeCoords({lat: info.coords.latitude , long: info.coords.longitude});
            calculateDistance();
        });
    }
    
    const getCompanyCoords = async () => {
        axios
            .post(`http://account.clockinhr.com/api/company/get-emp-last-today/${props.route.params.empId}/true/ok`)
            .then(res => {
                if(res.data.Result){
                    setcompanyCoords({lat: res.data.latitude  , long : res.data.longitude});
                    calculateDistance();
                }
            });

    }

    const calculateDistance = () => {
        const dist = Math.sqrt(Math.pow(companyCoords.lat - employeeCoords.lat, 2) + Math.pow(companyCoords.long - employeeCoords.long, 2));
        setDistance((dist * 1000).toFixed(2));
    }

    useEffect(() => {
        getCompanyCoords();
        getEmployeeLocation();
        calculateDistance();
    },[companyCoords]);

    return <View
            style={style.mapConrainer}
        >
        <MapView
                    provider={(Platform.OS === "ios") ? null : PROVIDER_GOOGLE}
                    style={{width : '100%' , height: '100%'}}
                    initialRegion={{
                    latitude:  parseFloat(employeeCoords.lat) ,
                    longitude: parseFloat(employeeCoords.long)  ,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0521,
                    }}
                    onRegionChange={calculateDistance}
                    zoomEnabled={true}
                    showsBuildings={true}
                    showsScale={true}
                    showsUserLocation={true} >
                        <Marker
                            title="موقعك الحالي"
                            coordinate={{
                                "latitude": parseFloat(employeeCoords.lat) ,
                                "longitude": parseFloat(employeeCoords.long) 
                            }}
                        >
                                 <Image source={require('./assets/employee-marker.png')} 
                                    resizeMode="contain"
                                   style={{height: 60, width: 70 }}/>
                        </Marker>
                        <Marker
                            title="موقع الشركة"
                            coordinate={{
                                "latitude": parseFloat(companyCoords.lat) ,
                                "longitude": parseFloat(companyCoords.long) 
                            }}
                        >
                            <Image source={require('./assets/company-marker.png')} 
                                    resizeMode="contain"
                                   style={{height: 60, width: 70 }}/>
                        </Marker>
            </MapView>
            <View
                 style={style.bottomSection}
            >
                <Text
                    style={{fontSize:16,fontWeight: '700'}}
                >
                    أنت تبعد عن الشركة مسافة : {distance}  كم
                </Text>
            </View>
      </View>
}

export default Home;