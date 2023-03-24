import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
} from "react-native";

import * as Animatable from "react-native-animatable";

import { useNavigation } from "@react-navigation/native";

import { TextInputMask } from "react-native-masked-text";

export default function SignIn({ route }) {
  const id = route.params;

  const [nome, setNome] = useState(null);
  const [data_nasc, setData_nasc] = useState(null);
  const [rg, setRg] = useState(null);
  const [cpf, setCpf] = useState(null);
  const cpfRef = useRef(null);
  const [telefone, setTelefone] = useState(null);
  const [celular, setCelular] = useState(null);

  const [cep, setCep] = useState(null);
  const [cepEscolhido, setCepEscolhido] = useState(null);
  const [bairro, setBairro] = useState(null);
  const [logradouro, setLogradouro] = useState(null);
  const [localidade, setLocalidade] = useState(null);
  const [numero, setNumero] = useState(null);

  const [empresa, setEmpresa] = useState(null);
  const [cep2, setCep2] = useState(null);
  const [cepEscolhido2, setCepEscolhido2] = useState(null);
  const [bairro2, setBairro2] = useState(null);
  const [logradouro2, setLogradouro2] = useState(null);
  const [localidade2, setLocalidade2] = useState(null);
  const [numero2, setNumero2] = useState(null);
  const [dtCriacao, setDtCriacao] = useState(null);
  const [dtAlteracao, setDtAlteracao] = useState(null);

  useEffect(() => {
    async function exibirInfo() {
      try {
        const response = await fetch("http://10.0.2.2:3000/api/atoiga2/" + id);
        const data = await response.json();

        setNome(data.result[0].nome);
        setData_nasc(data.result[0].data_nasc);
        setRg(data.result[0].rg);
        setCpf(data.result[0].cpf);
        setTelefone(data.result[0].tel);
        setCelular(data.result[0].cel);
        setCep(data.result[0].cep_cli);
        setBairro(data.result[0].bairro_cli);
        setLogradouro(data.result[0].rua_cli);
        setLocalidade(data.result[0].cidade_cli);
        setNumero(data.result[0].num_cli);
        setEmpresa(data.result[0].empresa);
        setCep2(data.result[0].cep_empr);
        setBairro2(data.result[0].bairro_empr);
        setLogradouro2(data.result[0].rua_empr);
        setLocalidade2(data.result[0].cidade_empr);
        setNumero2(data.result[0].num_empr);
        setDtCriacao(data.result[0].dt_criacao);
        if (data.result[0].dt_att == null) {
          setDtAlteracao("Não teve alteração");
        } else {
          setDtAlteracao(data.result[0].dt_att);
        }
      } catch (error) {
        console.error(error);
      }
    }
    exibirInfo();
  }, []);

  const getCepData = () => {
    const endpoint = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(endpoint)
      .then((resposta) => resposta.json())
      .then((json) => {
        const cep2 = {
          bairro: json.bairro,
          logradouro: json.logradouro,
          localidade: json.localidade,
        };

        setCepEscolhido(cep2);
      })
      .catch(() => {
        Alert.alert("Erro", "Não foi possível carregar os dados do Cep");
      });
  };

  const getCepData2 = () => {
    const endpoint = `https://viacep.com.br/ws/${cep2}/json/`;

    fetch(endpoint)
      .then((resposta) => resposta.json())
      .then((json) => {
        const cep3 = {
          bairro: json.bairro,
          logradouro: json.logradouro,
          localidade: json.localidade,
        };

        setCepEscolhido2(cep3);
      })
      .catch(() => {
        Alert.alert("Erro", "Não foi possível carregar os dados do Cep");
      });
  };

  const navigation = useNavigation();

  const handleSignIn = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body:
        `nome=` +
        nome +
        `&data_nasc=` +
        data_nasc +
        `&rg=` +
        rg +
        `&cpf=` +
        cpf +
        `&tel=` +
        telefone +
        `&cel=` +
        celular +
        `&cep_cli=` +
        cep +
        `&num_cli=` +
        numero +
        `&rua_cli=` +
        logradouro +
        `&bairro_cli=` +
        bairro +
        `&cidade_cli=` +
        localidade +
        `&empresa=` +
        empresa +
        `&cep_empr=` +
        cep2 +
        `&num_empr=` +
        numero2 +
        `&rua_empr=` +
        logradouro +
        `&bairro_empr=` +
        bairro +
        `&cidade_empr=` +
        localidade +
        `&`,
    };

    fetch("http://10.0.2.2:3000/api/atoiga_update/" + id, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    navigation.navigate("Clientes");
    Alert.alert("Cadastro alterado");
  };

  function showCpf() {
    const cpfIsValid = cpfRef?.current.isValid();

    if (cpfIsValid === true) {
      alert("Verdadeiro");
    } else {
      alert("Falso");
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.Text style={styles.tittle} animation="fadeInLeft" delay={500}>
        Cadastro
      </Animatable.Text>

      <ScrollView>
        <Animatable.View animation="fadeInUpBig" style={styles.containerForm}>
          {/* pessoais */}
          <Text style={styles.tittle2}>Informações pessoais</Text>

          <TextInput
            style={styles.input}
            onChangeText={setNome}
            value={nome}
            placeholder="Nome"
          />

          <TextInput
            style={styles.input}
            onChangeText={setData_nasc}
            value={data_nasc}
            placeholder="Data de Nascimento"
          />

          <TextInput
            keyboardType="numeric"
            style={styles.input}
            onChangeText={setCelular}
            value={celular}
            placeholder="Celular"
          />

          <TextInput
            keyboardType="numeric"
            style={styles.input}
            onChangeText={setTelefone}
            value={telefone}
            placeholder="Telefone"
          />

          <TextInputMask
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(text) => setCpf(text)}
            value={cpf}
            placeholder="CPF"
            type={"cpf"}
            ref={cpfRef}
          />

          <TouchableOpacity style={styles.button} onPress={showCpf}>
            <Text style={styles.buttonTxt}>Validar CPF</Text>
          </TouchableOpacity>

          <TextInput
            keyboardType="numeric"
            style={styles.input}
            onChangeText={setRg}
            value={rg}
            placeholder="RG"
          />

          {/* endereço */}
          <Text style={styles.tittle2}>Endereço</Text>

          <TextInputMask
            keyboardType="numeric"
            style={styles.input}
            onBlur={getCepData}
            onChangeText={(text) => {
              setCep(text);
            }}
            value={cep}
            placeholder="CEP"
            type={"zip-code"}
          />

          <TextInput
            keyboardType="numeric"
            style={styles.input}
            onChangeText={setNumero}
            value={numero}
            placeholder="Número"
          />

          {cepEscolhido != null ? (
            <TextInput
              style={styles.input}
              onChangeText={setLogradouro}
              value={cepEscolhido.logradouro}
              placeholder="Rua"
            />
          ) : (
            <TextInput
              style={styles.input}
              onChangeText={setLogradouro}
              value={logradouro}
              placeholder="Rua"
            />
          )}

          {cepEscolhido != null ? (
            <TextInput
              style={styles.input}
              onChangeText={setBairro}
              value={cepEscolhido.bairro}
              placeholder="Bairro"
            />
          ) : (
            <TextInput
              style={styles.input}
              onChangeText={setBairro}
              value={bairro}
              placeholder="Bairro"
            />
          )}

          {cepEscolhido != null ? (
            <TextInput
              style={styles.input}
              onChangeText={setLocalidade}
              value={cepEscolhido.localidade}
              placeholder="Cidade"
            />
          ) : (
            <TextInput
              style={styles.input}
              onChangeText={setLocalidade}
              value={localidade}
              placeholder="Cidade"
            />
          )}

          {/* endereço empresa */}
          <Text style={styles.tittle2}>Endereço empresa</Text>

          <TextInput
            style={styles.input}
            onChangeText={setEmpresa}
            value={empresa}
            placeholder="Empresa"
          />

          <TextInputMask
            keyboardType="numeric"
            style={styles.input}
            onBlur={getCepData2}
            onChangeText={(text) => {
              setCep2(text);
            }}
            value={cep2}
            placeholder="CEP"
            type={"zip-code"}
          />

          <TextInput
            keyboardType="numeric"
            style={styles.input}
            onChangeText={setNumero2}
            value={numero2}
            placeholder="Número"
          />

          {cepEscolhido2 != null ? (
            <TextInput
              style={styles.input}
              onChangeText={setLogradouro2}
              value={cepEscolhido2.logradouro}
              placeholder="Rua"
            />
          ) : (
            <TextInput
              style={styles.input}
              onChangeText={setLogradouro2}
              value={logradouro2}
              placeholder="Rua"
            />
          )}

          {cepEscolhido2 != null ? (
            <TextInput
              style={styles.input}
              onChangeText={setBairro2}
              value={cepEscolhido2.bairro}
              placeholder="Bairro"
            />
          ) : (
            <TextInput
              style={styles.input}
              onChangeText={setBairro2}
              value={bairro2}
              placeholder="Bairro"
            />
          )}

          {cepEscolhido2 != null ? (
            <TextInput
              style={styles.input}
              onChangeText={setLocalidade2}
              value={cepEscolhido2.localidade}
              placeholder="Cidade"
            />
          ) : (
            <TextInput
              style={styles.input}
              onChangeText={setLocalidade2}
              value={localidade2}
              placeholder="Cidade"
            />
          )}

          <TextInput
            style={styles.input}
            onChangeText={setDtCriacao}
            value={"Data de criação:" + dtCriacao}
            placeholder="Data de criação"
            editable={false}
          />

          <TextInput
            style={styles.input}
            onChangeText={setDtAlteracao}
            value={"Data de alteração:" + dtAlteracao}
            placeholder="Data de alteração"
            editable={false}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonTxt}>Alterar</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38a69d",
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    marginTop: 28,
  },
  tittle: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: "5%",
    color: "#FFF",
  },
  containerForm: {
    flex: 3,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
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
  buttonTxt: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  labelError: {
    alignSelf: "flex-start",
    color: "#ff375b",
    marginBottom: 8,
  },
  tittle2: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
  },
  btnCpf: {},
});
