import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Switch,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { addWine } from '../firebase/firestoreService';

const TAGS = ['Fruity', 'Dry', 'Bold', 'Light', 'Oaky'];

export default function AddWineScreen({ navigation }) {
    console.log('AddWineScreen render');
    const [name, setName] = useState('');
    const [winery, setWinery] = useState('');
    const [year, setYear] = useState('');
    const [rating, setRating] = useState(0);
    const [wouldDrinkAgain, setWouldDrinkAgain] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [notes, setNotes] = useState('');
    const [saving, setSaving] = useState(false);

    const toggleTag = tag => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(item => item !== tag) : [...prev, tag]
        );
    };

    const handleSave = async () => {
        if (!name.trim()) {
            Alert.alert('Validation', 'Please enter a wine name.');
            return;
        }

        if (rating < 1) {
            Alert.alert('Validation', 'Please select a rating.');
            return;
        }

        const yearValue = /^\d{4}$/.test(year.trim()) ? Number(year.trim()) : null;
        const wine = {
            name: name.trim(),
            winery: winery.trim() || null,
            year: yearValue,
            rating,
            wouldDrinkAgain,
            tags: selectedTags,
            notes: notes.trim(),
        };
        console.log('AddWineScreen handleSave', wine);

        console.log('AddWineScreen setting saving=true');
        setSaving(true);

        const savePromise = addWine(wine)
            .then(docRef => {
                console.log('AddWineScreen save succeeded (async), id=', docRef?.id);
            })
            .catch(error => {
                console.error('AddWineScreen save failed (async)', error);
            });

        navigation.goBack();

        // Keep the save running in the background, but the user returns immediately.
        savePromise.finally(() => {
            console.log('AddWineScreen save promise completed');
        });
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Text style={styles.label}>Name *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Cabernet Sauvignon"
                    value={name}
                    onChangeText={setName}
                    returnKeyType="done"
                />

                <Text style={styles.label}>Winery</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Chateau Example"
                    value={winery}
                    onChangeText={setWinery}
                    returnKeyType="done"
                />

                <Text style={styles.rowLabel}>Year</Text>
                <TextInput
                    style={styles.input}
                    placeholder="2021"
                    value={year}
                    onChangeText={text => setYear(text.replace(/[^0-9]/g, ''))}
                    keyboardType="numeric"
                    maxLength={4}
                    returnKeyType="done"
                />

                <Text style={styles.label}>Rating *</Text>
                <View style={styles.ratingRow}>
                    {[1, 2, 3, 4, 5].map(value => (
                        <TouchableOpacity
                            key={value}
                            style={[styles.starButton, rating === value && styles.starButtonActive]}
                            onPress={() => setRating(value)}
                        >
                            <Text style={[styles.starLabel, rating === value && styles.starLabelActive]}>{value}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.toggleRow}>
                    <View>
                        <Text style={styles.label}>Would Drink Again</Text>
                        <Text style={styles.toggleHint}>Save the wines you want to revisit.</Text>
                    </View>
                    <Switch value={wouldDrinkAgain} onValueChange={setWouldDrinkAgain} thumbColor="#7a2d16" />
                </View>

                <Text style={styles.label}>Tags</Text>
                <View style={styles.tagsRow}>
                    {TAGS.map(tag => {
                        const active = selectedTags.includes(tag);
                        return (
                            <TouchableOpacity
                                key={tag}
                                style={[styles.tagChip, active && styles.tagChipActive]}
                                onPress={() => toggleTag(tag)}
                            >
                                <Text style={[styles.tagText, active && styles.tagTextActive]}>{tag}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <Text style={styles.label}>Notes</Text>
                <TextInput
                    style={[styles.input, styles.notesInput]}
                    placeholder="Tasting notes, finish, impressions..."
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                />

                <TouchableOpacity
                    style={[styles.saveButton, saving && styles.saveButtonDisabled]}
                    onPress={handleSave}
                    disabled={saving}
                >
                    <Text style={styles.saveText}>{saving ? 'Saving...' : 'Save Wine'}</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f7f2ee',
    },
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    label: {
        fontSize: 15,
        fontWeight: '700',
        color: '#151515',
        marginBottom: 8,
    },
    rowLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#151515',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        fontSize: 15,
        color: '#1c1c1c',
        marginBottom: 18,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 1,
    },
    notesInput: {
        minHeight: 110,
    },
    ratingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18,
    },
    starButton: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e6e1dd',
    },
    starButtonActive: {
        backgroundColor: '#7a2d16',
        borderColor: '#7a2d16',
    },
    starLabel: {
        fontSize: 17,
        fontWeight: '700',
        color: '#555555',
    },
    starLabelActive: {
        color: '#ffffff',
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
    },
    toggleHint: {
        marginTop: 4,
        color: '#6d6d72',
        fontSize: 13,
        maxWidth: 220,
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 22,
    },
    tagChip: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 999,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e6e1dd',
        marginRight: 10,
        marginBottom: 10,
    },
    tagChipActive: {
        backgroundColor: '#7a2d16',
        borderColor: '#7a2d16',
    },
    tagText: {
        color: '#575759',
        fontWeight: '600',
    },
    tagTextActive: {
        color: '#ffffff',
    },
    saveButton: {
        marginTop: 10,
        backgroundColor: '#7a2d16',
        borderRadius: 18,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonDisabled: {
        opacity: 0.7,
    },
    saveText: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '700',
    },
});
