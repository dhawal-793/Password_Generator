import { FC, useState } from 'react';
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

  const checkInputs = [
    {
      heading: 'Include Lowercase',
      isChecked: useLowerCase,
      onPress: setuseLowerCase,
      color: "#EA580C"
    },
    {
      heading: 'Include Upercase',
      isChecked: useUperCase,
      onPress: setuseUperCase,
      color: "#E11D48"
    },
    {
      heading: 'Include Numbers',
      isChecked: useNumbers,
      onPress: setUseNumbers,
      color: "#3B82F6"
    },
    {
      heading: 'Include Symbols',
      isChecked: useSymbols,
      onPress: setUseSymbols,
      color: "#22C55E"
    },
  ]

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

  const checkErrorMessage = (message: string, password: string) => {
    const errorMessage = `passwordLength must be a \`number\` type, but the final value was: \`NaN\` (cast from the value \`"${password}"\`).`
    if (message === errorMessage) {
      return "Should be a Number"
    }
    return message
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Text style={styles.heading}>Password Generator</Text>
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
              handleChange,
              handleReset,
              handleSubmit,
            }) => (
              <>
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputHeading}>Password Length</Text>
                    <TextInput
                      style={[styles.inputStyle, { borderColor: touched.passwordLength && errors.passwordLength ? '#e11d48' : '#ffffff' }]}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder='Ex. 8'
                      keyboardType='numeric'
                    />
                  </View>
                  <View style={styles.errorContainer}>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText} selectable={true}> {checkErrorMessage(errors.passwordLength, values.passwordLength)}</Text>
                    )}
                  </View>
                </View>
                {
                  checkInputs.map((input) => (
                    <CheckInput
                      key={input.heading}
                      {...input}
                    />
                  ))
                }
                <View style={styles.formActions}>
                  <TouchableOpacity
                    // disabled={!isValid}
                    onPress={() => handleSubmit()}
                    style={[styles.button, { backgroundColor: '#03C6C7' }]}
                  >
                    <Text style={styles.buttonText}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#758283' }]}
                    onPress={() => {
                      handleReset()
                      resetPassword()
                    }}
                  >
                    <Text style={styles.buttonText}> Reset Password </Text>
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
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#35BDD0'
  },
  inputContainer: {
    flexDirection: 'column'
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    borderWidth: 2,
    paddingVertical: 2,
    paddingHorizontal: 12,
    width: 150,
    height: 32,
    borderRadius: 8,
    color: '#ffffff',
    fontSize: 18,
  },
  inputHeading: {
    fontSize: 20,
    fontWeight: '600',
    color: "#ffffff",
  },
  checkBoxInputWrapper: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    borderColor: '#ffffff',
  },
  errorContainer: {
    height: 30,
    width: "100%",
    marginTop: -8,
    paddingHorizontal: 10,
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
    marginLeft: 'auto',
    marginRight: 5,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  buttonText: {
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


interface CheckInputProps {
  heading: string;
  isChecked: boolean;
  onPress: (value: boolean) => void;
  color: string;
}

const CheckInput: FC<CheckInputProps> = ({ heading, isChecked, onPress, color }) => {
  return (
    <View style={[styles.inputWrapper, styles.checkBoxInputWrapper]}>
      <Text style={styles.inputHeading}>{heading}</Text>
      <BouncyCheckbox
        disableBuiltInState
        isChecked={isChecked}
        onPress={() => onPress(!isChecked)}
        fillColor={color}
      />
    </View>
  )
}