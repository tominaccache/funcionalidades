import React from 'react';
import { View, Text, Button, Alert } from 'react-native';

const LlamadoEmergencia = () => {
  const enviarMensajeEmergencia = () => {
    Alert.alert('Mensaje de Emergencia', 'Mensaje de emergencia enviado.');
  };

  return (
    <View>
      <Text>Presiona el botón para enviar un mensaje de emergencia</Text>
      <Button title="Enviar Emergencia" onPress={enviarMensajeEmergencia} />
    </View>
  );
};

export default LlamadoEmergencia;
