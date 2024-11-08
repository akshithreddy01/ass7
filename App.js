import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Animated } from 'react-native';
import Task from './components/Task';

const ToDoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState('Medium');
  const [filterPriority, setFilterPriority] = useState(null);
  const fadeAnim = new Animated.Value(1);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false, priority }]);
      setTask('');
    }
  };

  const removeTask = (id) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTasks(tasks.filter((item) => item.id !== id));
    });
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const renderTask = ({ item }) => (
    <Task
      item={item}
      fadeAnim={fadeAnim}
      toggleComplete={toggleComplete}
      removeTask={removeTask}
      backgroundColor={
        item.priority === 'High' ? '#FF6F61' : item.priority === 'Medium' ? '#FFEB3B' : '#64B5F6'
      }
    />
  );

  const filteredTasks = filterPriority
    ? tasks.filter((task) => task.priority === filterPriority)
    : tasks;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Set Task Priority</Text>
      <View style={styles.priorityWrapper}>
        <TouchableOpacity
          style={[
            styles.priorityButton,
            priority === 'High' && styles.activePriorityButton,
          ]}
          onPress={() => setPriority('High')}
        >
          <Text style={styles.priorityText}>High</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.priorityButton,
            priority === 'Medium' && styles.activePriorityButton,
          ]}
          onPress={() => setPriority('Medium')}
        >
          <Text style={styles.priorityText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.priorityButton,
            priority === 'Low' && styles.activePriorityButton,
          ]}
          onPress={() => setPriority('Low')}
        >
          <Text style={styles.priorityText}>Low</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Filter by Priority</Text>
      <View style={styles.filterWrapper}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterPriority(null)}
        >
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterPriority('High')}
        >
          <Text style={styles.filterButtonText}>High</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterPriority('Medium')}
        >
          <Text style={styles.filterButtonText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterPriority('Low')}
        >
          <Text style={styles.filterButtonText}>Low</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0277BD',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#BBDEFB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 18,
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#64B5F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0277BD',
    marginBottom: 10,
    marginTop: 20,
  },
  priorityWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  priorityButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#BBDEFB',
  },
  activePriorityButton: {
    backgroundColor: '#64B5F6',
  },
  priorityText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  filterWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#BBDEFB',
  },
  filterButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ToDoApp;
