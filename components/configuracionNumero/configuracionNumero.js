import React, { useState } from 'react';
import { View, TextInput, Button, AsyncStorage, Text } from 'react-native';

const ConfiguracionNumero = () => {
  const [numero, setNumero] = useState('');
  const [guardado, setGuardado] = useState('');

  const guardarNumero = async () => {
    try {
      await AsyncStorage.setItem('numeroEmergencia', numero);
      setGuardado('Número guardado');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Introduce el número de emergencia:</Text>
      <TextInput keyboardType="phone-pad" value={numero} onChangeText={setNumero} />
      <Button title="Guardar" onPress={guardarNumero} />
      {guardado ? <Text>{guardado}</Text> : null}
    </View>
  );
};

export default ConfiguracionNumero;
