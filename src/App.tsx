import { useEffect, useState } from 'react';
import './App.css'
import {app} from './config/firebase'
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged, User } from 'firebase/auth';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    // Maneja el resultado de la redirección
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // Usuario ha iniciado sesión correctamente después de la redirección
          setUser(result.user);
        }
      })
      .catch((error) => {
        console.error("Error después de la redirección:", error);
      });

    // Escucha cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log({auth, currentUser})
      setUser(currentUser);
    }, (error) => console.log({error}));

    // Limpieza al desmontar
    return () => unsubscribe();
  }, [])

  const signIn = () => {
    signInWithRedirect(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <>
    <div>
      {user ? (
        <div>
          <h1>Bienvenido, {user.displayName}</h1>
          <img src={user.photoURL || ""} alt="Foto de perfil" />
          <button onClick={signOut}>Cerrar sesión</button>
        </div>
      ) : (
        <button onClick={signIn}>Iniciar sesión con Google</button>
      )}
    </div>
    </>
  )
}

export default App
