import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const PantallaInicial = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido</Text>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('ConfiguracionNumero')}
      >
        <Text style={styles.botonTexto}>Configuración de Número de Emergencia</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('Contactos')}
      >
        <Text style={styles.botonTexto}>Contactos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('HoraTemperatura')}
      >
        <Text style={styles.botonTexto}>Hora y Temperatura</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('LlamadoEmergencia')}
      >
        <Text style={styles.botonTexto}>Llamado de Emergencia</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('QrPantalla')}
      >
        <Text style={styles.botonTexto}>Acerca de nosotros</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#263238', 
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#FFFFFF', 
  },
  boton: {
    backgroundColor: '#37474F', 
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
  },
  botonTexto: {
    fontSize: 18,
    color: '#FFFFFF', 
    textAlign: 'center',
  },
});

export default PantallaInicial;
