import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut, onAuthStateChanged,addDoc, collection,
    db
} from "../../fibase.config.js";
const auth = getAuth();


onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("user====>", user);
        const uid = user.uid;
    } else {
        // User is signed out
        // ...
    }
});

// siginUp
const register = async () => {
    // e.preventdefault()
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;


    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential.user);
        const docRef = await addDoc(collection(db, "users"), {
            email,
            name,
            contact
          });
          console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error(error);
    }
}

document.getElementById("register")?.addEventListener("click", register)


// login
const login = async () => {
    // e.preventdefault()
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;
    console.log(email, password)
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("user login successfully", userCredential.user);
        window.location.pathname = "./index.html"
    } catch (error) {
        console.error(error);
    }
    console.log("clicked");
}
document.getElementById("loginn")?.addEventListener("click", login)
// logOut

const logOut = () => {
    console.log("logout");
    signOut(auth).then(() => {
        console.log("logged Out Successfully");
        window.location.pathname = "./public/html/loginSignup.html"

    }).catch((error) => {
        console.log(user);

    });

}
document.getElementById("logOut")?.addEventListener("click", logOut)
