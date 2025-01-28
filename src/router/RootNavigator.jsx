import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ADDTASKS, TASKDETAIL, TASKS} from '../utils/Routes';
import Home from '../screens/Home';
import AddTask from '../screens/AddTask';
import TaskDetail from '../screens/TaskDetail';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={TASKS} component={Home} />
      <Stack.Screen name={ADDTASKS} component={AddTask} />
      <Stack.Screen name={TASKDETAIL} component={TaskDetail} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
