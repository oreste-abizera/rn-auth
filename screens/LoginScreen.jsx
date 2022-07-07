import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
// import checkAsyncStorage from "../helpers/CheckAsyncStorage";

let height = Dimensions.get("screen").height;

function LoginScreen({ navigation, loggingIn, login, loggedIn }) {
  const bootstrapAsync = async () => {
    // const userStorage = await checkAsyncStorage();
    // if (userStorage.token) {
    //   navigation.navigate(userStorage.token ? "Home" : "Login", {});
    // }
  };

  React.useEffect(() => {
    bootstrapAsync();
  }, []);

  const [state, setstate] = React.useState({ phone_number: "", password: "" });
  const [touched, settouched] = React.useState({
    phone_number: false,
    password: false,
  });

  const { phone_number, password } = state;

  const changeState = (key, value) => {
    setstate({ ...state, [key]: value });
    settouched({ ...touched, [key]: true });
  };

  const touchInput = (key) => {
    settouched({ ...touched, [key]: true });
  };

  const errors = {
    phone_number: touched.phone_number
      ? !phone_number
        ? "Phone Number is required"
        : phone_number.length !== 12
        ? "Phone Number must be 12 characters"
        : phone_number.match(/\d/g)?.length !== 12
        ? "Phone Number is invalid"
        : ""
      : "",
    password: touched.password
      ? !password
        ? "password is required"
        : password.length < 5
        ? "password must be at least 5 characters"
        : ""
      : "",
  };

  const isEnabledSubmit =
    !loggingIn &&
    phone_number.length === 12 &&
    password.length >= 5 &&
    phone_number.match(/\d/g)?.length === 12;

  const phone_numberErrorStyles =
    touched.phone_number && errors.phone_number
      ? styles.inputContainerError
      : {};
  const passwordErrorStyles =
    touched.password && errors.password ? styles.inputContainerError : {};

  const readAllInputs = () => {
    let newTouched = {};
    Object.keys(touched).forEach((key) => {
      newTouched[key] = true;
    });
    settouched(newTouched);
  };

  const signInAsync = async () => {
    if (isEnabledSubmit) {
      const { password, phone_number } = state;
      console.log(state);
      await login(phone_number, password);
    } else {
      readAllInputs();
    }
  };

  return (
    <ScrollView style={styles.loginForm}>
      {/* <Image
        style={styles.loginImage}
        source={require("../assets/images/logo.png")}
      ></Image> */}
      <Text style={styles.heading}>Sign In</Text>
      <View style={styles.form}>
        <Text style={styles.inputLabel}>Telephone</Text>
        <View style={[styles.inputContainer, phone_numberErrorStyles]}>
          <TextInput
            defaultValue=""
            style={styles.input}
            placeholder="Enter Your Telephone Number"
            value={phone_number}
            onChangeText={(value) => changeState("phone_number", value)}
            onBlur={() => touchInput("phone_number")}
          ></TextInput>
        </View>
        {errors.phone_number ? (
          <Text style={styles.error}>{errors.phone_number}</Text>
        ) : null}

        <Text style={styles.inputLabel}>Password</Text>
        <View style={[styles.inputContainer, passwordErrorStyles]}>
          <TextInput
            defaultValue=""
            style={styles.input}
            placeholder="Enter Your Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => changeState("password", value)}
            onBlur={() => touchInput("password")}
          ></TextInput>
        </View>
        {errors.password ? (
          <Text style={styles.error}>{errors.password}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={styles.submit}
        onPress={signInAsync}
        // disabled={!isEnabledSubmit}
      >
        <Text style={styles.submitText}>{loggingIn ? "Wait..." : "Login"}</Text>
      </TouchableOpacity>

      <View style={styles.registerLink}>
        <Text style={styles.registerText}>Not Yet Registered?</Text>
        <Text
          style={styles.registerTextLink}
          onPress={() => navigation.push("Register")}
        >
          Sign Up
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loginForm: {
    minHeight: height / 10,
    width: "100%",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 50,
    paddingTop: height / 15,
  },
  loginImage: {
    width: "80%",
    height: height / 4,
    marginBottom: "20%",
    marginLeft: height / 10,
  },
  heading: {
    color: "#2E0B5B",
    fontWeight: "bold",
    fontSize: 27,
    textAlign: "center",
  },
  form: {
    marginTop: 20,
    minHeight: height / 5,
  },
  inputContainer: {
    borderColor: "rgba(166, 163, 163, 0.45)",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  inputContainerError: {
    borderColor: "#c51244",
  },
  error: {
    color: "#c51244",
    marginBottom: 20,
  },
  inputLabel: {
    color: "#2E0B5B",
    fontWeight: "500",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 2,
  },
  input: {
    // fontWeight: "bold",
  },
  submit: {
    backgroundColor: "#2E0B5B",
    borderRadius: 10,
    paddingVertical: 20,
    width: "100%",
    alignItems: "center",
    marginTop: "40%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  submitText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerLink: {
    marginVertical: height / 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    color: "#4E4E4E",
    marginRight: 4,
  },
  registerTextLink: {
    color: "#2E0B5B",
    fontWeight: "bold",
  },
});

export default LoginScreen;
