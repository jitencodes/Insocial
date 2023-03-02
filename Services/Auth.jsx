import {auth, db, provider} from "../firebase";

export const signInWithGoogle = async () => {
    let user;
    await auth.signInWithPopup(provider)
        .then((auth) => {
            db.collection('users').doc(auth.user.uid).set({
                uid: auth.user.uid,
                displayName: auth.user.displayName,
                email: auth.user.email,
                photoURL: auth.user.photoURL,
            })
            console.log(auth.user);
            user = auth.user;
        })
        .catch((error) => {
            console.log(error.message);
        });
        
        return user;

};

export const logout = async () => {
    let logout_sucess;
    await auth.signOut().then(() => {
        logout_sucess = true;
    }).catch((error) => {
        console.log(error.message);
    });

    return logout_sucess;
}