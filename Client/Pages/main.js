import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ListItem, Avatar, Badge } from '@rneui/themed';
import { getCategories, addCategory } from "../api";
import AppHeader from "./header";
import { Input } from '@rneui/themed';
import { Button } from '@rneui/themed';

const CategoryRow = ({ category, nav }) => {
    return (
        <TouchableOpacity onPress={() => nav.navigate('Notes', {category})}>
            <ListItem bottomDivider>
                <Avatar rounded icon={{ name: 'folder', type: 'material', size: 16 }}
                    containerStyle={{ backgroundColor: '#d3d3d3' }} />
                <ListItem.Content>
                    <ListItem.Title style={{ fontSize: 20 }}>
                        <Text>{category.Name}</Text> <Badge value={category.NumOfNotes} status="primary" /> <Text></Text>
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    )
}

function Main(props) {
    const [categories, setCategories] = useState("loading..");
    const [refreshing, setRefreshing] = useState(false);
    const [refreshCount, setRefreshCount] = useState(0); // changing value for useEffect
    const [showForm, setShowForm] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onCategoryNameChange = (text) => setCategoryName(text);

    const toggleCategory = () => {
        setShowForm(val => !val);
        setErrorMessage("");
        setCategoryName("");
    };

    const addCategorySubmit = async () => {
        const d = await addCategory({name: categoryName});
        if (!d.pass) {
            setErrorMessage(d.Message);
        } else {
            setShowForm(val => !val);
            onRefresh();
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        setRefreshCount(val => val + 1);
    }

    useEffect(() => {
        const getData = async () => {
            const d = await getCategories();
            setRefreshing(false);
            if (!d.pass) {
                setCategories(d.Message);
            } else {
                setCategories(d.Data);
            }
        }
        getData();
    }, [refreshCount]);

    return (
        <SafeAreaProvider>
            <AppHeader title="Categories" plusAction={toggleCategory} />
            
            { showForm && 
            <View style={styles.newCategory}>
                <Text style={styles.newCategoryTitle}>Add New Category</Text>
                <Input placeholder='Name' value={categoryName} onChangeText={onCategoryNameChange} 
                       errorMessage={errorMessage} />
                <Button title="Create" onPress={addCategorySubmit} disabled={(categoryName.length==0)} />
            </View> }


            <ScrollView contentContainerStyle={styles.scrollView}
                refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>

                {(typeof categories === "string") ? <Text style={styles.message}>{categories}</Text>
                    : categories.map((category) => <CategoryRow category={category} key={"cat" + category.Id} nav={props.navigation} />)}
                    
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
    newCategory: {
        display: "flex",
        padding: 20,
        backgroundColor: "#f0f0f0"
    },
    newCategoryTitle: {
        fontSize: 20,
        marginBottom: 15
    }
});

export default Main;
