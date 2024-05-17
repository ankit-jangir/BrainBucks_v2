// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  MainView: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  TouchImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    borderWidth: 1,
    borderRadius: 100,
    width: 50,
    height: 50,
    borderColor: 'rgba(71, 71, 71, 0.06)',
  },
  SearchBar: {
    flex: 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: 'rgba(71, 71, 71, 0.06)',
    borderWidth: 1,
    borderRadius: 5,
    height: 45,
    marginHorizontal:10
  },
  TextSearch: {
    color: 'rgba(126, 126, 126, 1)',
    fontSize: 16,
    flex: 0.8,
    fontFamily: 'WorkSans-Regular',
  },
  ShareView: {
    flex: 0.1,
    justifyContent: 'center',
    padding: 4,
    marginLeft: 0,
  },
  BellView: {
    flex: 0.2,
    justifyContent: 'center',
    padding: 4,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  carouselText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 5,
  },

// sider

  
});

export default styles;
