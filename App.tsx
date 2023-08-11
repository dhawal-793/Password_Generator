import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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

  const generatePassword = (passwordLength: number) => {
    let characters = '';
    if (useLowerCase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (useUperCase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) characters += '0123456789';
    if (useSymbols) characters += '!@#$%^&*()_+';

    setPassword(createPassword(characters, passwordLength))
    setIsPasswordGenerated(true)
  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      result += characters.charAt(Math.round(Math.random() * characters.length))
    }
    return result;
  }

  const resetPassword = () => {
    setPassword("")
    setIsPasswordGenerated(false)
    setuseUperCase(false)
    setuseLowerCase(true)
    setUseNumbers(false)
    setUseSymbols(false)
  }

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

        <Formik
          initialValues={{ passwordLength: '' }}
          validationSchema={passwordSchema}
          onSubmit={(values) => {
            console.log(values);
            generatePassword(+values.passwordLength)

          }}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleReset,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.inputHeading}>Password Length</Text>
                  {touched.passwordLength && errors.passwordLength && (
                    <Text style={styles.errorText}> {errors.passwordLength}</Text>
                  )}
                </View>
                <TextInput
                  style={styles.inputStyle}
                  value={values.passwordLength}
                  onChangeText={handleChange('passwordLength')}
                  placeholder='Ex. 8'
                  keyboardType='numeric'
                />
              </View>
              <View style={styles.inputWrapper}></View>
              <View style={styles.inputWrapper}></View>
              <View style={styles.inputWrapper}></View>
              <View style={styles.inputWrapper}></View>
              <View style={styles.formActions}>
                <TouchableOpacity>
                  <Text>Generate Password</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text> Reset Password </Text>
                </TouchableOpacity>
              </View>

            </>
          )}
        </Formik>

      </ScrollView >
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {},
  inputWrapper: {},
  inputColumn: {},
  inputStyle: {},
  inputHeading: {},
  errorText: {},
  formActions: {},
});

export default App;