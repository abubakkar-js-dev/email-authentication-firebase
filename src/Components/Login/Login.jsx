import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import auth from "../../firebase.init";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    //  reset success and error message

    setSuccess(false);
    setErrorMessage("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        if (!result.user.emailVerified) {
          setErrorMessage("Please verify your email address.");
        } else {
          setSuccess(true);
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  const handleResetPassword = () => {
    const email = emailRef.current.value;
    sendPasswordResetEmail(auth,email)
    .then(()=>{
        alert('Succesfully sent email verification')
    })
    .catch((err)=>{
        alert(err.message)
    })
  }

  return (
    <div className="card bg-gradient-to-tr from-purple-100 to-gray-100 w-full max-w-screen-sm mx-auto mt-24 shrink-0 shadow-2xl py-8">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            ref={emailRef}
            type="email"
            placeholder="email"
            name="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <label onClick={handleResetPassword} className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-accent  text-white">Login</button>
        </div>

        <div>
          {success && (
            <label className="label">
              <span className="label-text text-green-500">
                Login succesfully done.
              </span>
            </label>
          )}
          {errorMessage && (
            <label className="label">
              <span className="label-text text-red-500">{errorMessage}</span>
            </label>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
