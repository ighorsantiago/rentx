import React, { useState, useEffect } from 'react';
import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import theme from '../../styles/theme';
import { useAuth } from '../../hooks/auth';

import {
   Container,
   Header,
   Title,
   Subtitle,
   Form,
   Footer,
} from './styles';
import { database } from '../../database';

export function SignIn() {

   const navigation = useNavigation();
   const { signIn } = useAuth();

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   async function handleSignIn() {
      try {
         const schema = Yup.object().shape({
            email: Yup
               .string()
               .required('O e-mail é obrigatório')
               .email('Digite um e-mail válido'),
            password: Yup
               .string()
               .required('A senha é obrigatória')
         });
   
         await schema.validate({ email, password });

         signIn({ email, password });
      } catch (error) {
         if(error instanceof Yup.ValidationError) {
            Alert.alert('Opa', error.message);
         } else {
            Alert.alert(
               'Erro na autenticação',
               'Ocorreu um erro ao fazer login, verifique as credenciais'
            );
         }
      }
   }

   function handleNewAccount() {
      navigation.navigate('SignUpFirstStep')
   }

   useEffect(() => {
      async function loadData() {
         const userCollection = database.get('users');
         const users = await userCollection.query().fetch();
         console.log(users)
      }

      loadData()
   }, []);

   return (

      <KeyboardAvoidingView behavior="position" enabled>
         <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <Container>
               <StatusBar
                  barStyle="dark-content"
                  backgroundColor="transparent"
                  translucent
               />
               <Header>
                  <Title>
                     Estamos{'\n'}quase lá.
                  </Title>
                  <Subtitle>
                     Faça seu login para começar {'\n'}
                     uma experiência incrível.
                  </Subtitle>
               </Header>

               <Form>
                  <Input
                     iconName="mail"
                     placeholder="E-mail"
                     keyboardType="email-address"
                     autoCorrect={false}
                     autoCapitalize="none"
                     onChangeText={setEmail}
                     value={email}
                  />
                  <PasswordInput
                     iconName="lock"
                     placeholder="Senha"
                     autoCorrect={false}
                     autoCapitalize="none"
                     onChangeText={setPassword}
                     value={password}
                  />
               </Form>

               <Footer>
                  <Button
                     title="Login"
                     onPress={handleSignIn}
                     enabled={true}
                     loading={false}
                  />
                  <Button
                     title="Criar conta gratuita"
                     color={theme.colors.background_secondary}
                     light
                     onPress={handleNewAccount}
                     enabled={true}
                     loading={false}
                  />
               </Footer>
            </Container>
         </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
   );
}