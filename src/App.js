import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.inittialize';

const provider = new GoogleAuthProvider();

initializeAuthentication()
const auth = getAuth();
function App() {
  const [user, setUser] = useState({})
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const [name, setName] = useState('')
  const handleGoogleSign = () => {

    signInWithPopup(auth, provider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loginUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(loginUser)

      })
      .catch(error => {
        console.log(error.message9)
      })
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleNameChange = e => {
    setName(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleReistration = (e) => {
    e.preventDefault()
    console.log(email, password)
    if (password.length < 6) {
      setError('password must be at least 6 characters log .')
      return;
    }
    // if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password)) {
    //   setError('password contain two uper and other case')
    //   return;
    // }
    isLogin ? processLogin(email, password) : createNewUser(password, email)


  }
  const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        setError('')
      })
      .catch(error => {
        setError(error.message)
      })
  }
  const toggleLogin = (e) => {
    setIsLogin(e.target.checked)
  }
  const createNewUser = (password, email) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user
        console.log(user)
        emailVerify();
        setUserName()
      })
      .catch(error => {
        setError(error.message9)
      })
  }

  const emailVerify = () => {
    sendEmailVerification(auth.currentUser)
      .then(result => {

      })
  }
  const setUserName = () => {
    updateProfile(auth.currentUser, { displayName: name })
      .then(result => {

      })
  }
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(result => {

      })
  }

  return (
    <div className="mx-5 mt-5">
      <form onSubmit={handleReistration}>
        <h1 className="text-primary">Please {isLogin ? 'Login' : 'Reister'}</h1>
        {!isLogin && <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">Name</label>
          <input onBlur={handleNameChange} type="text" className="form-control" id="inputAddress" placeholder="Enter your name" />
        </div>
        }
        <div className="row mb-3">
          <label htmlhtmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input onBlur={handleEmail} type="email" className="form-control" id="inputEmail3" required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlhtmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" onBlur={handlePassword} className="form-control" id="inputPassword3" required />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlhtmlFor="gridCheck1">
                Alredy Reistered
              </label>
            </div>
          </div>
        </div>
        <div className="row mb-3 text-danger">{error}</div>
        <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : "Reister"}</button>
        <button onClick={handleResetPassword} type="button" className="btn btn-secondary btn-sm">Reset Password</button>
      </form>

    </div>
  );
}

export default App;

/*


<button onClick={handleGoogleSign}>Google sign in</button>
      <hr />
      {
        user.email && <div>
          <h2>wellcome {user.name}</h2>
          <h5>I know your email address : {user.email}</h5>
          <img src={user.photo} alt="" />
        </div>
      }


*/