import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import * as Animatable from "react-native-animatable";

import { useNavigation } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";

export default function SignIn() {
  const navigation = useNavigation();

  const [juros, setJuros] = useState("");
  const [juros2, setJuros2] = useState(null);

  useEffect(() => {
    async function carregarJuros() {
      const response = await fetch("http://10.0.2.2:3000/api/juros");
      const data = await response.json();
      setJuros(data.result[0].juros);
    }
    carregarJuros();
  }, []);

  const handleSignIn = () => {
    if (juros2 === null) {
      Alert.alert("Preencha o valor");
    } else {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: `juros=` + juros2,
      };

      fetch("http://10.0.2.2:3000/api/juros_update", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
      navigation.navigate("Home");
      Alert.alert("Juros alterado !!!");
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Juros</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Valor do juros: {juros}%</Text>

        <TextInput
          placeholder="Exemplo: para mudar para 30% digite apenas 30"
          style={styles.input}
          value={juros2}
          onChangeText={setJuros2}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Mudar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38a69d",
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#38a69d",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 4,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: "#a1a1a1",
  },
  labelError: {
    alignSelf: "flex-start",
    color: "#ff375b",
    marginBottom: 8,
  },
});
