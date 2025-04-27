import { auth, onAuthStateChanged, doc, updateDoc, db,  } from "../../firebase.json"

var uid;
let userState;




// Update existing document

async function updateStudentInfo(userId) {

console.log("user id from auth", userId);


    console.log(uid, "uid") 
    console.log(userState, "user data")




    const updatedData = {
        name: document.getElementById("name").value,
        contact: document.getElementById("contact").value,
        email: document.getElementById("email").value,
       
    };

    try {

        const docRef = doc(db, "users", userId); 
        await updateDoc(docRef, updatedData);
        alert("Profile updated successfully!");
        console.log("updated doc", updatedData);



    } catch (error) {
        console.error("Error updating profile:", error);
    }
}

// //  get student academic info

// async function loadStudentInfo(uid) {
//     const docRef = doc(db, "users", uid);

//     try {
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//             const data = docSnap.data();
//             document.getElementById("name").value = data.name;
//             document.getElementById("username").value = data.username;
//             document.getElementById("email").value = data.email;
//             document.getElementById("rollNo").value = data.rollNo;
//             document.getElementById("year").value = data.year;
//             document.getElementById("religion").value = data.religion;
//             document.getElementById("bloodGroup").value = data.bloodGroup;
//         }
//         else {
//             console.log("No such document!");
//         }
//     }
//     catch (error) {
//         console.log("Error getting document:", error);
//     }
// }

onAuthStateChanged(auth, async (user) => {

    if (user) {
        try {

            uid = localStorage.getItem("uid");
            console.log(uid, "here is the uid");

            //calling updated func
            document.getElementById("savechanges")?.addEventListener("submit", (e) => {
                e.preventDefault()
                updateStudentInfo(uid)
            }); 

            // userState = await getUserData(user.uid);
            // await loadStudentInfo(user.uid);
            // console.log("all loaded!")
        }
        catch (e) {
            console.log(e)
        }

    } else {
        uid = null;
    }
})

// eventlisteners

