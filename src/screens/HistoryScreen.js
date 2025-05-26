import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await AsyncStorage.getItem('scanHistory');
        setHistory(data ? JSON.parse(data).reverse() : []);
      } catch (error) {
        console.log('Failed to fetch history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Scan History</Text>
      {history.length === 0 ? (
        <Text style={styles.noData}>No scanned items yet.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.id}>ID: {item.id}</Text>
              <Text style={styles.raw}>Raw: {item.raw}</Text>
              <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  noData: { textAlign: 'center', marginTop: 50, color: '#666' },
  item: {
    padding: 12,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
    borderRadius: 8,
  },
  id: { fontWeight: 'bold', fontSize: 16 },
  raw: { color: '#444' },
  date: { fontSize: 12, color: '#888' },
});
