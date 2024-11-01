import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const PantallaInicial = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Configuración de Número de Emergencia" onPress={() => navigation.navigate('ConfiguracionNumero')} />
      <Button title="Contactos" onPress={() => navigation.navigate('Contactos')} />
      <Button title="Hora y Temperatura" onPress={() => navigation.navigate('HoraTemperatura')} />
      <Button title="Llamado de Emergencia" onPress={() => navigation.navigate('LlamadoEmergencia')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default PantallaInicial;
