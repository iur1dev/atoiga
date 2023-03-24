import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import Cadastro from "../pages/Cadastro";
import Relatorios from "../pages/Relatorios";
import Juros from "../pages/Juros";
import Juros2 from "../pages/Juros2";
import Clientes from "../pages/Clientes";
import Clientes_opcoes from "../pages/Clientes_opcoes";
import Pagamento_cliente from "../pages/Pagamento_cliente";
import Alterar_cadastro from "../pages/Alterar_cadastro";
import Relatorio_enviado from "../pages/Relatorio_enviado";
import Relatorio_recebido from "../pages/relatorio_recebido";
import Black_list from "../pages/Black_list";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Relatorios"
        component={Relatorios}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Juros"
        component={Juros}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Juros2"
        component={Juros2}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Clientes"
        component={Clientes}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Clientes_opcoes"
        component={Clientes_opcoes}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Pagamento_cliente"
        component={Pagamento_cliente}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Alterar_cadastro"
        component={Alterar_cadastro}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Relatorio_enviado"
        component={Relatorio_enviado}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Relatorio_recebido"
        component={Relatorio_recebido}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="Black_list"
        component={Black_list}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
