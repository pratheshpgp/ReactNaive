import  React, {useLayoutEffect, useState, useCallback, useEffect} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {auth, db} from '../firebase'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { GiftedChat } from 'react-native-gifted-chat'

const ChatScreen = ({navigation}) => {   
const [messages, setMessages] = useState([]);

    

  useLayoutEffect(()=> {
      const unsubscribe = db.collection('chats').orderBy('createdAt', 'desc').onSnapshot(snapshot=>setMessages(
          snapshot.docs.map(doc=>({
            _id : doc.data()._id,
            createdAt : doc.data().createdAt.toDate(),
            text : doc.data().text,
            user : doc.data().user
          }))
      ))
      return unsubscribe;
  }, [])

  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      const {
          _id,
          createdAt,
          text,
          user
      }=messages[0]
      db.collection('chats').add({
          _id,
          createdAt,
          text,
          user
      })
    }, [])


    useLayoutEffect(()=> {
      navigation.setOptions({

        headerLeft: ()=> (
            <View>
                <Avatar
                    rounded
                    source = {{uri: auth?.currentUser?.photoURL}}
                />
            </View>
         ),

          headerRight: ()=> (
            <TouchableOpacity onPress={signOut}>
               <AntDesign name="logout" size={24} color="black"/>
            </TouchableOpacity>
      )
    })
    }, [])

    const signOut = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }
    return (       
            <GiftedChat messages={messages} 
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL
            }}
            />
       
    )
}

export default ChatScreen