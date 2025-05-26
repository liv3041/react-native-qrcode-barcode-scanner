import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { fetchItemById } from '../services/apiServices';

export default function DetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItemById(id)
      .then(data => {
        if (!data.length) Alert.alert('No Data', `No items found up to ID ${id}`);
        setItems(data);
      })
      .catch(() => Alert.alert('Error', 'Failed to load data'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#007AFF" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {items.map((item) => (
        <View key={item.ItmID} style={styles.card}>
          <Text style={styles.title}>Item Details (ID: {item.ItmID})</Text>

          {item.ItmThmbnl && (
            <Image
              style={styles.thumb}
              source={{ uri: `data:image/png;base64,${item.ItmThmbnl}` }}
            />
          )}

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{item.ItmNm}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Group:</Text>
            <Text style={styles.value}>{item.ItmGrdNm}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Size:</Text>
            <Text style={styles.value}>{item.ItmSize}</Text>
          </View>
        </View>
      ))}

      <View style={styles.buttonWrapper}>
        <Button title="Scan Again" onPress={() => navigation.replace('Scan')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9FAFB',
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },
  thumb: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 16,
  },
  infoBlock: {
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 14,
    color: '#111',
    marginTop: 4,
  },
  buttonWrapper: {
    marginTop: 24,
    marginBottom: 40,
  },
});

