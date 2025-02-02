import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FloatActionButton from '../components/ui/FloatActionButton';
import {ADDTASKS} from '../utils/Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskCard from '../components/home/TaskCard';
import HeaderComponent from '../components/home/HeaderComponent';
import {Button} from '@ui-kitten/components';

const Home = ({navigation}) => {
  const [tasks, setTasks] = useState([]);
  const [ongoing, setOngoing] = useState(0);
  const [pending, setPending] = useState(0);
  const [complated, setComplated] = useState(0);
  const [cancel, setCancel] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const getTask = async () => {
    try {
      const savedtask = await AsyncStorage.getItem('tasks');
      setTasks(JSON.parse(savedtask));
      let complatedCount = 0;
      let pendingCount = 0;
      let ongoingCount = 0;
      let cancelCount = 0;
      for (const task of JSON.parse(savedtask)) {
        if (task.status === 1) {
          ongoingCount++;
        }
        if (task.status === 2) {
          pendingCount++;
        }
        if (task.status === 3) {
          complatedCount++;
        }
        if (task.status === 4) {
          cancelCount++;
        }

        setOngoing(ongoingCount);
        setPending(pendingCount);
        setComplated(complatedCount);
        setCancel(cancelCount);
      }
      console.log('başarılı');
    } catch (error) {
      console.log(error);
    }
  };
  onRefresh = () => {
    setRefreshing(true);
    getTask();
    setRefreshing(false);
  };
  useEffect(() => {
    getTask();
  }, []);
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={tasks}
        ListHeaderComponent={
          <HeaderComponent
            ongoing={ongoing}
            pending={pending}
            complated={complated}
            cancel={cancel}
          />
        }
        renderItem={({item}) => <TaskCard item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <FloatActionButton onPress={() => navigation.navigate(ADDTASKS)} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
