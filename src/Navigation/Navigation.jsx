import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut } from "../redux/auth/operations";
import { selectIsLoggedIn, selectUser } from "../redux/auth/selectors";
import css from "./Navigation.module.css";

export default function Navigation() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleLogOut = () => {
    dispatch(logOut());
    console.log("Logout clicked");
  };

  return (
    <div className={css.container}>
      <div className={css.navLinks}>
        <NavLink
          to="/"
          className={(params) => `${css.link} ${params.isActive && css.active}`}
        >
          Home
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink
              to="/contacts"
              className={(params) => `${css.link} ${params.isActive && css.active}`}
            >
              Contacts
            </NavLink>
            <div className={css.userInfo}>
              <h3 className={css.welcome}>Welcome, {user.name}</h3>
              <button
                type="button"
                onClick={handleLogOut}
                className={css.logoutBtn}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <NavLink
              to="/registration"
              className={(params) => `${css.link} ${params.isActive && css.active}`}
            >
              Registration
            </NavLink>
            <NavLink
              to="/login"
              className={(params) => `${css.link} ${params.isActive && css.active}`}
            >
              LogIn
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}
