import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getNote, updateNote } from "../api";
import AppHeader from "./header";
import { Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';

function Note(props) {
    const noteDetails = props.route.params != undefined ? props.route.params.note : {};
    const [note, setNote] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [base64picture, setBase64picture] = useState("");
    const [image, setImage] = useState("");
    const onNoteChange = (text) => setNote(text);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.1,
            base64: true
        });
        if (!result.canceled) {
            setBase64picture(result.assets[0].base64);
            setImage(result.assets[0].uri);
        }
    };

    const editNoteSubmit = async () => {
        const d = await updateNote({ content: note, id: noteDetails.Id, base64picture });
        if (!d.pass) {
            setErrorMessage(d.Message);
        } else {
            props.navigation.goBack();
        }
    };

    useEffect(() => {
        const getData = async () => {
            const d = await getNote(noteDetails.Id);
            if (!d.pass) {
                setNote(d.Message);
            } else {
                setNote(d.Data.Content);
                setImage((d.Data.PicturePath.length > 0) ? window.API_URL + "/Content/Images/" + d.Data.PicturePath : "");
            }
        }
        getData();
    }, []);

    const cancel = () => {
        props.navigation.goBack();
    }

    return (
        <SafeAreaProvider>
            <AppHeader title="Note" nav={props.navigation} />
            <ScrollView>
                {errorMessage.length > 0 ? <Text style={styles.message}>{errorMessage}</Text> : <></>}
                {(note.length === 0) ? <Text style={styles.message}>Loading..</Text>
                    : <>
                        <TextInput
                            multiline={true}
                            onChangeText={onNoteChange}
                            value={note}
                            style={styles.noteContent} />
                        {image.length > 0 ?
                            <>
                                <Image source={{ uri: image }} style={{ height: 250, resizeMode: 'contain' }} />
                                <Button title="Change Picture" onPress={pickImage} style={styles.button} type="clear" />
                            </>
                            :
                            <Button title="Add Picture" onPress={pickImage} style={styles.button} type="clear" />
                        }
                    </>}
                <Button title="Edit" onPress={editNoteSubmit} disabled={(note.length == 0)} style={styles.button} />
                <Button title="Cancel" onPress={cancel} style={styles.button} type="clear" />
            </ScrollView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    message: {
        fontSize: 20,
        padding: 15,
        margin: 10,
        backgroundColor: "#f0f0f0"
    },
    newNote: {
        display: "flex",
        padding: 20,
        backgroundColor: "#f0f0f0"
    },
    newNoteTitle: {
        fontSize: 20,
        marginBottom: 15
    },
    noteContent: {
        backgroundColor: '#ffffff',
        borderColor: '#e1e1e1',
        borderWidth: 1,
        margin: 10,
        height: 300,
        textAlignVertical: 'top',
        padding: 5
    },
    button: {
        margin: 10
    }
});

export default Note;
