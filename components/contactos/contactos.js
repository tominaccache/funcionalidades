import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const contactos = [
  { id: '1', nombre: 'Juan Pérez', telefono: '123-456-789' },
  { id: '2', nombre: 'Ana Gómez', telefono: '987-654-321' },
];

const Contactos = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={contactos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contacto}>
            <Text>{item.nombre}</Text>
            <Text>{item.telefono}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contacto: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Contactos;
