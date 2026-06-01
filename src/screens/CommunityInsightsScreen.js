import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const insight = {
    averageRating: 4.2,
    topNotes: ['Cherry', 'Oak', 'Chocolate'],
    summary: 'Rich, smooth, full-bodied with a long finish.',
};

export default function CommunityInsightsScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.heading}>Community Insights</Text>
            <View style={styles.card}>
                <Text style={styles.label}>Average Rating</Text>
                <Text style={styles.value}>{insight.averageRating.toFixed(1)} / 5</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.label}>Top Notes</Text>
                <View style={styles.tagsRow}>
                    {insight.topNotes.map(note => (
                        <View key={note} style={styles.noteChip}>
                            <Text style={styles.noteText}>{note}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.card}>
                <Text style={styles.label}>Summary</Text>
                <Text style={styles.summaryText}>{insight.summary}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f2ee',
    },
    content: {
        padding: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: '800',
        color: '#111111',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 2,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: '#6d6d72',
        marginBottom: 10,
    },
    value: {
        fontSize: 32,
        fontWeight: '800',
        color: '#111111',
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    noteChip: {
        backgroundColor: '#f2ede7',
        borderRadius: 999,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginRight: 10,
        marginBottom: 10,
    },
    noteText: {
        color: '#3f3f46',
        fontWeight: '600',
    },
    summaryText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#3f3f46',
    },
});
