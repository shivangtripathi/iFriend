import {StyleSheet, Text, View} from 'react-native';
import {LatLng, LeafletView} from 'react-native-leaflet-view';
import {connect} from 'react-redux';
import {change_variable} from '../actions';
import React from 'react';

const Markers = [
  {
    id: 'H Hostel',
    position: {lat: 30.353011452720043, lng: 76.36454304690149},
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'COS',
    position: {
      lat: 30.354056,
      lng: 76.362333,
    },
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'A Hostel',
    position: {
      lat: 30.351755037798185,
      lng: 76.36455389235891,
    },
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'B Hostel',
    position: {
      lat: 30.351471,
      lng: 76.363344,
    },
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'O Hostel',
    position: {
      lat: 30.35159472051498,
      lng: 76.3622440346468,
    },
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'C Hostel',
    position: {
      lat: 30.35134261236065,
      lng: 76.36127038148295,
    },
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'J Hostel',
    position: {
      lat: 30.35280819553987,
      lng: 76.36348395224927,
    },
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'D Hostel',
    position: {
      lat: 30.35108026614265,
      lng: 76.3598570850406,
    },
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'M Hostel',
    position: {
      lat: 30.35243723927627,
      lng: 76.36097756713937,
    },
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'Track',
    position: {
      lat: 30.354228255245793,
      lng: 76.36124790712165,
    },
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'Faculty Residence',
    position: {
      lat: 30.35392156940079,
      lng: 76.35968216933324,
    },
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'Football Ground',
    position: {
      lat: 30.354276484780456,
      lng: 76.3633979880862,
    },
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'Cricket Ground',
    position: {
      lat: 30.354295000973536,
      lng: 76.36434190730458,
    },
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'E Hostel',
    position: {lat: 30.355192903014068, lng: 76.36647630524705},
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'G Hostel',
    position: {lat: 30.354354741637273, lng: 76.36655057092152},
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'I Hostel',
    position: {lat: 30.35512123435038, lng: 76.36770544875839},
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'N Hostel',
    position: {lat: 30.35433622545549, lng: 76.36819170319895},
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'PG Hostel',
    position: {lat: 30.351700942293395, lng: 76.36628549154162},
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'K Hostel',
    position: {lat: 30.35707177956674, lng: 76.36349391300206},
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'Polytechnic College',
    position: {lat: 30.35761504839016, lng: 76.36744356540291},
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'TAN',
    position: {lat: 30.353610907162814, lng: 76.36851403108946},
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'LT',
    position: {lat: 30.3552310181361, lng: 76.36926013268602},
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'G Block',
    position: {lat: 30.35348024518419, lng: 76.36942548225963},
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'Library',
    position: {lat: 30.354444084368804, lng: 76.36983935584279},
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'B Block',
    position: {lat: 30.353217525249438, lng: 76.37079496182594},
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'C Block',
    position:{lat:30.35369417688896,lng:76.37068212032318},
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'E Block',
    position: {lat: 30.35352508634032, lng: 76.3723247997331},
    icon: '📍',
    size: [32, 32],
  },
  {
    id: 'F Block',
    position: {lat: 30.354295554882732, lng: 76.37215138330502},
    icon: '📍',
    size: [32, 32],
  },
];

const Screen4 = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.mapstyle}>
        <LeafletView
          mapCenterPosition={{lat: 30.353575, lng: 76.364407}}
          zoom={16}
          mapMarkers={Markers}
          mapShapes={[
            {
              bounds: [
                {lat: 30.352119097563723, lng: 76.37386590289553},
                {lat: 30.358571536433413, lng: 76.37319504501772},
                {lat: 30.349766715631457, lng: 76.35950946943765},
                {lat: 30.356909500933938, lng: 76.35847105068399},
              ],
              center: {lat: 30.354383995536004, lng: 76.36739773387639},
              radius: 15,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapstyle: {
    height: '100%',
    width: '100%',
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
})(Screen4);
