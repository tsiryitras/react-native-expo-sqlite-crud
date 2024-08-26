import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { User } from "../../services/user/user.model";
import { deleteUserById } from "../../services/user/user.service";

interface UserListProps {
  users: User[];
  onUpdate: (response: { id: string; name: string; age: string }) => void;
  onDelete: (response: { status: "OK" | "Error" }) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onUpdate, onDelete }) => {
  const handleDelete = async (id: string) => {
    const res = await deleteUserById(id);
    onDelete({ status: res.status });
  };
  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.row}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.age}</Text>
      <TouchableOpacity
        onPress={() =>
          onUpdate({
            id: item.id as any,
            name: item.name,
            age: item.age.toString(),
          })
        }
      >
        <Entypo name="edit" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDelete(item.id?.toString() as any)}
      >
        <FontAwesome5 name="trash" size={14} color="red" />
      </TouchableOpacity>
    </View>
  );
  if (users.length <= 0) {
    return (
      <View style={styles.row}>
        <Text>Aucun Données</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.id as any}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  text: {
    marginRight: 20,
    fontSize: 16,
  },
});

export default UserList;
