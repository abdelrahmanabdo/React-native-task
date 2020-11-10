import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    container : {
        flex:1 ,
        alignItems:'center',
        padding:40,
        backgroundColor : '#FFF',
    },
    loginHeader:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    title : {
        fontSize:  19,
        fontWeight : 'bold',
        color: '#CCC'
    },
    loginForm : {
        flex: 2,
        width : width - 40 ,
        marginTop: 60
    },
    textInputContainer:{
        padding: 15,
        borderRadius:8,
        borderWidth : .6,
        borderColor : '#CCC',
        marginBottom : 15
    },
    loginButton: {
        width : '100%',
        borderRadius:8,
        backgroundColor:'#0f4c5c',
        textAlign: 'center',
        justifyContent:'center',
        alignItems:'center',
        padding:15,
        marginTop: 15
    },
    loginButtonText : {
        color : '#FFF',
        fontSize: 17,
        fontWeight:'600'
    },
    mapContainer: {
        flex:1,
        height : height,
        width : width,
        minHeight : 100
    },
    bottomSection :{
        position:'absolute',
        width: width - 15,
        borderRadius : 10,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        bottom: '3%' ,
        height:height * .13,
        padding : 2,
        backgroundColor:'#FFF',
        shadowColor:'#CCC',
        shadowRadius:10,
        elevation:10,
        shadowOffset:{width: 10, height:5},
        shadowOpacity:.3,
    }
});