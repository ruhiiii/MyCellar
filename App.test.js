import React from 'react';
import { Alert } from 'react-native';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import HomeScreen from './src/screens/HomeScreen';
import AddWineScreen from './src/screens/AddWineScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

jest.mock('./src/firebase/firestoreService', () => ({
  subscribeWines: jest.fn(() => () => {}),
  addWine: jest.fn(() => Promise.resolve({ id: '123' })),
}));

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('App', () => {
  it('renders the home screen title', () => {
    render(<HomeScreen />);
    expect(screen.getByText('My Cellar')).toBeTruthy();
  });

  it('shows the empty state after Firestore returns no wines', () => {
    const { subscribeWines } = require('./src/firebase/firestoreService');
    subscribeWines.mockImplementation(onUpdate => {
      onUpdate([]);
      return jest.fn();
    });

    render(<HomeScreen />);

    expect(screen.getByText('No wines yet')).toBeTruthy();
    expect(screen.getByText('Capture your next bottle and it will appear here.')).toBeTruthy();
  });

  it('renders a wine returned by Firestore', () => {
    const { subscribeWines } = require('./src/firebase/firestoreService');
    subscribeWines.mockImplementation(onUpdate => {
      onUpdate([
        {
          id: 'wine-1',
          name: 'Pinot Noir',
          winery: 'Example Winery',
          year: 2022,
          rating: 4,
        },
      ]);
      return jest.fn();
    });

    render(<HomeScreen />);

    expect(screen.getByText('Pinot Noir')).toBeTruthy();
    expect(screen.getByText('Example Winery')).toBeTruthy();
    expect(screen.getByText('2022')).toBeTruthy();
  });

  it('validates required wine name before saving', () => {
    const navigation = { goBack: jest.fn() };
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    render(<AddWineScreen navigation={navigation} />);

    fireEvent.press(screen.getByText('Save Wine'));

    expect(alertSpy).toHaveBeenCalledWith('Validation', 'Please enter a wine name.');
    expect(navigation.goBack).not.toHaveBeenCalled();
  });

  it('validates required rating before saving', () => {
    const navigation = { goBack: jest.fn() };
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    render(<AddWineScreen navigation={navigation} />);
    fireEvent.changeText(screen.getByPlaceholderText('Cabernet Sauvignon'), 'Pinot Noir');
    fireEvent.press(screen.getByText('Save Wine'));

    expect(alertSpy).toHaveBeenCalledWith('Validation', 'Please select a rating.');
    expect(navigation.goBack).not.toHaveBeenCalled();
  });

  it('saves a valid wine and returns to the previous screen', () => {
    const navigation = { goBack: jest.fn() };
    const { addWine } = require('./src/firebase/firestoreService');

    render(<AddWineScreen navigation={navigation} />);

    fireEvent.changeText(screen.getByPlaceholderText('Cabernet Sauvignon'), 'Pinot Noir');
    fireEvent.changeText(screen.getByPlaceholderText('Chateau Example'), 'Example Winery');
    fireEvent.changeText(screen.getByPlaceholderText('2021'), '2022');
    fireEvent.press(screen.getByText('4'));
    fireEvent.press(screen.getByText('Fruity'));
    fireEvent.changeText(
      screen.getByPlaceholderText('Tasting notes, finish, impressions...'),
      'Cherry and spice'
    );
    fireEvent.press(screen.getByText('Save Wine'));

    expect(addWine).toHaveBeenCalledWith({
      name: 'Pinot Noir',
      winery: 'Example Winery',
      year: 2022,
      rating: 4,
      wouldDrinkAgain: false,
      tags: ['Fruity'],
      notes: 'Cherry and spice',
    });
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('returns to the previous screen when saving fails', async () => {
    const navigation = { goBack: jest.fn() };
    const { addWine } = require('./src/firebase/firestoreService');
    addWine.mockRejectedValueOnce(new Error('Firestore unavailable'));

    render(<AddWineScreen navigation={navigation} />);
    fireEvent.changeText(screen.getByPlaceholderText('Cabernet Sauvignon'), 'Pinot Noir');
    fireEvent.press(screen.getByText('4'));
    fireEvent.press(screen.getByText('Save Wine'));

    expect(addWine).toHaveBeenCalledTimes(1);
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(addWine).toHaveBeenCalled());
  });
});
