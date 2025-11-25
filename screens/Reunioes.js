import {Text, View } from "react-native";
import Header from "../components/Header";
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from "../components/Caroseul";
import FloatingActionButton from "../components/FloatingActionButton";
const Reunioes = () => {
  return (
    <SafeAreaView style={{width:"100%", height:"100%"}}>
      <View>
        <Header title={"Minhas Reunioes"}></Header>
      </View>
      <Carousel vector={[1,2,3]}></Carousel>
       <FloatingActionButton></FloatingActionButton>
    </SafeAreaView>
  );
};

export default Reunioes;
