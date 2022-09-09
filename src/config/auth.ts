import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  // sendPasswordResetEmail,
  // updatePassword,
} from "./firebase-config";

// Sign Up
export const doCreateUserWithEmailAndPassword = (
  email: string,
  password: string
) => {
  createUserWithEmailAndPassword(auth, email, password);
};

// Sign In
export const doSignInWithEmailAndPassword = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

// Sign out
export const doSignOut = () => auth.signOut();

// Password Reset
// export const doPasswordReset = (email: string) =>
//   sendPasswordResetEmail(auth, email);

// Password Change
// export const doPasswordUpdate = (password: string) =>
//   currentUser.updatePassword(auth, password);
