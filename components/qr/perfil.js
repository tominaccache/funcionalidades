import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Perfil() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Tomás Naccache</Text>
      <Text style={styles.info}>Aquí encontrarás más información sobre el integrante.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#263238',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  info: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
