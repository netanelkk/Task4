import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Header as HeaderRNE, Icon } from '@rneui/themed';

export default function AppHeader({plusAction, title, nav}) {
  return (
    <HeaderRNE
    rightComponent={ plusAction && 
        <View>
            <TouchableOpacity onPress={plusAction}>
                <Icon name='add-circle' iconStyle={styles.headerRight} />
            </TouchableOpacity>
        </View>
    }
    centerComponent={
        <View>
            <Text style={styles.heading}>{title}</Text>
        </View>
    }
    leftComponent={
        nav &&
        <View>
        <TouchableOpacity onPress={ () => nav.goBack() }>
            <Icon name='arrow-back-ios' iconStyle={styles.headerLeft} />
        </TouchableOpacity>
        </View>
    }
    placement="left"
    containerStyle={styles.headerContainer}
    />
  )
}

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        paddingVertical: 15,
        borderBottomColor: '#ddd'
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 40
    },
    headerRight: {
        fontSize: 45
    },
    headerLeft: {
        fontSize: 25,
        padding: 12,
        paddingRight: 0
    }
});
