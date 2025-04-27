import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut, onAuthStateChanged,addDoc, collection,
    signInWithPopup, GoogleAuthProvider ,sendPasswordResetEmail,
    db
} from "../../fibase.config.js";
const auth = getAuth();


onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
        
        if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
            window.location.href = "/public/html/home.html";
        }
    } else {
        if (window.location.pathname.includes("home.html")) {
            window.location.href = "/index.html";
        }
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
          window.location.href = "/Task-Manager/public/html/home.html";
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
        alert("user login successfully")
        window.location.href = "/Task-Manager/public/html/home.html";
    } catch (error) {
        console.error(error);
    }
    console.log("clicked");
}
document.getElementById("loginn")?.addEventListener("click", login)

//google
const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" });

const google = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            if (user) {
                window.location.href = "/Task-Manager/public/html/home.html";
            }
        }).catch((error) => {
            console.error("error", error)
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

}
document.getElementById("google")?.addEventListener("click", google)


// forgotPass
const forgotPass = () => {
    const email = document.getElementById("Email").value
    sendPasswordResetEmail(auth, email)
    try {
        {
            console.log("email sent to the given email");
            alert("email sent to the given email");
        }
    }
    catch (error) {
        console.log("error", Error);

        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    };

    console.log("clicked");

}
document.getElementById("forgotPass")?.addEventListener("click", forgotPass)
// logOut

const logOut = () => {
    console.log("logout");
    signOut(auth).then(() => {
        console.log("logged Out Successfully");
        window.location.href = "/Task-Manager/index.html"

    }).catch((error) => {
        console.log(user);

    });

}
document.getElementById("logOut")?.addEventListener("click", logOut)
