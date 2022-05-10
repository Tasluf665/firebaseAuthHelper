import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";

export async function GoogleSignIn(firebaseApp, androidClientId, scopes = []) {
  const auth = getAuth(firebaseApp);

  async function onSignIn(googleUser) {
    const credential = GoogleAuthProvider.credential(
      googleUser.id_token,
      googleUser.accessToken
    );

    try {
      const authResult = await signInWithCredential(auth, credential);
      return authResult;
    } catch (error) {
      console.log(error.message);
    }
  }

  try {
    const result = await Google.logInAsync({
      androidClientId: androidClientId,
      scopes: scopes.length == 0 ? ["profile", "email"] : scopes,
    });

    if (result.type === "success") {
      return await onSignIn(result);
    } else {
      console.log("Permission Denied");
    }
  } catch (err) {
    console.log(err);
  }
}
