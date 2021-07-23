import  React, {useEffect, useState} from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements';
import {auth} from '../firebase'

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = ()=> {
     auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }


    useEffect(()=> {       
       const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
               navigation.replace('Chat');
            } else {
              navigation.canGoBack() && navigation.PopToTop();
            }
          });

          return unsubscribe
    }, [])
    return (
        <View style={styles.container}>
          <Input placeholder="Enter your email" label="Email"
          leftIcon={{type:'material', name:'email'}}
          value={email}
          onChangeText={text=> setEmail(text)}
          />  
            <Input placeholder="Enter your password" label="Password"
          leftIcon={{type:'material', name:'lock'}}
          value={password}
          onChangeText={text=> setPassword(text)}
          secureTextEntry
          /> 

         <Button title="sign-in"  style={styles.button}
           onPress={signIn}/>
         <Button title="register" style={styles.button}
         onPress={()=>navigation.navigate('Register')} />

        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10
    },
    container: {
        padding:10,
        alignItems: "center"

    }
})