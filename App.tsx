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
              <View style={styles.passwordContainer}>
                <Text selectable={true} style={styles.password}>{password}</Text>
              </View>
              <Text style={styles.description}>Long Press to Copy</Text>
            </View>
          ) : null}
        </View>
      </ScrollView >
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    height: "100%",
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  inputColumn: {},
  inputStyle: {
    borderWidth: 2,
    paddingVertical: 2,
    paddingHorizontal: 12,
    width: 100,
    height: 30,
    borderRadius: 8,
    color: '#ffffff',
  },
  inputHeading: {
    fontSize: 20,
    fontWeight: '600',
    color: "#ffffff",
  },
  errorText: {
    fontSize: 13,
    color: 'red',
  },
  formActions: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: '#03C6C7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#758283',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    margin: 20,
    marginTop: 60,
    borderRadius: 12,
    height: 200,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  cardHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  passwordContainer: {
    padding: 6,
    backgroundColor: '#fff000',
    borderRadius: 8,
    width: 'auto',
    marginVertical: 8,
  },
  password: {
    color: '#000000',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 8
  },
  description: {
    fontSize: 12,
    color: '#758283',
    textAlign: 'right',
    marginRight: 4,
  }
});

export default App;