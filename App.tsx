import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { getAll, initTable, insertData } from "./utils/sqlite.utils";
import { getAllUsers } from "./services/user/user.service";
import UserAddForm from "./components/user-form/user-form";
import { CreateUserDto, User } from "./services/user/user.model";
import Entypo from "@expo/vector-icons/Entypo";
import UserList from "./components/user-list/user-list";

export default function App() {
  // Page State
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // User State
  const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState<User>();
  /**
   * Get all data
   */
  const loadUserData = async () => {
    const usersData = await getAllUsers();
    setUsers(usersData);
    setIsLoading(false);
  };

  /**
   * On Submit Data
   * @param res
   */
  const onSubmit = async (res: FormResponse) => {
    if (res.status === "OK") loadUserData();
  };

  const onUpdate = (res: { id: string; name: string; age: string }) => {
    setUser({ id: res.id, name: res.name, age: Number(res.age) });
  };

  const onDelete = (res: FormResponse) => {
    if (res.status === "OK") loadUserData();
  };

  useEffect(() => {
    loadUserData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <UserList users={users} onUpdate={onUpdate} onDelete={onDelete} />
        <UserAddForm values={user as any} onSubmit={onSubmit} />
        <StatusBar style="dark" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
});
