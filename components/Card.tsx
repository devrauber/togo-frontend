import React from "react";
import { StyleSheet, View } from "react-native";

interface IProps {
    children: React.ReactNode;
}

const Card: React.FC<IProps> = ({ children }) => {
    return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFF",
        margin: 20,
        padding: 20,
        borderRadius: 15,
        elevation: 5,
    },
});

export default Card;
