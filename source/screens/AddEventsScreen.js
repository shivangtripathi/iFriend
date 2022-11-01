import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import moment from 'moment';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import days from '../../days';
import {Checkbox} from 'react-native-paper';
import {change_variable} from '../actions';
import firestore, { firebase } from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import uuid from 'react-native-uuid';

const WIDTH = Dimensions.get('window').width;

const AddEventsScreen = props => {
  const navigation = useNavigation();
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [subGroups, setSubGroups] = useState('');
  const [eventTime, setEventTime] = useState(new Date());
  const [timeModal, setTimeModal] = useState(false);
  const [eventVenue, setEventVenue] = useState('');
  const [eventDisplayTime, setEventDisplayTime] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [isRepeated, setIsRepeated] = useState(false);

  const handleTimeEventChange = time => {
    setTimeModal(false);
    setEventTime(time);
    setEventDisplayTime(moment(time).format('LT'));
  };

  const _addEvent = () => {
    const groups = subGroups.split(',');
    groups.forEach(group => {
      const event = {
        uid:uuid.v4(),
        subject: subjectName,
        subjectCode: subjectCode,
        group: groups,
        time: eventTime,
        venue: eventVenue,
        isRepeated,
        days: selectedDays,
        ownerId: props.user.uid,
      };
      firestore().collection('events').doc(`G-${group}`).set(event);
    });
    navigation.pop();
  };

  function onMultiChange(item) {
    if (isRepeated) {
      if (selectedDays.indexOf(item) !== -1) {
        let newDaysState = selectedDays.filter(itm => itm.id !== item.id);
        setSelectedDays(newDaysState);
      } else {
        setSelectedDays([...selectedDays, item]);
      }
    } else {
      setSelectedDays([item]);
    }
  }

  return (
    <View style={{flex: 1, overflow: 'hidden'}}>
      <ScrollView style={styles.container}>
        <CustomTextInput
          label={'Subject Code'}
          onChangeText={code => setSubjectCode(code)}
          value={subjectCode}
        />
        <CustomTextInput
          label={'Subject Name'}
          onChangeText={name => setSubjectName(name)}
          value={subjectName}
        />

        <CustomTextInput
          label={'Sub groups enrolled separated with commas (eg: 3CS8,3CS9)'}
          onChangeText={groups => setSubGroups(groups)}
          value={subGroups}
        />

        <TouchableOpacity
          onPress={() => setTimeModal(true)}
          activeOpacity={0.9}>
          <CustomTextInput
            label={'Time'}
            disabled={true}
            value={eventDisplayTime}
          />
        </TouchableOpacity>
        {timeModal && (
          <RNDateTimePicker
            value={eventTime}
            mode={'time'}
            onChange={event =>
              handleTimeEventChange(event.nativeEvent.timestamp)
            }
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            marginTop: 10,
          }}>
          <Text style={{color: '#000', fontSize: 14}}>
            {' '}
            Is repeated event ?
          </Text>
          <Checkbox
            status={isRepeated ? 'checked' : 'unchecked'}
            onPress={() => setIsRepeated(!isRepeated)}
            color={'#601a35'}
          />
        </View>

        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
          }}>
          <Text style={{color: '#000', fontSize: 14}}>
            {' '}
            Select day{isRepeated ? 's' : ''}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginVertical: 10,
            }}>
            {days.map((item, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width:(WIDTH/3),
                    justifyContent:'space-between'
                  }}
                  key={index}>
                  <Text style={{color: '#000',fontSize:14,marginLeft:10}}>{item.item}</Text>
                  <Checkbox
                    status={
                      selectedDays.indexOf(item) != -1 ? 'checked' : 'unchecked'
                    }
                    onPress={() => onMultiChange(item)}
                    color={'#601a35'}
                  />
                </View>
              );
            })}
          </View>
        </View>

        <CustomTextInput
          label={'Venue'}
          onChangeText={venue => setEventVenue(venue)}
          value={eventVenue}
        />

        <TouchableOpacity
          style={styles.registerButton}
          activeOpacity={0.8}
          onPress={_addEvent}>
          <Text style={styles.registerButtonText}>Add Event</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  registerButton: {
    backgroundColor: '#601a35',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  registerButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#000',
    fontSize: 14,
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
})(AddEventsScreen);
