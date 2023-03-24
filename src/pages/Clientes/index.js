import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  ScrollView,
  TextInput,
  Button,
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
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ExampleOne() {
  const navigation = useNavigation();
  const handleCallPress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleid = (id) => {
    const params = id;
    navigation.navigate("Clientes_opcoes", params);
  };

  const [tableHead, setTableHead] = useState([
    "ID",
    "Nome",
    "Celular",
    "Opções",
  ]);
  const [tableData, setTableData] = useState([]);

  const [blackList, setBlackList] = useState([]);
  useEffect(() => {
    async function carregarClientes() {
      try {
        // black list
        const response2 = await fetch(
          "http://10.0.2.2:3000/api/black_list_select"
        );
        const data3 = await response2.json();

        // select
        const response = await fetch("http://10.0.2.2:3000/api/atoiga");
        const data = await response.json();
        const data2 = data.result.map((item) => {
          return [
            item.id,
            item.nome,
            item.cel,
            <TouchableOpacity onPress={() => handleid(item.id)}>
              <Text style={styles.text}>
                <Ionicons name="settings-outline" size={24} color="black" />
              </Text>
            </TouchableOpacity>,
          ];
        });

        setTableData(data2);

        setBlackList(data3);
      } catch (error) {
        console.error(error);
      }
    }
    carregarClientes();
  }, []);

  // search
  const [search, setSearch] = useState(null);
  const [tableData2, setTableData2] = useState([]);
  async function chamarSearch() {
    try {
      const response = await fetch("http://10.0.2.2:3000/api/atoiga/" + search);
      const data = await response.json();
      const data2 = data.result.map((item) => {
        return [
          item.id_cli,
          item.nome,
          item.cel,
          <TouchableOpacity onPress={() => handleid(item.id_cli)}>
            <Text style={styles.text}>
              <Ionicons name="settings-outline" size={24} color="black" />
            </Text>
          </TouchableOpacity>,
        ];
      });
      setTableData2(data2);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.Text
        style={styles.tittle2}
        animation="fadeInLeft"
        delay={500}
      >
        Clientes
      </Animatable.Text>

      <TextInput
        style={styles.input}
        placeholder="Pesquisar por nome ou id"
        onChangeText={setSearch}
        value={search}
      ></TextInput>

      <TouchableOpacity style={styles.button} onPress={chamarSearch}>
        <AntDesign name="search1" size={24} color="white" />
      </TouchableOpacity>

      {/* caso tenha search */}
      {search ? (
        <ScrollView>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#38a69d" }}>
            <Row
              data={tableHead}
              style={styles.head}
              textStyle={styles.titulo}
            />
            {tableData2.map((rowData, index) => (
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
      ) : (
        // caso n tenha search
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
      )}
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
});
