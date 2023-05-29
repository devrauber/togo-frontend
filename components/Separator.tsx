import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SeparatorProps {
    hasOr?: boolean;
}

const Separator: React.FC<SeparatorProps> = ({ hasOr }) => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            {hasOr ?
                <>
                    <Text style={styles.text}>Ou</Text>
                    <View style={styles.line} />
                </>
                : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
        marginTop: 20,
        justifyContent: 'center',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgb(160, 159, 159)',
        marginHorizontal: 5,
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
        color: 'rgb(160, 159, 159)'
    },
});

export default Separator;