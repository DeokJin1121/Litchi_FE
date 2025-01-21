import React from "react-native";
import { TouchableOpacity, Text, StyleSheet } from "react-native";



const Register_button = ({ style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>등록</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 0,
    left: 30,
    right: 30,
    // width: "90%",
    height: 70,
    backgroundColor: "#1B263B",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default Register_button;
