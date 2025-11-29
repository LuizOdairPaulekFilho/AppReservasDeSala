import { createStaticNavigation } from "@react-navigation/native";
import Login from "./screens/Login";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ReservasGerais from "./screens/ReservasGerais";
import Reunioes from "./screens/Reunioes";
import CadastrarReserva from "./screens/CadastrarReserva";

const RootStack = createDrawerNavigator({
  screens: {
    Login: {
      screen: Login,
      options: {
        headerShown: false,
        drawerItemStyle: { display: "none" },
      },
    },
    "Cadastrar reserva": {
      screen: CadastrarReserva,
      options: {
        headerShown: false,
      },
    },
    MinhasReunioes: {
      screen: Reunioes,
      options: {
        headerShown: false,
      },
    },
    ReservasGerais: {
      screen: ReservasGerais,
      options: {
        headerShown: false,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);
export default function App() {
  return <Navigation />;
}
