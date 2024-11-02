import { useState } from "react";
import pp from "../../media/images/profilePicture.jpg";
import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillQuestionCircle,
} from "react-icons/ai";
import Footer from "../../components/footer/Footer";
import "./loginIndex.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const NewAccount = ({ windowRegistration }) => {
  return (
    <div className="newAccContainer">
      <div className="newAccWrapper">
        <div className="newAccHeaders">
          <span
            onClick={() => windowRegistration(false)}
            className="newAccXMark"
          >
            X
          </span>
          <h3>Sign Up</h3>
          <p>It’s quick and easy.</p>
        </div>
        <form className="newAccForm">
          <div className="newAccNames">
            <input
              type="text"
              className="newAccInputsNames"
              id="name"
              name="name"
              placeholder="First Name"
            />
            <input
              type="text"
              className="newAccInputsNames"
              id="lastname"
              name="lastname"
              placeholder="Last Name"
            />
          </div>
          <input
            type="email"
            className="newAccInputs"
            id="emailRegistration"
            name="email"
            placeholder="Mobile number or email"
          />
          <input
            type="password"
            className="newAccInputs"
            id="passwordRegistration"
            name="password"
            placeholder="New Password"
          />
          <span className="newAccOptions">
            Date of birth
            <AiFillQuestionCircle />
          </span>
          <div className="newAccBirthday">
            <select
              className="newAccFormSelection"
              id="day"
              name="birthdayDay"
              title="Day"
            >
              <option value="1">1</option>
            </select>
            <select
              className="newAccFormSelection"
              id="month"
              name="birthdayMonth"
              title="Month"
            >
              <option value="1">Aug</option>
            </select>
            <select
              className="newAccFormSelection"
              id="year"
              name="birthdayYear"
              title="Year"
            >
              <option value="1">2022</option>
            </select>
          </div>
          <span className="newAccOptions">Gender</span>
          <div className="newAccSexo">
            <span className="newAccSexoOptions">
              <label>Female</label>
              <input type="radio" name="gender" value="1" />
            </span>
            <span className="newAccSexoOptions">
              <label>Male</label>
              <input type="radio" name="gender" value="2" />
            </span>
            <span className="newAccSexoOptions">
              <label>Custom</label>
              <input type="radio" name="gender" value="3" />
            </span>
          </div>
          <p className="newAccLittleLetter">
            People using our service may have uploaded your contact information
            to Facebook. <span className="falseLinkAzul">Learn more.</span>
            <br />
            <br />
            By clicking "Sign Up," you agree to our{" "}
            <span className="falseLinkAzul">Terms</span>,{" "}
            <span className="falseLinkAzul">Privacy Policy</span>, and{" "}
            <span className="falseLinkAzul">Cookies Policy</span>. You may
            receive SMS notifications, which you can turn off at any time.
          </p>
          <button className="loginFormBtnSession2">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

const RecentLogins = ({ manageLogins }) => {
  return (
    <div className="loginRecientes">
      <h1>Facebook Clone</h1>
      <h2>Recent Logins</h2>
      <p>Click on your photo or add an account.</p>
      <div className="loginRecientesCardsContainers">
        <div className="loginRecientesCard">
          <span className="loginNotif">72</span>
          <AiFillCloseCircle
            onClick={() => manageLogins(false)}
            className="loginX"
          />
          <img src={pp} className="loginPicture" alt="Profile" />
          <p className="loginUsername">Khaldi</p>
        </div>

        <div className="loginRecientesCard">
          {/* <img src={pp} className='loginPicture' alt='Profile' /> */}
          <AiFillPlusCircle className="loginPlus" />
          <p className="loginUsername azul">Add Account</p>
        </div>
      </div>
    </div>
  );
};

const LoginIndex = () => {
  const [recientes, setRecientes] = useState(true);
  const [registration, setRegistration] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Handle username text change
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Handle password text change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handle login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        import.meta.env.VITE_APP_URL_BASE + "/auth/signin",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setSnackbarMessage(json.message);
        setSnackbarOpen(true);
        setLoading(false);
      } else {
        // Save the user in local storage
        localStorage.setItem("user", JSON.stringify(json));
        // Update the auth context
        dispatch({ type: "LOGIN", payload: json });
        setLoading(false);
      }
    } catch (error) {
      setSnackbarMessage("An error occurred. Please try again later.");
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div className="loginContenedor">
        {recientes ? (
          <RecentLogins manageLogins={setRecientes} />
        ) : (
          <div className="loginText">
            <h1>Facebook Clone</h1>
            <p>
              Facebook helps you connect and share with the people in your life.
            </p>
          </div>
        )}
        <div className="loginRight">
          {registration && <NewAccount windowRegistration={setRegistration} />}
          <div className="loginFormContainer">
            <form className="loginForm">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Email or phone number"
                onChange={handleUsernameChange}
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
              <input
                type="button"
                className="loginFormBtnSession"
                value="Log In"
                onClick={handleLoginSubmit}
              />
              <a>Forgot your password?</a>
            </form>
            <button
              onClick={() => setRegistration(false)}
              className="loginFormBtnSession2"
            >
              Create new account
            </button>
          </div>
          <p>
            <a>Create a Page</a>
            for a celebrity, brand, or business.
          </p>
        </div>
      </div>
      <Footer type="long" />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginIndex;
