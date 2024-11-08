import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaInicial from './components/pantallaInicial/pantallaInicial';
import ConfiguracionNumero from './components/configuracionNumero/configuracionNumero';
import Contactos from './components/contactos/contactos';
import HoraTemperatura from './components/horaTemperatura/horaTemperatura';
import LlamadoEmergencia from'./components/llamadoEmergencia/llamadoEmergencia';
import QrPantalla from './components/qr/qr';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="pantallaInicial">
        <Stack.Screen name="PantallaInicial" component={PantallaInicial} options={{ title: 'Menú Principal' }} />
        <Stack.Screen name="ConfiguracionNumero" component={ConfiguracionNumero} options={{ title: 'Configuración de numero Emergencia' }} />
        <Stack.Screen name="Contactos" component={Contactos} options={{ title: 'Contactos' }} />
        <Stack.Screen name="HoraTemperatura" component={HoraTemperatura} options={{ title: 'Hora y Temperatura' }} />
        <Stack.Screen name="LlamadoEmergencia" component={LlamadoEmergencia} options={{ title: 'Llamado de emergencia' }} />
        <Stack.Screen name="QrPantalla"  component={QrPantalla} options={{ title: 'Escanear Código QR' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
