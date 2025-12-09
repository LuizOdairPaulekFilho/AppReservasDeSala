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
        unmountOnBlur: true,
        drawerItemStyle: { display: "none" },
      },
    },
    "Cadastrar reserva": {
      screen: CadastrarReserva,
      options: {
        headerShown: false,
        unmountOnBlur: true,
      },
    },
    MinhasReunioes: {
      screen: Reunioes,
      options: {
        headerShown: false,
        unmountOnBlur: true,
      },
    },
    ReservasGerais: {
      screen: ReservasGerais,
      options: {
        headerShown: false,
        unmountOnBlur: true,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);
export default function App() {
  return <Navigation />;
}
