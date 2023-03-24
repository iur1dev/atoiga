import React, { useEffect, useState, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from "react-native-table-component";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import Modal from "react-native-modal";
import { FontAwesome } from "@expo/vector-icons";
import numeral from "numeral";

export default function ExampleOne2({ route }) {
  const navigation = useNavigation();
  const id = route.params;
  const [nome, setNome] = useState("");

  // select id e nome
  useEffect(() => {
    async function carregarCliente() {
      try {
        const response = await fetch("http://10.0.2.2:3000/api/atoiga/" + id);
        const data = await response.json();

        setNome(data.result[0].nome);
      } catch (error) {
        console.error(error);
      }
    }
    carregarCliente();
  }, []);

  // select valor devido
  const [valorDevido2, setValorDevido2] = useState(null);
  useEffect(() => {
    async function carregarValor() {
      try {
        const response = await fetch(
          "http://10.0.2.2:3000/api/valorTotal/" + id
        );
        const data = await response.json();
        // const valorFormatado = numeral(
        //   data.result[0].valor + (data.result[0].valor * 30) / 100
        // ).format("0,0.00");

        setValorDevido2(data.result[0].valor);
      } catch (error) {
        console.error(error);
      }
    }
    carregarValor();
  }, []);

  // insert na api
  const [dinheiro, setDinheiro] = useState(null);
  const pagarValor = () => {
    if (dinheiro === null) {
      Alert.alert("Preencha o valor");
    } else {
      const dinheiro2 = parseFloat(
        dinheiro.replace(/[^0-9,-]+/g, "").replace(",", ".")
      );

      const requestOptions = {
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: `id_valores=` + id + `&valor_pago=` + dinheiro2,
      };
      fetch("http://10.0.2.2:3000/api/hist_pag_insert", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));

      const requestOptions2 = {
        method: "PUT",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: `valor=` + dinheiro2,
      };
      fetch("http://10.0.2.2:3000/api/atualizarValor2/" + id, requestOptions2)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));

      navigation.navigate("Clientes");
      Alert.alert("Valor abatido");
    }
  };

  // select historico de pagamento API
  const [tableHead, setTableHead] = useState(["Valor", "Data"]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function carregarClientes() {
      try {
        const response = await fetch("http://10.0.2.2:3000/api/hist_pag/" + id);
        const data = await response.json();
        const data2 = data.result.map((item) => {
          setTableData((arr) => [...arr, [item.valor_pago, item.dt_criacao]]);
        });
      } catch (error) {
        console.error(error);
      }
    }
    carregarClientes();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.divModal}>
        <Text style={styles.txtT}>ID: {id}</Text>
        <Text style={styles.txtT}>Nome: {nome}</Text>
      </View>

      <View style={styles.divModal}>
        <Text style={styles.txtT}>Valor devido</Text>
        <Text style={styles.txtT}>R${valorDevido2}</Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.containerForm}>
        <TextInputMask
          type={"money"}
          style={styles.input}
          placeholder="Digite o valor"
          value={dinheiro}
          onChangeText={(text) => setDinheiro(text)}
        ></TextInputMask>

        <TouchableOpacity style={styles.btn2} onPress={pagarValor}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            Pagar
          </Text>
        </TouchableOpacity>

        <Animatable.Text
          style={styles.tittle2}
          animation="fadeInLeft"
          delay={500}
        >
          Histórico de Pagamentos
        </Animatable.Text>

        <ScrollView>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#38a69d" }}>
            <Row
              data={tableHead}
              style={styles.head}
              textStyle={styles.titulo}
            />
            {tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={
                      cellIndex === 2 ? (
                        <TouchableOpacity
                          onPress={() => handleCallPress(cellData)}
                        >
                          <Text style={styles.text}>
                            <Ionicons
                              name="call-outline"
                              size={24}
                              color="black"
                            />
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        cellData
                      )
                    }
                    textStyle={styles.text}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
        </ScrollView>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38a69d",
  },
  divModal: {
    backgroundColor: "#fff",
    width: 200,
    borderRadius: 4,
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
  txtT: {
    fontSize: 20,
    fontWeight: "bold",
  },
  btn: {
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 4,
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderColor: "#fff",
    marginBottom: 30,
  },
  btn2: {
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 4,
    margin: 10,
    padding: 10,
    backgroundColor: "#38a69d",
    borderColor: "#38a69d",
    marginBottom: 30,
  },
  divBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  containerForm: {
    flex: 3,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    marginTop: 28,
    textAlign: "center",
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  row: { flexDirection: "row", backgroundColor: "#f1f8ff" },
  text: { margin: 6, alignSelf: "center" },
  titulo: {
    fontWeight: "bold",
    margin: 6,
    alignSelf: "center",
  },
  tittle2: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
    alignSelf: "center",
  },
});
