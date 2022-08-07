import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
import { StyleSheet } from 'react-native';

import { Text } from 'react-native-paper';


const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const HomeScreen = () => {
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <Card>
          <Card.Content>
            <View style={styles.cardstyle}>
              <Text>{item.name}</Text>
              <Avatar.Text label="A" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2022-08-16'}
        renderItem={renderItem}
      />
    </View>
  )
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  cardstyle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  }
});
