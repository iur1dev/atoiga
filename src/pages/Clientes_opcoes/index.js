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
  const [dinheiro, setDinheiro] = useState(null);

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

  // insert na api
  const emprestarMoney = () => {
    if (dinheiro === null) {
      Alert.alert("Preencha o valor");
    } else {
      const dinheiro2 = parseFloat(
        dinheiro.replace(/[^0-9,-]+/g, "").replace(",", ".")
      );

      const requestOptions = {
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body:
          `id_cli=` +
          id +
          `&valor_pego=` +
          dinheiro2 +
          `&valor_devido=` +
          dinheiro2,
      };
      fetch("http://10.0.2.2:3000/api/valores_insert", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));

      //

      const requestOptions2 = {
        method: "PUT",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: `valor=` + dinheiro2,
      };
      fetch("http://10.0.2.2:3000/api/atualizarValor/" + id, requestOptions2)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));

      navigation.navigate("Clientes");
      Alert.alert("Valor emprestado");
    }
  };

  // modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [final2, setFinal2] = useState("");
  const toggleModal = () => {
    setModalVisible(!isModalVisible);

    const dinheiro2 = parseFloat(
      dinheiro.replace(/[^0-9,-]+/g, "").replace(",", ".")
    );
    const final = (dinheiro2 * 30) / 100;
    const finalComDuasCasasDecimais = (dinheiro2 + final).toFixed(2);
    const finalComVirgula = finalComDuasCasasDecimais.replace(".", ",");
    setFinal2(finalComVirgula);
  };

  // modal2
  const [isModalVisible2, setModalVisible2] = useState(false);
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  // modal3
  const [isModalVisible3, setModalVisible3] = useState(false);
  const toggleModal3 = () => {
    setModalVisible3(!isModalVisible3);
  };

  // select historico de pagamento API
  const [tableHead, setTableHead] = useState(["Valor", "Data"]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function carregarClientes() {
      try {
        const response = await fetch("http://10.0.2.2:3000/api/valores/" + id);
        const data = await response.json();
        const data2 = data.result
          .filter((item) => item.valorPego >= "0")
          .map((item) => {
            return ["R$" + item.valorPego, item.dtCriacao];
          });
        setTableData(data2);
      } catch (error) {
        console.error(error);
      }
    }
    carregarClientes();
  }, []);

  // delete na api
  async function deletarCadastro() {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
      };
      const response = await fetch(
        "http://10.0.2.2:3000/api/atoiga_delete/" + id,
        requestOptions
      );

      navigation.navigate("Clientes");
      Alert.alert("Cadastro deletado");
    } catch (error) {
      console.error(error);
      Alert.alert("Tem valores vinculados");
    }
  }

  // colocar na blacklist
  async function blacklist() {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: `id_cli=` + id + `&nome=` + nome,
      };

      fetch("http://10.0.2.2:3000/api/black_list_insert", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
      navigation.navigate("Clientes");
      Alert.alert("Enviado para blacklist");
    } catch (error) {
      console.error(error);
    }
  }

  // passar o id
  const handleid = (id) => {
    const params = id;
    navigation.navigate("Pagamento_cliente", params);
  };

  const handleid2 = (id) => {
    const params = id;
    navigation.navigate("Alterar_cadastro", params);
  };

  return (
    <View style={styles.container}>
      <View style={styles.divModal}>
        <Text style={styles.txtT}>ID: {id}</Text>
        <Text style={styles.txtT}>Nome: {nome}</Text>
      </View>

      <View style={styles.divBtn}>
        <TouchableOpacity style={styles.btn} onPress={() => handleid2(id)}>
          <MaterialIcons name="content-paste" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={toggleModal2}>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={toggleModal3}>
          <Ionicons name="skull-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => handleid(id)}>
          <FontAwesome name="money" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.containerForm}>
        <TextInputMask
          type={"money"}
          style={styles.input}
          placeholder="Digite o valor"
          value={dinheiro}
          onChangeText={(text) => setDinheiro(text)}
        ></TextInputMask>

        <TouchableOpacity style={styles.btn2} onPress={toggleModal}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            Calcular
          </Text>
        </TouchableOpacity>

        <Animatable.Text
          style={styles.tittle2}
          animation="fadeInLeft"
          delay={500}
        >
          Histórico de empréstimos
        </Animatable.Text>

        <Modal isVisible={isModalVisible}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                alignItems: "center",
                borderWidth: 2,
                borderRadius: 4,
                margin: 10,
                padding: 10,
                backgroundColor: "#fff",
                borderColor: "#fff",
                marginBottom: 30,
                fontSize: 30,
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              Valor c/juros
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                alignSelf: "center",
                marginBottom: 30,
              }}
            >
              R$ {final2}
            </Text>

            <TouchableOpacity style={styles.btn2} onPress={emprestarMoney}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
              >
                Confirmar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn2} onPress={toggleModal}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
              >
                Voltar
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}></View>
        </Modal>

        {/* modal 2 */}
        <Modal isVisible={isModalVisible2}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                alignItems: "center",
                borderWidth: 2,
                borderRadius: 4,
                margin: 10,
                padding: 10,
                backgroundColor: "#fff",
                borderColor: "#fff",
                marginBottom: 30,
                fontSize: 30,
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              Quer mesmo deletar ?
            </Text>

            <TouchableOpacity style={styles.btn2} onPress={deletarCadastro}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
              >
                Deletar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn2} onPress={toggleModal2}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
              >
                Voltar
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}></View>
        </Modal>

        {/* modal 3 */}
        <Modal isVisible={isModalVisible3}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                alignItems: "center",
                borderWidth: 2,
                borderRadius: 4,
                margin: 10,
                padding: 10,
                backgroundColor: "#fff",
                borderColor: "#fff",
                marginBottom: 30,
                fontSize: 30,
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              Enviar para blacklist ?
            </Text>

            <TouchableOpacity style={styles.btn2} onPress={blacklist}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
              >
                Enviar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn2} onPress={toggleModal3}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
              >
                Voltar
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}></View>
        </Modal>

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
