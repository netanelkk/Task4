import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Pages/main';
import Notes from './Pages/notes';
import Note from './Pages/note';
import 'react-native-gesture-handler';
import { I18nManager, Text, StatusBar } from 'react-native';


// forcing Left-to-Right
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);
I18nManager.swapLeftAndRightInRTL(false);

// forcing regular text scale
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const Stack = createNativeStackNavigator();

// Need also to change in api/index.js
window.API_URL = "http://10.0.0.10:45455";


function App() {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        barStyle="dark-content"
        hidden={false}
      />
        <NavigationContainer theme={MyTheme}>
                <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Main" component={Main} />
                    <Stack.Screen name="Notes" component={Notes} />
                    <Stack.Screen name="Note" component={Note} />
                </Stack.Navigator>
        </NavigationContainer>
    </>

  );
}


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: '#ffffff'
  },
};


export default App;
