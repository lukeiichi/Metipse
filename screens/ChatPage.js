import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
  } from 'react';
  import { TouchableOpacity, Text } from 'react-native';
  import { GiftedChat } from 'react-native-gifted-chat';
  import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
  } from 'firebase/firestore';
  import { signOut } from 'firebase/auth';
  
  import { addChat, auth, database, getCurrentUser, Fire } from '../config/firebase';

  export default function ChatPage({ navigation }) {
    const [messages, setMessages] = useState([]);
  
  const onSignOut = () => {
      signOut(auth).catch(error => console.log('Error logging out: ', error));
    };
  
    useLayoutEffect(() => {
        console.log("lol")
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{
              marginRight: 10
            }}
            onPress={onSignOut}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        )
      });
    }, [navigation]);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
        );  
        addChat(messages)
    });

    return(
        <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: getCurrentUser(),
          avatar: 'https://i.pravatar.cc/300'
        }}
      />
    )
}
