import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

/**
 *  Toutes les routes et sous routes de l'application
 * Pour ajouter une route, penser à modifier le fichier '../types.tsx' ainsi que './index.tsx'
 */
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Auth: '*',
      Loading: '*',
      Root: {
        screens: {
          Profils: {
            screens: {
              Home: 'one',
            },
          },
          Home: {
            screens: {
              NewsFeed: 'two',
            },
          },
          Chat: {
            screens: {
                Groups: 'three',
              Members: 'four',
              Fav: 'five',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};

export default linking;
