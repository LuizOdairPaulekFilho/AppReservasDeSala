import Octicons from "@react-native-vector-icons/octicons";
import { Pressable, Text, View } from "react-native";
import { useState } from "react";

export function Dropdown({ options, onSelect, selectedValue }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  const handleSelect = (sala) => {
    onSelect(sala);
    setIsOpen(false);
  };

  return (
    <View style={{ width: "80%" }}>
      <Pressable
        onPress={toggleDropdown}
        style={{
          backgroundColor: "#ffffff",
          padding: 15,
          borderWidth: 1,
          borderColor: "#000000",
          borderRadius: 10,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#000" }}>
            {selectedValue 
              ? `Andar: ${selectedValue.andar} | N: ${selectedValue.n_sala}`
              : "SELECIONE UMA SALA"
            }
          </Text>
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
            borderRadius: 10,
            elevation: 2,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            position: "absolute",
            top: 50,
            width: "100%",
            zIndex: 1000,
            maxHeight: 200,
          }}
        >
          {options.map((sala, index) => (
            <Pressable
              key={sala.id}
              style={{ 
                padding: 12, 
                borderBottomWidth: index < options.length - 1 ? 1 : 0,
                borderBottomColor: "#f0f0f0"
              }}
              onPress={() => handleSelect(sala)}
            >
              <Text style={{ color: "#000" }}>
                Andar: {sala.andar} | N: {sala.n_sala}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}