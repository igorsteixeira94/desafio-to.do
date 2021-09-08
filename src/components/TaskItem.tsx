import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ItemWrapper } from './ItemWrapper';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/pen/pen.png'

import { IEditTask } from './TasksList';
import Icon from 'react-native-vector-icons/Feather';

interface ITaskItemProps {
  index: number;
  item:{
    id:number;
    title: string;
    done: boolean;
  };
  toggleTaskDone: (id:number) => void;
  removeTask: (id:number) => void;
  editTask: ({id,taskNewTitle}:IEditTask) => void;
}

const TaskItem = ({index,item, toggleTaskDone,removeTask,editTask}:ITaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  
  const textInputRef = useRef<TextInput>(null);

  const handleStartEditing = useCallback(()=>{
    setIsEditing(true);
  },[]);

  const handleSubmitEditing = useCallback((task_id:number)=>{
    
    editTask({id:task_id,taskNewTitle:newTitle});
    setIsEditing(false);

  },[newTitle]);

  const handleCancelEditing = useCallback(()=>{
    setIsEditing(false);
    setNewTitle(item.title);
  },[])

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return (
    <ItemWrapper index={index}>
      <View>

        <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={()=>{toggleTaskDone(item.id)}}
        >
          <View
          testID={`marker-${index}`}
          style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            </View>
            <TextInput
              style={item.done ? styles.taskTextDone : styles.taskText}
              value={newTitle}
              onChangeText={setNewTitle}
              ref={textInputRef}
              editable={isEditing}
              returnKeyType="send"
              onSubmitEditing={()=>handleSubmitEditing(item.id)}
            />
         </TouchableOpacity>
        </View>

        <View style={ styles.iconsContainer } >
          { isEditing ? (
            <TouchableOpacity
              
              onPress={handleCancelEditing}
            >
              <Icon name="x" size={24} color="#b2b2b2" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              
              onPress={handleStartEditing}
            >
              <Image source={editIcon} />
            </TouchableOpacity>
          ) }

          <View style={{width:1,backgroundColor:'#C4C4C4',marginHorizontal:20}}/>

           <TouchableOpacity
            disabled={isEditing}
            onPress={() => Alert.alert(
              'Remover item',
              'Tem certeza que você deseja remover esse item?',
              [{text:'Não', onPress:()=>{}},{text:'Sim',onPress:()=> removeTask(item.id)}]
            )}
            style={{marginRight:20}}
          >
            <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
          </TouchableOpacity>
        </View>
    </ItemWrapper>
);

}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer:{
    flexDirection:'row',
  },

})

export default TaskItem;