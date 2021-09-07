import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    
    const data:Task = {
    
      id: new Date().getTime(),
      done:false,
      title:newTaskTitle

    };

    if(newTaskTitle !== ''){
      setTasks([...tasks,data]);
    }

    
  }

  function handleToggleTaskDone(id: number) {
    const tasksClone = [...tasks];

    const findIndexTask = tasks.findIndex(task => task.id === id);
  
    if(findIndexTask >= 0) {
      
      tasksClone[findIndexTask].done = !tasksClone[findIndexTask].done;
      setTasks(tasksClone);

    }
  }

  function handleRemoveTask(id: number) {
    const tasksClone = [...tasks];
    

    const findIndexTask = tasks.findIndex(task => task.id === id);

   
    if(findIndexTask >= 0) {
      
      tasksClone.splice(findIndexTask,1);
      setTasks(tasksClone);

    }
   
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})