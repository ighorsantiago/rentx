import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    width: ${RFValue(105)}px;
    height: ${RFValue(92)}px;

    justify-content: center;
    align-items: center;

    background-color: ${({theme}) => theme.colors.background_primary};

    padding: 16px;
    margin-bottom: 8px;
`;

export const Name = styled.Text`
    font-family: ${({theme}) => theme.fonts.secondary_500};
    color: ${({theme}) => theme.colors.text};
    font-size: ${RFValue(13)}px;
`;
