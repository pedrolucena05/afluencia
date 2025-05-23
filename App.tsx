import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RedefinirSenha from './assets/Components/Pages/RedefinirSenha/RedefinirSenha';
import GravarAudio from './assets/Components/Pages/GravarAudio/GravarAudio';
import Home from './assets/Components/Pages/Home/Home';
import Escola from './assets/Components/Pages/Escola/Escola';
import Alunos from './assets/Components/Pages/Alunos/Alunos';
import Turma from './assets/Components/Pages/Turma/Turma';
import Login from './assets/Components/Pages/Login/Login';
import AudioGravando from './assets/Components/Pages/GravarAudio/AudioGravando';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar
        backgroundColor="#355F3A"
        barStyle="light-content"
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={Home}
          />
          <Stack.Screen
            name="Escola"
            options={{ title: 'Selecione a escola' }}
            component={Escola}
          />
          <Stack.Screen
            name="Turma"
            options={{ title: 'Selecione a turma' }}
            component={Turma}
          />
          <Stack.Screen
            name="Alunos"
            options={{ title: 'Selecione o aluno' }}
            component={Alunos}
          />
          <Stack.Screen
            name="RedefinirSenha"
            options={{ title: 'Redefinir Senha' }}
            component={RedefinirSenha}
          />
          <Stack.Screen
            name="GravarAudio"
            options={{ title: 'Gravar Audio' }}
            component={GravarAudio}
          />
          <Stack.Screen
            name="AudioGravando"
            options={{ title: 'Gravar Audio' }}
            component={AudioGravando}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
