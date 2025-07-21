// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import { Image } from '@rneui/base';
// import { useNavigation } from '@react-navigation/native';

// const MainHeader = ({
//   name,
//   showBackButton = true,
//   backIcon,
//   leftIcon, // optional prop
// }) => {
//   const navigation = useNavigation();

//   const renderLeftIcon = () => {
//     if (leftIcon && leftIcon.type === 'image' && leftIcon.source) {
//       return (
//         <TouchableOpacity
//           onPress={leftIcon.onPress}
//           style={styles.backButton}
//           accessible={true}
//           accessibilityLabel="Left Icon"
//         >
//           <Image source={leftIcon.source} style={styles.backIcon} />
//         </TouchableOpacity>
//       );
//     }

//     if (showBackButton) {
//       return (
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//           accessible={true}
//           accessibilityLabel="Go Back"
//         >
//           <Image
//             source={
//               backIcon
//                 ? backIcon
//                 : require('../assets/img/backcopy.png') // default
//             }
//             style={styles.backIcon}
//           />
//         </TouchableOpacity>
//       );
//     }

//     return <View style={{ width: 40 }} />;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         {renderLeftIcon()}

//         <View style={styles.titleWrapper}>
//           <Text style={styles.titleText}>{name}</Text>
//         </View>

//         {/* Invisible view to balance the left icon */}
//         <View style={styles.fakeSpace} >
//         <Text>jhhhh</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 8,
//     justifyContent: 'space-between',
//     position: 'relative',
//   },
//   backButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 40,
//     height: 40,
//   },
//   backIcon: {
//     height: 20,
//     width: 20,
//     tintColor: '#000',
//   },
//   titleWrapper: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//     zIndex: -1,
//   },
//   titleText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000',
//     textAlign: 'center',
//   },
//   fakeSpace: {
//     width: 40,
//     height: 40,
//   },
// });

// export default MainHeader;


import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Image } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

const MainHeader = ({
  name,
  showBackButton = true,
  backIcon,
  leftIcon,
  rightIcon, // NEW: right side icon
}) => {
  const navigation = useNavigation();

  const renderLeftIcon = () => {
    if (leftIcon && leftIcon.type === 'image' && leftIcon.source) {
      return (
        <TouchableOpacity
          onPress={leftIcon.onPress}
          style={styles.backButton}
          accessible={true}
          accessibilityLabel="Left Icon">
          <Image source={leftIcon.source} style={styles.backIcon} />
        </TouchableOpacity>
      );
    }

    if (showBackButton) {
      return (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessible={true}
          accessibilityLabel="Go Back">
          <Image
            source={
              backIcon
                ? backIcon
                : require('../assets/img/backcopy.png') // default
            }
            style={styles.backIcon}
          />
        </TouchableOpacity>
      );
    }

    return <View style={{ width: 40 }} />;
  };

  const renderRightIcon = () => {
    if (rightIcon && rightIcon.source) {
      return (
        <TouchableOpacity
          onPress={rightIcon.onPress}
          style={styles.rightIconWrapper}
          accessible={true}
          accessibilityLabel="Right Icon">
          <Image source={rightIcon.source} style={styles.rightIcon} />
        </TouchableOpacity>
      );
    }

    return <View style={styles.fakeSpace} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {renderLeftIcon()}

        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>{name}</Text>
        </View>

        {renderRightIcon()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    position: 'relative',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  backIcon: {
    height: 20,
    width: 20,
    tintColor: '#000',
  },
  rightIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  rightIcon: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
    tintColor: '#000',
  },
  titleWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: -1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  fakeSpace: {
    width: 40,
    height: 40,
  },
});

export default MainHeader;
