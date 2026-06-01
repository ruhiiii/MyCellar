import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function WineCard({ wine, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
            <View style={styles.row}>
                <View style={styles.meta}>
                    <Text style={styles.name}>{wine.name}</Text>
                    {wine.winery ? <Text style={styles.winery}>{wine.winery}</Text> : null}
                </View>
                <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>{wine.rating}</Text>
                </View>
            </View>
            {wine.year ? <Text style={styles.year}>{wine.year}</Text> : null}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    meta: {
        flex: 1,
        paddingRight: 12,
    },
    name: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111111',
    },
    winery: {
        marginTop: 4,
        color: '#545454',
        fontSize: 14,
    },
    year: {
        marginTop: 10,
        color: '#6d6d72',
        fontSize: 13,
    },
    ratingBadge: {
        minWidth: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#f7d6cc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#7a2d16',
    },
});
