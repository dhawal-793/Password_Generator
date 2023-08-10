import { useState } from 'react';
import * as Yup from 'yup'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';


const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(8, "Should be min of 8 characters")
    .max(16, "Should be max of 16 characters")
    .required('Length is Required'),
})


function App(): JSX.Element {
  
  //  States
  const [password, setPassword] = useState("")
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)
  const [useLowerCase, setuseLowerCase] = useState(true)
  const [useUperCase, setuseUperCase] = useState(false)
  const [useNumbers, setUseNumbers] = useState(false)
  const [useSymbols, setUseSymbols] = useState(false)

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.container}>
          <Text>PassWord Generator</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default App;
