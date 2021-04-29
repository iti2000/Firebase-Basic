// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBKfR7V_J0NpMaQy-I4qgi6XOV8m5x_5rQ",
    authDomain: "firestore-basic-70c0f.firebaseapp.com",
    projectId: "firestore-basic-70c0f",
    storageBucket: "firestore-basic-70c0f.appspot.com",
    messagingSenderId: "205020434806",
    appId: "1:205020434806:web:f5bc66197b2ef10d87aa57",
    measurementId: "G-49Q149QF8H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//variable for program
const db = firebase.firestore()
const inputData = document.querySelector('#data')
const orederedList = document.querySelector('#showData')
const inputSearch = document.querySelector('#search')
var list = []

//functions

addData = () => {
    var id = Date.now()
    var data = inputData.value

    // Add a new document with a generated id.
    db.collection("Basic").doc(id.toString()).set({ id, data })
        .then((docRef) => {
            console.log("Sucess.....");
            inputData.value = ""
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

}
loadData = () => {

    db.collection("Basic").get()
        .then((docs) => {
            list = []
            orederedList.innerHTML = ""
            docs.forEach(element => {
                list.push(element.data())
            });
            list.forEach((element) => {
                orederedList.innerHTML += '<li>' + '<button onclick="deleteData(' + element.id + ')">Delete</button> &nbsp' + element.data + '</li>'
            })
        })

}
searchData = () => {
    var list2 = []
    var str = inputSearch.value
    list.forEach(ele => {
        if (ele.data.toLowerCase().includes(str.toLowerCase())) {
            list2.push(ele)
        }
    });
    orederedList.innerHTML = ""
    list2.forEach((element) => {
        orederedList.innerHTML += '<li>' + '<button onclick="deleteData(' + element.id + ')">Delete</button> &nbsp' + element.data + '</li>'
    })
    inputSearch.value = ""
}

clearSearch = () => {
    orederedList.innerHTML = ""
    list.forEach((element) => {
        orederedList.innerHTML += '<li>' + '<button onclick="deleteData(' + element.id + ')">Delete</button> &nbsp' + element.data + '</li>'
    })
}

deleteData = (id) => {
    db.collection("Basic").doc(id.toString()).delete()
    .then(()=>{
        loadData()
    })

}

// realTimeUpdate=()=>{
//     db.collection('Basic').onSnapshot((docs)=>{
//         list =[]
//         orederedList.innerHTML = ""
//             docs.forEach(element => {
//                 list.push(element.data())
//             });
//             list.forEach((element) => {
//                 orederedList.innerHTML += '<li>' + '<button onclick="deleteData(' + element.id + ')">Delete</button> &nbsp' + element.data + '</li>'
        
//         });
//     })
// }
// realTimeUpdate()