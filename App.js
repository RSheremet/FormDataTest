/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import DocumentPicker from 'react-native-document-picker'
import * as axios from "axios";

let instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': 'b891edb4-172f-4673-a388-0183624ea4a0',
  },
});

let authorization = (email, password, rememberMe) => {
  return instance
      .post(
          `auth/login?email=${email}&password=${password}&rememberMe=${rememberMe}`,
          {},
      )
      .then(response => {
        return response.data;
      });
}


let sendPhoto = ( photoToSend ) => {
  debugger
  return (
      instance.put('/profile/photo', photoToSend, { // существует несколько форматов отправки файлов
        headers: {                              // для отправки картинки или иного не txt файла используется формат 'multipart/form-data'
          'Content-Type': 'multipart/form-data' // для того что бы отправить в этом формате необходимо создать объект FormData при помощи
        }                                       // следующего кода formData = new FormData(название, файл) - внутри скобочек указываем 1. Название файла который мы отправляем 2. Вкладываем сам файл
      })
          .then(response => {
            debugger
            return response.data
          })
  )
}

const App = (props) => {

  let pickDocument = async () => {
// Выбор файла
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setFile(res)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  // стейт с логином имейлом и файлом
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [userId, setUserId] = useState()
  const [file, setFile] = useState()

    // функция логинизации
  const login = (email, password) => {

    authorization(email, password, true).then(response => {
      setUserId(response.data.userId)
    })

  }

  // функция отправки картинки
  const sendPicture = (file) => {
    /*let photoToSend = new FormData();
    photoToSend.append('image', file);*/
    sendPhoto(file).then(data => {
      debugger
    })
  }

  return (
      <View>
        <TouchableHighlight
            style={{width:100, height: 50, backgroundColor: 'red'}}
            onPress={()=>{pickDocument()}}
        >
          <View/>
        </TouchableHighlight>
        <TouchableHighlight
            style={{width:100, height: 50, backgroundColor: 'yellow'}}
            onPress={()=>{sendPicture(file)}}
        >
          <View/>
        </TouchableHighlight>
        <Text>
          Авторизация
        </Text>
        <View>
          <TextInput
              style={{width: 200, height: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1}}
              onChangeText={text => setEmail(text)}
              placeholder={'Login'}
          />
          <TextInput
              style={{width: 200, height: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1}}
              onChangeText={text => setPassword(text)}
              placeholder={'Password'}
          />
          <TouchableHighlight
              onPress={() => {login(email, password)}}
              style={{width: 200, height: 30, backgroundColor: 'blue'}}
          >
            <Text>
              Залогиниться
            </Text>
          </TouchableHighlight>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({});

export default App;
