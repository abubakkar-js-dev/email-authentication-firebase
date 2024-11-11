import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import auth from "../../firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleVisiblePass = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;

    console.log(terms);

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>?,./]).{6,}$/;

    // clean the error message and success
    setErrorMessage("");
    setSuccess(false);

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password should be atlease one uppercase, one lowercase,one number, and minimub 6 character."
      );
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password should be atlease 6 character.");
      return;
    }

    if(!terms){
        setErrorMessage('Please accept our terms and condition.');
        return;
    }

    // create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        setSuccess(true);

        //  send email verification
        sendEmailVerification(auth.currentUser)
        .then(() =>{
            console.log('Email verification send')
        })
      })
      .catch((err) => {
        const errorMessage = err.message;
        setErrorMessage(errorMessage);
        setSuccess(false);
      });
  };
  return (
    <div className="hero bg-base-200 container mt-24 rounded-3xl p-8">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative flex justify-center items-center">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered w-full"
                  required
                />
                <button
                  onClick={handleVisiblePass}
                  className="absolute right-4 px-2 py-1 bg-gray-100 rounded-3xl "
                >
                  {passwordVisible ? (
                    <FaEyeSlash></FaEyeSlash>
                  ) : (
                    <FaEye></FaEye>
                  )}
                </button>
              </div>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              <div className="form-control">
                <label className="label justify-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="terms"
                    className="checkbox checkbox-primary"
                    
                  />
                  <span className="label-text ml-3">Accept our terms and condition.</span>
                </label>
              </div>
              {errorMessage && (
                <label className="label text-red-500">
                  <p>{errorMessage}</p>
                </label>
              )}
              {success && (
                <label className="label text-green-500">
                  <p>Sign Up succesfully complete.</p>
                </label>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
