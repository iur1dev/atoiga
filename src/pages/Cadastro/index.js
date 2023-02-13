import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import * as Animatable from "react-native-animatable";

import { useNavigation } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function SignIn() {
  const navigation = useNavigation();

  const schema = yup.object({
    // pessoais
    nome: yup.string().required("Digite o nome"),
    email: yup.string().email("Email Invalido"),
    celular: yup
      .string()
      .required("Digite o celular")
      .min(11, "falta digito no numero"),
    telefone: yup.string().min(10, "falta digito no numero"),
    cpf: yup.string().required("Digite o cpf").min(11, "falta digite no cpf"),
    rg: yup.string().min(7, "falta digito no numero"),

    // endereco
    cep: yup.string().required("Digite o cep").min(8, "falta digito no numero"),
    numero: yup.string().required("Digite o numero"),
    rua: yup.string().required("Digite a rua"),
    bairro: yup.string().required("Digite o bairro"),
    cidade: yup.string().required("Digite o cidade"),

    // endereco empresa
    empresa: yup.string().required("Digite a empresa"),
    cep2: yup
      .string()
      .required("Digite o cep")
      .min(8, "falta digito no numero"),
    numero2: yup.string().required("Digite o numero"),
    rua2: yup.string().required("Digite a rua"),
    bairro2: yup.string().required("Digite o bairro"),
    cidade2: yup.string().required("Digite o cidade"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleSignIn(data) {
    console.log(data);
  }

  // viacep

  function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById("rua").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
  }

  function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
      //Atualiza os campos com os valores.
      document.getElementById("rua").value = conteudo.logradouro;
      document.getElementById("bairro").value = conteudo.bairro;
      document.getElementById("cidade").value = conteudo.localidade;
    } //end if.
    else {
      //CEP não Encontrado.
      limpa_formulário_cep();
      alert("CEP não encontrado.");
    }
  }

  function pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, "");

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById("rua").value = "...";
        document.getElementById("bairro").value = "...";
        document.getElementById("cidade").value = "...";

        //Cria um elemento javascript.
        var script = document.createElement("script");

        //Sincroniza com o callback.
        script.src =
          "https://viacep.com.br/ws/" + cep + "/json/?callback=meu_callback";

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);
      } //end if.
      else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
      }
    } //end if.
    else {
      //cep sem valor, limpa formulário.
      limpa_formulário_cep();
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

          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderBottomWidth: errors.nome && 1,
                    borderColor: errors.nome && "#ff375b",
                  },
                ]}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Nome"
              />
            )}
          ></Controller>
          {errors.nome && (
            <Text style={styles.labelError}>{errors.nome?.message}</Text>
          )}

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Email"
              />
            )}
          ></Controller>
          {errors.email && (
            <Text style={styles.labelError}>{errors.email?.message}</Text>
          )}
          <Controller
            control={control}
            name="celular"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Celular"
              />
            )}
          ></Controller>
          {errors.celular && (
            <Text style={styles.labelError}>{errors.celular?.message}</Text>
          )}

          <Controller
            control={control}
            name="telefone"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Telefone"
              />
            )}
          ></Controller>
          {errors.telefone && (
            <Text style={styles.labelError}>{errors.telefone?.message}</Text>
          )}

          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="CPF"
              />
            )}
          ></Controller>
          {errors.cpf && (
            <Text style={styles.labelError}>{errors.cpf?.message}</Text>
          )}

          <Controller
            control={control}
            name="rg"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="RG"
              />
            )}
          ></Controller>
          {errors.rg && (
            <Text style={styles.labelError}>{errors.rg?.message}</Text>
          )}

          {/* endereço */}
          <Text style={styles.tittle2}>Endereço</Text>

          <Controller
            control={control}
            name="cep"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="CEP"
              />
            )}
          ></Controller>
          {errors.cep && (
            <Text style={styles.labelError}>{errors.cep?.message}</Text>
          )}

          <Controller
            control={control}
            name="numero"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Número"
              />
            )}
          ></Controller>
          {errors.numero && (
            <Text style={styles.labelError}>{errors.numero?.message}</Text>
          )}

          <Controller
            control={control}
            name="rua"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Rua"
              />
            )}
          ></Controller>
          {errors.rua && (
            <Text style={styles.labelError}>{errors.rua?.message}</Text>
          )}

          <Controller
            control={control}
            name="bairro"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Bairro"
              />
            )}
          ></Controller>
          {errors.bairro && (
            <Text style={styles.labelError}>{errors.bairro?.message}</Text>
          )}

          <Controller
            control={control}
            name="cidade"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Cidade"
              />
            )}
          ></Controller>
          {errors.cidade && (
            <Text style={styles.labelError}>{errors.cidade?.message}</Text>
          )}

          {/* endereço empresa */}
          <Text style={styles.tittle2}>Endereço empresa</Text>

          <Controller
            control={control}
            name="empresa"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Empresa"
              />
            )}
          ></Controller>
          {errors.empresa && (
            <Text style={styles.labelError}>{errors.empresa?.message}</Text>
          )}

          <Controller
            control={control}
            name="cep2"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="CEP"
              />
            )}
          ></Controller>
          {errors.cep2 && (
            <Text style={styles.labelError}>{errors.cep2?.message}</Text>
          )}

          <Controller
            control={control}
            name="numero2"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Número"
              />
            )}
          ></Controller>
          {errors.numero2 && (
            <Text style={styles.labelError}>{errors.numero2?.message}</Text>
          )}

          <Controller
            control={control}
            name="rua2"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Rua"
              />
            )}
          ></Controller>
          {errors.rua2 && (
            <Text style={styles.labelError}>{errors.rua2?.message}</Text>
          )}

          <Controller
            control={control}
            name="bairro2"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Bairro"
              />
            )}
          ></Controller>
          {errors.bairro2 && (
            <Text style={styles.labelError}>{errors.bairro2?.message}</Text>
          )}

          <Controller
            control={control}
            name="cidade2"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Cidade"
              />
            )}
          ></Controller>
          {errors.cidade2 && (
            <Text style={styles.labelError}>{errors.cidade2?.message}</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleSignIn)}
          >
            <Text style={styles.buttonTxt}>Cadastrar</Text>
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
});
