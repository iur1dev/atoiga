import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import numeral from "numeral";

export default function SignIn() {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);

  const [enviado, setEnviado] = useState(null);
  const [enviado2, setEnviado2] = useState(null);
  const [enviadoTotal, setEnviadoTotal] = useState(null);
  const [enviadoTotal2, setEnviadoTotal2] = useState(null);
  useEffect(() => {
    async function carregarEnviado() {
      try {
        const response = await fetch("http://10.0.2.2:3000/api/enviado");
        const data = await response.json();
        const valorFormatado = numeral(data.result[0].valorPego).format(
          "0,0.00"
        );
        const valorFormatado2 = numeral(data.result[0].valorPego * 1.3).format(
          "0,0.00"
        );

        setEnviado(valorFormatado);
        setEnviado2(valorFormatado2);

        const response2 = await fetch("http://10.0.2.2:3000/api/enviado_total");
        const data2 = await response2.json();

        const valorFormatado3 = numeral(data2.result[0].valorPego).format(
          "0,0.00"
        );
        const valorFormatado4 = numeral(data2.result[0].valorPego * 1.3).format(
          "0,0.00"
        );
        setEnviadoTotal(valorFormatado3);
        setEnviadoTotal2(valorFormatado4);
      } catch (error) {
        console.error(error);
      }
    }
    carregarEnviado();
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Text style={styles.tittle} animation="fadeInLeft" delay={500}>
        Historico de valores enviados
      </Animatable.Text>

      <View style={styles.div}>
        <Text style={styles.txt}>De</Text>
        <TextInput
          placeholder="24/03/2023"
          value={data}
          onChangeText={setData}
          style={styles.inputData}
          keyboardType="numeric"
        ></TextInput>

        <Text style={styles.txt}>Até</Text>
        <TextInput
          placeholder="24/03/2023"
          value={data2}
          onChangeText={setData2}
          style={styles.inputData}
          keyboardType="numeric"
        ></TextInput>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 24 }}>
          Pesquisar
        </Text>
      </TouchableOpacity>

      <Text style={styles.tittle2}>Valor emprestado</Text>
      <Text style={styles.valor}>R${enviado}</Text>

      <Text style={styles.tittle2}>Valor emprestado c/juros</Text>
      <Text style={styles.valor}>R${enviado2}</Text>

      <View style={styles.teste}>
        <Text style={styles.tittle3}>Valor total emprestado</Text>
        <Text style={styles.valor}>R${enviadoTotal}</Text>

        <Text style={styles.tittle2}>Valor total emprestado c/juros</Text>
        <Text style={styles.valor}>R${enviadoTotal2}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
  },
  div: {
    flexDirection: "row",
    margin: 10,
  },
  inputData: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#38a69d",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 4,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  tittle2: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    alignSelf: "center",
  },
  tittle: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
    alignSelf: "center",
  },
  valor: {
    fontSize: 20,
    alignSelf: "center",
  },
  txt: {
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  tittle3: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    alignSelf: "center",
    marginTop: 90,
  },
  teste: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f2f2f2",
    padding: 10,
    textAlign: "center",
  },
});
