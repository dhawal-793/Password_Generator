import { useState } from 'react';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Yup from 'yup'

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';


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

  const generatePassword = (passwordLength: number) => {

    setPassword("")
    setIsPasswordGenerated(false)

    let characters = '';
    if (useLowerCase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (useUperCase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) characters += '0123456789';
    if (useSymbols) characters += '!@#$%^&*()_+';

    const newPassword = createPassword(characters, passwordLength)
    setPassword(newPassword)
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
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Text>PassWord Generator</Text>
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
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputHeading}>Include Lowercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={useLowerCase}
                    onPress={() => setuseLowerCase(!useLowerCase)}
                    fillColor='#EA580C'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputHeading}>Include Upercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={useUperCase}
                    onPress={() => setuseUperCase(!useUperCase)}
                    fillColor='#E11D48'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputHeading}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={useNumbers}
                    onPress={() => setUseNumbers(!useNumbers)}
                    fillColor='#3B82F6'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputHeading}>Include Symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={useSymbols}
                    onPress={() => setUseSymbols(!useSymbols)}
                    fillColor='#22C55E'
                  />
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    onPress={() => handleSubmit()}
                    style={styles.primaryButton}
                  >
                    <Text style={styles.primaryButtonText}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => {
                      handleReset()
                      resetPassword()
                    }}
                  >
                    <Text style={styles.secondaryButtonText}> Reset Password </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
          {isPasswordGenerated ? (
            <View style={styles.card}>
              <Text style={styles.cardHeading}>Password:</Text>
              <Text selectable={true} style={styles.cardText}>{password}</Text>
            </View>
          ) : null}
        </View>
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
  primaryButton: {},
  primaryButtonText: {},
  secondaryButton: {},
  secondaryButtonText: {},
  card: {},
  cardHeading: {},
  cardText: {},
});

export default App;