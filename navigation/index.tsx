import {FontAwesome} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, StatusBar} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Auth from '../screens/AuthScreen';
import Loading from '../screens/LoadingScreen';
import NewsFeed from '../screens/NewsFeedScreen';
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import {View} from '../components/Themed';
import {Searchbar} from 'react-native-paper';
import {GroupsChats} from '../screens/GroupsChats';
import FavChats from '../screens/FavChats';
import MembersChats from '../screens/MembersChats';
import ChatPage from '../screens/ChatPage';

export default function Navigation({colorScheme} : {
    colorScheme: ColorSchemeName
}) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark'
            ? DarkTheme
            : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator < RootStackParamList > ();

//#region toutes les routes de l'application
/**
 * Root: routes principales de l'applications
 * NotFound : Pas encore finis
 */

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Loading"
                component={Loading}
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name="Auth"
                component={Auth}
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name="Conversation"
                component={ChatPage}
                options={{
                headerShown: false
            }}/>
        </Stack.Navigator>
    );
}
//#endregion #region NavigationTabs

/**
 * Bar de navigation en bas de page qui permet de switcher de page
 */
const BottomTab = createBottomTabNavigator < RootTabParamList > ();
const TopTab = createMaterialTopTabNavigator < RootTabParamList > ();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors[colorScheme].tint
        }}>
            <BottomTab.Screen
                name="Home"
                component={MembersChats}
                options={({navigation} : RootTabScreenProps < 'Home' >) => ({
                tabBarIcon: ({color}) => <TabBarIcon name="home" color={color}/>
            })}/>
            <BottomTab.Screen
                name="Profils"
                component={NewsFeed}
                options={{
                tabBarIcon: ({color}) => <TabBarIcon name="home" color={color}/>
            }}/>
            <BottomTab.Screen
                name="Chat"
                component={ChatsTab}
                options={{
                tabBarIcon: ({color}) => <TabBarIcon name="home" color={color}/>
            }}/>
        </BottomTab.Navigator>
    );
}

/**
 *  Sous navigation de la page conversation
*/
function ChatsTab() {
    const colorScheme = useColorScheme();

    //Je sais pas encore quoi en faire pour l'instant
    const searchRequest = "";
    return (
        <View
            style={{
            flex: 1,
            marginTop: StatusBar.currentHeight
        }}>
            <Searchbar
                theme={theme}
                style={{
                marginHorizontal: 40,
                width: '80%',
                height: '5%',
                backgroundColor: '#E6E6E6'
            }}
                value={searchRequest}
                placeholder="Rechercher..."/>
            <TopTab.Navigator
                initialRouteName="Home"
                screenOptions={{
                swipeEnabled: false
            }}>
                <TopTab.Screen name="Groups" component={GroupsChats}/>
                <TopTab.Screen name="Members" component={MembersChats}/>
                <TopTab.Screen name="Fav" component={FavChats}/>
            </TopTab.Navigator>
        </View>

    )
}
//#endregion

/**
 * Tout les icons à utilisé sur : https://icons.expo.fyi/
 */
function TabBarIcon(props : {
    name: React.ComponentProps < typeof FontAwesome > ['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{
        marginBottom: -3
    }} {...props}/>;
}

const theme = {
    roundness: 20
};