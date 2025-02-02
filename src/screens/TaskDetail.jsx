import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Divider, Button} from '@ui-kitten/components';
import moment from 'moment';
import {setCategory} from '../utils/SetCategories';
import {status, taskValues} from '../utils/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
 

const TaskDetail = ({route}) => {
  const navigation = useNavigation();
  const {item} = route?.params;
  const deleteTask = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks === null) {
        return;
      }
      const tasks = JSON.parse(savedTasks);
      const fiteredTasks = tasks.filter(task => task.id !== item.id);
      await AsyncStorage.setItem('tasks', JSON.stringify(fiteredTasks));
      navigation.goBack();
    } catch (error) {}
  };
  const updateTask = async newStatus => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks === null) {
        return;
      }
      const tasks = JSON.parse(savedTasks);
      const updatedTask = tasks.map(task => {
        if (task.id === item.id) {
          return {
            ...task,
            status: newStatus,
          };
        }
        return task;
      });
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTask));
      navigation.goBack();
    } catch (error) {}
  };
  return (
    <View style={{flex: 1, padding: 20}}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Title:</Text>
          <Text>{item.title}</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Description:</Text>
          <Text>{item.description}</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Start Date:</Text>
          <Text>{moment(item.startDate).format('YYYY/MM/DD')}</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>End Date:</Text>
          <Text> {moment(item.endDate).format('YYYY/MM/DD')}</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Category:</Text>
          <Text>{setCategory(item.category)}</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Status:</Text>
          <Text>
            {taskValues.find(task => task.status === item?.status)?.title}
          </Text>
        </View>
        <Divider />
      </ScrollView>
      <View>
        <Button
          onPress={() => updateTask(status.PENDING)}
          style={styles.button}
          status="primary">
          START
        </Button>
        <Button
          onPress={() => updateTask(status.COMPLETED)}
          style={styles.button}
          status="success">
          COMPLATED
        </Button>
        <Button
          onPress={() => updateTask(status.CANCEL)}
          style={styles.button}
          status="danger">
          CANCEL
        </Button>
        <Button onPress={deleteTask} style={styles.button} status="warning">
          DELETE
        </Button>
      </View>
    </View>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
  },
});
