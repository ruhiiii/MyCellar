import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { subscribeWines } from '../firebase/firestoreService';
import WineCard from '../components/WineCard';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [wines, setWines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeWines(
            data => {
                console.log('HomeScreen snapshot received', data.length, 'wines');
                setWines(data);
                setLoading(false);
            },
            error => {
                console.error('HomeScreen subscribeWines error', error);
                setLoading(false);
            }
        );
        return unsubscribe;
    }, []);

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No wines yet</Text>
            <Text style={styles.emptyText}>Capture your next bottle and it will appear here.</Text>
        </View>
    );

    return (
        <View testID="home-screen" style={styles.container}>
            <View style={styles.hero}>
                <Text style={styles.title}>My Cellar</Text>
                <Text style={styles.subtitle}>A clean log for every bottle you try.</Text>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#7a2d16" style={styles.spinner} />
            ) : (
                <FlatList
                    data={wines}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <WineCard
                            wine={item}
                            onPress={() => navigation.navigate('WineDetail', { wine: item })}
                        />
                    )}
                    contentContainerStyle={wines.length === 0 ? styles.emptyList : styles.list}
                    ListEmptyComponent={renderEmpty}
                />
            )}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddWine')}
                activeOpacity={0.85}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f2ee',
        paddingHorizontal: 20,
    },
    hero: {
        paddingVertical: 14,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#111111',
    },
    subtitle: {
        marginTop: 6,
        color: '#5b5b63',
        fontSize: 16,
        lineHeight: 22,
    },
    list: {
        paddingBottom: 110,
    },
    emptyList: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 110,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingTop: 40,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333333',
    },
    emptyText: {
        marginTop: 8,
        fontSize: 15,
        color: '#6d6d72',
        textAlign: 'center',
        maxWidth: 260,
    },
    spinner: {
        marginTop: 40,
    },
    addButton: {
        position: 'absolute',
        right: 22,
        bottom: 28,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#7a2d16',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 10 },
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 32,
        lineHeight: 34,
        fontWeight: '700',
    },
});
