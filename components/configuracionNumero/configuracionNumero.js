import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfiguracionNumeroEmergencia = () => {
  const [numeroEmergencia, setNumeroEmergencia] = useState('');

 
  useEffect(() => {
    const cargarNumeroEmergencia = async () => {
      try {
        const numero = await AsyncStorage.getItem('numeroEmergencia');
        if (numero) {
          setNumeroEmergencia(numero);
        }
      } catch (error) {
        console.log("Error al cargar el número de emergencia:", error);
      }
    };

    cargarNumeroEmergencia();
  }, []);


    const validarNumero = (numero) => {
        const formatoValido = /^\d{2}\d{4}\d{4}$/;
        return formatoValido.test(numero);
      };

  const guardarNumeroEmergencia = async () => {
    if (validarNumero(numeroEmergencia)) {
      try {
        await AsyncStorage.setItem('numeroEmergencia', numeroEmergencia);
        Alert.alert('Éxito', 'Número de emergencia guardado correctamente');
      } catch (error) {
        console.log("Error al guardar el número de emergencia:", error);
        Alert.alert('Error', 'No se pudo guardar el número de emergencia');
      }
    } else {
      Alert.alert('Error', 'Por favor ingresa un número de emergencia válido en el formato 11-1234-5678');
    }
  };

  return (
    <View style={styles.container}>
     <Text style={styles.instruccion}>Ingrese numero de emergencia</Text>
     <Text style={styles.instruccion2}>Formato: 1112345678</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese número de emergencia"
        value={numeroEmergencia}
        onChangeText={setNumeroEmergencia}
        keyboardType="phone-pad"
      />
      <View style={styles.botonContainer}>
        <Button 
          title="Guardar Número" 
          onPress={guardarNumeroEmergencia} 
          color="#87CEEB" 
        />
      </View>
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
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10, 
    backgroundColor: '#FFFFFF', 
  },
  botonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  instruccion: {
    fontSize: 22,
    color: '#FFFFFF', 
    marginBottom: 10, 
    textAlign: 'center', 
  },
  instruccion2: {
    fontSize: 18,
    color: '#808080',
    marginBottom: 10, 
    textAlign: 'center', 
    marginBottom: '5%',
  },
});

export default ConfiguracionNumeroEmergencia;
