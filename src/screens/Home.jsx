import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FloatActionButton from '../components/ui/FloatActionButton';
import {ADDTASKS} from '../utils/Routes';

const Home = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Text>Home</Text>
      <FloatActionButton onPress={() => navigation.navigate(ADDTASKS)} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
