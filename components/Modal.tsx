import {StyleSheet, View, Modal, TouchableWithoutFeedback} from 'react-native';
import {ReactNode} from "react";

type ModalType = {
    children: ReactNode,
    visible: boolean,
    transparent: boolean,
    dismiss: () => void,
    margin: number
}

export default function Popup({ children, visible, transparent, dismiss, margin }: ModalType) {
    return (
        <Modal
            visible={visible}
            transparent={transparent}
            onRequestClose={dismiss}
        >
            <TouchableWithoutFeedback onPress={dismiss}>
                <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>

            <View
                style={{
                    ...styles.modalContent,
                    margin: margin
                }}
            >
                {children}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        justifyContent: "center",
        marginTop: '65%'
    },
    modalOverlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
});
