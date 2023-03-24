import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Animatable.View animation="zoomIn" style={styles.containerPai}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Juros2");
          }}
        >
          <FontAwesome5 name="money-bill-alt" size={45} color="black" />
          <Text style={styles.txtButton}> Juros</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38a69d",
    alignItems: "center",
    justifyContent: "center",
  },
  containerPai: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    padding: 20,
  },
  txtButton: {
    fontSize: 40,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
  },
});
