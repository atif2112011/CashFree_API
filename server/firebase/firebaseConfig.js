const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");

const {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
} = require("@firebase/firestore");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK2gtQfdg2rOsFI4IclMrsPFNWnOgAMLQ",
  authDomain: "fir-frontend-8cae2.firebaseapp.com",
  projectId: "fir-frontend-8cae2",
  storageBucket: "fir-frontend-8cae2.appspot.com",
  messagingSenderId: "216896488992",
  appId: "1:216896488992:web:5c7ee4c13159c3056a1e45",
  measurementId: "G-Z0BR0XVBHW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//For firestore db
const database = getFirestore(app);

const storage = getStorage(app);

const CollectionRef = collection(database, "users");

//Gets All documents from the collection
const GetAllData = async () => {
  try {
    const response = await getDocs(CollectionRef);
    const data = response.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));
    return data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

//Get data using id
const GetData = async (id) => {
  const docRef = doc(database, "users", id);

  try {
    const response = await getDoc(docRef);
    if (response.exists()) return response.data();
    else throw new Error("No such document");
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

//Write New Data
const WriteData = async (data, id) => {
  try {
    const response = await setDoc(doc(CollectionRef, id), data);

    console.log("Data written Successfully");
  } catch (err) {
    console.log(err.message);
  }
};

//Delete Docs
const DeleteData = async (id) => {
  const docRef = doc(database, "users", id);
  try {
    const response = await deleteDoc(docRef);

    console.log(`Data with id ${id} deleted`);
  } catch (error) {
    console.log(err.message);
  }
};

module.exports = { GetAllData, GetData, WriteData, DeleteData };
