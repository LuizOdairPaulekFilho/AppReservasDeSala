import {Text, View } from "react-native";
import Header from "../components/Header";
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from "../components/Caroseul";
import FloatingActionButton from "../components/FloatingActionButton";
const Reservas = () => {
  return (
    <SafeAreaView style={{width:"100%", height:"100%"}}>
      <View>
        <Header title={"Minhas Reservas"}></Header>
      </View>
      <Carousel vector={[1,2,3,5,5,5,5,5,5]}></Carousel>
      <FloatingActionButton></FloatingActionButton>
    </SafeAreaView>
  );
};

export default Reservas;
