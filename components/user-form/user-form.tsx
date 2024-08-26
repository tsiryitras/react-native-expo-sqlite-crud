import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import {
  createNewUser,
  updateUserById,
} from "../../services/user/user.service";

interface UserFormProps {
  values?: { id: string; name: string; age: string };
  onSubmit: (response: FormResponse) => void;
}

const UserForm: React.FC<UserFormProps> = ({ values, onSubmit }) => {
  // User form State
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");

  // Form state
  const [isFormUpdate, setIsFormUpdate] = useState<boolean>(false);

  const handleReset = () => {
    setName("");
    setAge("");
    setIsFormUpdate(false);
  };

  const handleSubmit = async () => {
    await createNewUser({ name: name, age: Number(age) });
    handleReset();
    onSubmit({ status: "OK", message: "User créer" });
  };

  const handleUpdate = async (id: string) => {
    await updateUserById(id, { name: name, age: Number(age) });
    handleReset();
    onSubmit({ status: "OK", message: "User créer" });
  };

  useEffect(() => {
    if (values) {
      setName(values.name);
      setAge(String(values.age));
      setIsFormUpdate(true);
    }
  }, [values]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom:</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre nom"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <View style={styles.btnContainer}>
        <Button
          title={isFormUpdate ? "Modifier" : "Ajouter "}
          onPress={() =>
            isFormUpdate ? handleUpdate(values?.id as any) : handleSubmit()
          }
        />
        <Button title={"Annuler"} onPress={handleReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default UserForm;
