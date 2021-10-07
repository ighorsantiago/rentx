import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import { useTheme } from 'styled-components';
import { api } from '../../../services/api';

import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle
} from './styles';

interface Params {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    }
}

export function SignUpSecondStep() {

    const navigation = useNavigation();
    const theme = useTheme();
    const route = useRoute();

    const { user } = route.params as Params;

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    function handleGoBack() {
        navigation.goBack();
    }

    async function handleRegister() {

        if (!password || !passwordConfirm) {
            return Alert.alert('Ops...', 'Informe a senha e depois confirme...');
        }

        if (password !== passwordConfirm) {
            return Alert.alert('Ops...', 'As senhas não batem...');
        }

        await api.post('/users', {
            name: user.name,
            email: user.email,
            driver_license: user.driverLicense,
            password,
        }).then(() => {
            navigation.navigate('Confirmation', {
                title: 'Conta criada!',
                message: `Agora é só fazer login\neaproveitar`,
                nextScreenRoute: 'SignIn',
            });
        }).catch(() => {
            Alert.alert('Opa', 'Não foi possível cadastrar.');
        });
    }

    return (

        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleGoBack} />
                        <Steps>
                            <Bullet />
                            <Bullet active />
                        </Steps>
                    </Header>

                    <Title>
                        Crie sua{'\n'}conta
                    </Title>
                    <Subtitle>
                        Faça seu cadastro de{'\n'}
                        forma rápida e fácil
                    </Subtitle>

                    <Form>
                        <FormTitle>2. Senha</FormTitle>

                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                            onChangeText={setPassword}
                            value={password}
                        />

                        <PasswordInput
                            iconName="lock"
                            placeholder="Repetir senha"
                            onChangeText={setPasswordConfirm}
                            value={passwordConfirm}
                        />
                    </Form>

                    <Button
                        title="Cadastrar"
                        color={theme.colors.success}
                        onPress={handleRegister}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
