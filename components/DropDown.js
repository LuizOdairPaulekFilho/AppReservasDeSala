import Octicons from "@react-native-vector-icons/octicons";
import { Pressable, Text, View } from "react-native";
import { useState } from "react";

export function Dropdown({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [valor, setValor] = useState("SELECIONE");

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <View style={{ width: 100 }}>
      <Pressable
        onPress={toggleDropdown}
        style={{
          backgroundColor: "#ffffff",
          padding: 8,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>{valor}</Text>
          <Octicons name="chevron-down" size={20} />
        </View>
      </Pressable>
      {isOpen && (
        <View
          style={{
            backgroundColor: "#ffffff",
            borderWidth: 1,
            borderColor: "#ccc",
            marginTop: 4,
            borderRadius: 4,
            elevation: 2,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            position: "absolute",
            zIndex: 1,
          }}
        >
          {options.map((element, index) => (
            <Pressable
              key={index}
              style={{ padding: 8 }}
              onPress={() => {
                setValor(options[index]);
                setIsOpen(false);
              }}
            >
              <Text style={{ color: "#000" }}>
                Ardar: {element} | N: {element}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
