import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function WineDetailScreen({ route, navigation }) {
    const { wine } = route.params;
    const formattedDate = wine.dateAdded?.toDate ? wine.dateAdded.toDate().toLocaleDateString() : new Date().toLocaleDateString();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.header}>{wine.name}</Text>
            {wine.winery ? <Text style={styles.subheader}>{wine.winery}</Text> : null}
            <View style={styles.detailRow}>
                {wine.year ? <Text style={styles.detailItem}>{wine.year}</Text> : null}
                <Text style={styles.detailItem}>Rating: {wine.rating}</Text>
                <Text style={styles.detailItem}>{wine.wouldDrinkAgain ? 'Would drink again' : 'Maybe next time'}</Text>
            </View>
            <Text style={styles.sectionLabel}>Tags</Text>
            <View style={styles.tagsRow}>
                {wine.tags?.length ? (
                    wine.tags.map(tag => (
                        <View key={tag} style={styles.tagChip}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.muted}>No tags added.</Text>
                )}
            </View>
            <Text style={styles.sectionLabel}>Notes</Text>
            <Text style={styles.textBlock}>{wine.notes || 'No additional tasting notes.'}</Text>
            <Text style={styles.sectionLabel}>Logged</Text>
            <Text style={styles.textBlock}>{formattedDate}</Text>
            <TouchableOpacity
                style={styles.communityButton}
                onPress={() => navigation.navigate('CommunityInsights')}
            >
                <Text style={styles.communityButtonText}>What do others think?</Text>
            </TouchableOpacity>
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
    header: {
        fontSize: 28,
        fontWeight: '800',
        color: '#111111',
    },
    subheader: {
        marginTop: 6,
        fontSize: 16,
        color: '#5b5b63',
    },
    detailRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 18,
    },
    detailItem: {
        marginRight: 10,
        fontSize: 14,
        color: '#4c4c52',
    },
    sectionLabel: {
        marginTop: 24,
        fontSize: 15,
        fontWeight: '700',
        color: '#151515',
        marginBottom: 10,
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagChip: {
        backgroundColor: '#ffffff',
        borderRadius: 999,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderColor: '#e6e1dd',
        borderWidth: 1,
        marginRight: 10,
        marginBottom: 10,
    },
    tagText: {
        color: '#4c4c52',
        fontWeight: '600',
    },
    textBlock: {
        fontSize: 15,
        lineHeight: 22,
        color: '#3f3f46',
        backgroundColor: '#ffffff',
        borderRadius: 18,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 1,
    },
    muted: {
        color: '#6d6d72',
        fontSize: 14,
    },
    communityButton: {
        marginTop: 30,
        backgroundColor: '#7a2d16',
        borderRadius: 18,
        paddingVertical: 16,
        alignItems: 'center',
    },
    communityButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
});
