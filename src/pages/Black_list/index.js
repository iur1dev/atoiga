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

export default function SignIn() {
  const [tableHead, setTableHead] = useState(["ID", "Nome", "Data"]);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    async function carregarClientes() {
      try {
        // select
        const response = await fetch(
          "http://10.0.2.2:3000/api/black_list_select"
        );
        const data = await response.json();
        const data2 = data.result.map((item) => {
          return [item.id_cli, item.nome, item.dt_criacao];
        });

        setTableData(data2);
      } catch (error) {
        console.error(error);
      }
    }
    carregarClientes();
  }, []);
  return (
    <View style={styles.container}>
      <Animatable.Text style={styles.tittle} animation="fadeInLeft" delay={500}>
        Black list
      </Animatable.Text>

      <ScrollView>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#38a69d" }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.titulo} />
          {tableData.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={
                    cellIndex === 2 ? (
                      <Text style={{ textAlign: "center" }}>{cellData}</Text>
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

      <View style={styles.teste}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  row: { flexDirection: "row", backgroundColor: "#f1f8ff" },
  text: { margin: 6, alignSelf: "center" },
  phoneNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
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
  button: {
    backgroundColor: "#38a69d",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 4,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    textAlign: "center",
  },
  tittle: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
    alignSelf: "center",
  },
});
