import axios from "axios";
import { AsyncStorage } from "react-native";
const url = "http://13.59.69.191/";
const api = axios.create({
  baseURL: url,
  headers: { authorization: "" }
});
const getToken = async () => {
  const token = await AsyncStorage.getItem("uflixToken");
  return JSON.parse(token);
};
const setToken = async token => {
  await AsyncStorage.setItem("uflixToken", JSON.stringify(token));
};
const setUser = async user => {
  await AsyncStorage.setItem("uflixUser", JSON.stringify(user));
};
const getUser = async () => {
  const user = await AsyncStorage.getItem("uflixUser");
  return JSON.parse(user);
};
const removeToken = async () => {
  await AsyncStorage.removeItem("uflixToken");
};
const removeUser = async () => {
  await AsyncStorage.removeItem("uflixUser");
};
const logout = async () => {
  await removeToken();
  await removeUser();
};

const catagories = [
  "Action",
  "Adventure",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Historical",
  "Historical fiction",
  "Horror",
  "Magical realism",
  "Mystery",
  "Paranoid Fiction",
  "Philosophical",
  "Political",
  "Romance",
  "Saga",
  "Satire",
  "Science Fiction",
  "Social",
  "Speculative",
  "Thriller",
  "Urban",
  "Western",
  "Animation"
];
export {
  api,
  getToken,
  getUser,
  setToken,
  setUser,
  removeToken,
  removeUser,
  logout,
  url,
  catagories
};
