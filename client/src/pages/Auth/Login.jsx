import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/frontend/img/sonali-bank-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, setEmptyMessage } from "../../features/auth/authSlice";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import createToast from "../../utils/createToast";
import { userLogin } from "../../features/auth/authApiSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, error, message } = useSelector(authSelector);

  const { input, handleInputChange, formReset } = useForm({
    index: "",
    password: "",
  });

  const handleLoginForm = (e) => {
    e.preventDefault()
    dispatch(userLogin(input))
 

    // navigate("/account-activation-by-otp");
  };

 useEffect(() => {
  if (message) {
    // Display a success message only if there is a message
    createToast(message, "success"); // Display the success message
    dispatch(setEmptyMessage()); // Clear the message state
    dispatch(formReset); // Reset the form
    navigate('/dashboard'); // Redirect to the dashboard
  }
  if (error) {
    // Display an error message only if there is an error
    createToast(error); // Display the error message
    dispatch(setEmptyMessage()); // Clear the message state
  }
}, [message, error, dispatch, formReset, navigate]);

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={logo} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>User Login</h1>
                  <p className="account-subtitle">Access to DMS dashboard</p>
                  {/* Form */}
                <form onSubmit={handleLoginForm}>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Index"
                      name="index"
                      value={input.index}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={input.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-primary w-100"> {loader ?  'Checking...' : 'Login'}</button>
                  </div>
                  </form>
                  {/* /Form */}
                  <div className="text-center forgotpass">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </div>
                  <div className="login-or">
                    <span className="or-line" />
                    <span className="span-or">or</span>
                  </div>

                  <div className="text-center dont-have">
                    Don’t have an account? <Link to="/register">Register</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default Login;
