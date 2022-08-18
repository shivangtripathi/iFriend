import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {change_variable} from '../actions';
import moment from 'moment';

const mapDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const HomeScreen = props => {
  const navigation = useNavigation();
  const [items, setItems] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!props.user_type) {
      let user = auth().currentUser;
      props.change_variable('user_type', user.displayName);
      props.change_variable('user', user);
    }
  }, []);

  const loadEvents = () => {
    async function getEventsData() {
      let filtered_events = [];
      await firestore()
        .collection('events')
        .get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            if (doc.data().ownerId === props.user.uid) {
              filtered_events.push(doc.data());
            }
          });
        });
      return filtered_events;
    }
    getEventsData().then(eventsData => {
      var curr = new Date();
      var first = curr.getDate() - curr.getDay();
      let list = new Object();
      let addedEvents = {};
      for (let i = 0; i <= 6; i++) {
        var cDate = first + i;
        let nextDate = new Date(curr.setDate(cDate));
        let key = nextDate.toISOString().split('T')[0];
        if (typeof list[key] === 'undefined') {
          list[key] = [];
          eventsData?.map((event, index) => {
            event?.days.map((itm, idx) => {
              if (
                typeof addedEvents[event.uid] === 'undefined' ||
                addedEvents[event.uid] !== itm.item
              ) {
                if (itm.item === mapDays[nextDate.getDay()]) {
                  list[key].push(event);
                  addedEvents[event.uid] = itm.item;
                }
              }
            });
          });
        }
      }
      //setEvents(eventsData);
      setItems(list);
    });
  };

  const renderGroup = group => {
    let res = [];
    if(group){
      group?.map((itm, idx) => {
        res.push(<Text key={idx} style={{marginLeft:idx===0?0:10}}>{itm}</Text>);
      });
    }

    return res;
  };
  const renderItem = item => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 10}}>
        <Card>
          <Card.Content>
            <View style={styles.cardstyle}>
              <Text style>{moment(item.time).format('LT')}</Text>
              <Text style={{fontSize:14}}>{item.subject}</Text>
              <Text style={{fontSize:14}}>{item.subjectCode}</Text>
              <View style={{flexDirection:'row',marginLeft:10,flexWrap:"wrap",fontSize:14}}>
                {renderGroup(item?.group)}
              </View>
              <Text style={{fontSize:14}}>{item.venue}</Text>
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
        scrollEnabled={false}
        showOnlySelectedDayItems={true}
        loadItemsForMonth={loadEvents}
        displayLoadingIndicator={true}
        selected={new Date()}
        hideKnob={true}
        renderItem={item => renderItem(item)}
        theme={{
          agendaDayTextColor: 'black',
          agendaDayNumColor: 'black',
          agendaTodayColor: '#601a35',
        }}
      />
      {props.user_type === 'instructor' ? (
        <TouchableOpacity
          style={{
            marginBottom: 10,
            marginRight: 20,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('AddEvent')}>
          <MaterialCommunityIcons
            name="plus-circle"
            size={48}
            color="#601a35"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  cardstyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  const {
    user,
    user_type,
    authenticated,
    batchCode,
    subBatchCode,
    enrollNumber,
    loading,
  } = state.variables;

  return {
    user,
    user_type,
    authenticated,
    batchCode,
    subBatchCode,
    enrollNumber,
    loading,
  };
};
export default connect(mapStateToProps, {
  change_variable,
})(HomeScreen);
