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

  useEffect(() => {
    if (!props.user_type) {
      let user = auth().currentUser;
      props.change_variable('user_type', user.displayName);
      props.change_variable('user', user);
      if (user.displayName === 'student') {
        firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(userData => {
            let userDetails = userData.data();
            props.change_variable('subBatchCode', userDetails?.batch);
            props.change_variable('name', userDetails?.name);
            props.change_variable('roll', userDetails?.roll);
          });
      } else if (user.displayName === 'instructor') {
        firestore()
          .collection('instructors')
          .doc(user.uid)
          .get()
          .then(userData => {
            let userDetails = userData.data();
            props.change_variable('name', userDetails?.name);
          });
      }
    }
  }, []);

  const loadEvents = () => {
    if (props.user_type === 'instructor') {
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
        let list = {};
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
        setItems(list);
      });
    } else if (props.user_type === 'student') {
      async function getEventsData() {
        let filtered_events = [];
        console.log(props.subBatchCode);
        await firestore()
          .collection('events')
          .get()
          .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
              if (
                doc.data().group.includes(props.subBatchCode) ||
                doc
                  .data()
                  .group.includes(props.subBatchCode.replace(/\d+$/, ''))
              ) {
                filtered_events.push(doc.data());
              }
            });
          });
        return filtered_events;
      }
      getEventsData().then(eventsData => {
        var curr = new Date();
        var first = curr.getDate() - curr.getDay();
        let list = {};
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
        setItems(list);
      });
    }
  };

  const renderGroup = group => {
    let res = [];
    if (group) {
      group?.map((itm, idx) => {
        res.push(
          <Text
            key={idx}
            style={{marginLeft: idx === 0 ? 0 : 10, color: '#000'}}>
            {itm}
          </Text>
        );
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
              <Text style={{fontSize: 14, color: '#000'}}>
                {moment(item.time * 1000).format('LT')}
              </Text>
              <Text style={{fontSize: 14, color: '#000'}}>{item.subject}</Text>
              <Text style={{fontSize: 14, color: '#000'}}>
                {item.subjectCode}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  flexWrap: 'wrap',
                  fontSize: 14,
                }}>
                {renderGroup(item?.group)}
              </View>
              <Text style={{fontSize: 14, color: '#000'}}>{item.venue}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={{marginRight: 10, marginTop: 20}}>
        <Card>
          <Card.Content>
            <View style={styles.cardstyle}>
              <Text style={{fontSize: 14, color: '#000'}}>
                No classes to display
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        scrollEnabled={false}
        showOnlySelectedDayItems={true}
        renderEmptyDate={renderEmptyDate}
        loadItemsForMonth={loadEvents}
        displayLoadingIndicator={true}
        selected={new Date()}
        hideKnob={true}
        renderItem={item => renderItem(item)}
        theme={{
          agendaDayTextColor: 'black',
          agendaDayNumColor: 'black',
          agendaTodayColor: '#601a35',
          dayTextColor: '#000',
          indicatorColor: '#601a35',
          dotColor: '#601a35',
          selectedDayBackgroundColor: '#601a35',
          todayTextColor: '#601a35',
          selectedDayTextColor: '#fff',
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
