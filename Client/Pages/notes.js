import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getNotes, addNote, deleteNote } from "../api";
import AppHeader from "./header";
import { Button, Dialog, Card } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';

const NoteRow = ({ note, nav, setOpenDeleteModal, setDeleteId }) => {
    return (
        <TouchableOpacity onPress={() => nav.navigate('Note', { note })}
            onLongPress={() => { setOpenDeleteModal(true); setDeleteId(note.Id); }}>
            <Card containerStyle={{ marginTop: 15 }}>
                <Card.Title>Created at {note.CreatedDate}</Card.Title>
                <Card.Divider />
                <Text>
                    {note.Content}
                </Text>
                { note.PicturePath.length > 0 ? 
                    <Image source={{ uri: window.API_URL + "/Content/Images/" + note.PicturePath }} style={{ height: 100, resizeMode: 'contain' }} />
                : "" }
            </Card>
        </TouchableOpacity>
    )
}

function Notes(props) {
    const categoryDetails = props.route.params != undefined ? props.route.params.category : {};
    const [notes, setNotes] = useState("loading..");
    const [refreshing, setRefreshing] = useState(false);
    const [refreshCount, setRefreshCount] = useState(0); // changing value for useEffect
    const [showForm, setShowForm] = useState(false);
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [numOfNotes, setNumOfNotes] = useState(categoryDetails.NumOfNotes);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [image, setImage] = useState(null);
    const [base64picture, setBase64picture] = useState("");

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

    const toggleDeleteModal = () => { setOpenDeleteModal(!openDeleteModal); };
    const onContentChange = (text) => setContent(text);

    const toggleNote = () => {
        setShowForm(val => !val);
        setErrorMessage("");
        setContent("");
        setImage(null);
        setBase64picture("");
    };

    const addNoteSubmit = async () => {
        const d = await addNote({ content, id: categoryDetails.Id, base64picture });
        if (!d.pass) {
            setErrorMessage(d.Message);
        } else {
            setNumOfNotes(val => val + 1);
            setShowForm(false);
            onRefresh();
        }
    };

    const deleteNoteSubmit = async () => {
        const d = await deleteNote(deleteId);
        if (d.pass) {
            setNumOfNotes(val => val - 1);
            setOpenDeleteModal(false);
            onRefresh();
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        setRefreshCount(val => val + 1);
    }

    useEffect(() => {
        const getData = async () => {
            const d = await getNotes(categoryDetails.Id);
            setRefreshing(false);
            if (!d.pass) {
                setNotes(d.Message);
            } else {
                setNotes(d.Data);
            }
        }
        getData();
    }, [refreshCount]);

    return (
        <SafeAreaProvider>
            <AppHeader title={categoryDetails.Name + " (" + numOfNotes + ")"} plusAction={toggleNote} nav={props.navigation} />

            {showForm &&
                <View style={styles.newNote}>
                    <Text style={styles.newNoteTitle}>Add New Note</Text>
                    <TextInput
                        multiline={true}
                        onChangeText={onContentChange}
                        value={content}
                        style={styles.noteContent} />
                    <Button title="Pick an image from camera roll" onPress={pickImage} type="clear" />
                    {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, resizeMode: 'contain' }} />}
                    <Text>{errorMessage}</Text>
                    <Button title="Create" onPress={addNoteSubmit} disabled={(content.length == 0)} />
                </View>}

            <ScrollView contentContainerStyle={styles.scrollView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <Text style={{ padding: 20, paddingBottom: 10, color: '#686868' }}>Hint: long press on note to delete it</Text>
                {(typeof notes === "string") ? <Text style={styles.message}>{notes}</Text>
                    : notes.map((note) => <NoteRow note={note} key={"note" + note.Id} nav={props.navigation}
                        setOpenDeleteModal={setOpenDeleteModal} setDeleteId={setDeleteId} />)}
            </ScrollView>

            <Dialog isVisible={openDeleteModal} onBackdropPress={toggleDeleteModal}>
                <Dialog.Title title="Confirm" />
                <Text>Are you sure you want to delete this note?</Text>
                <Dialog.Actions>
                    <Dialog.Button title="Cancel" onPress={() => setOpenDeleteModal(false)} />
                    <Dialog.Button title="Delete" titleStyle={{ color: 'red' }} onPress={deleteNoteSubmit} />
                </Dialog.Actions>
            </Dialog>
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
        marginBottom: 10,
        height: 100,
        textAlignVertical: 'top',
        padding: 5
    }
});

export default Notes;
