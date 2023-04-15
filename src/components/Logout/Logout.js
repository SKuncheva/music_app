import { useContext, useEffect } from "react";
import { UserAuthenticate } from "../../context/context";
import { useNavigate } from "react-router-dom";
import * as authService from '../../services/authenticationService'

export const Logout = () => {
  const { onLogout, authenticate } = useContext(UserAuthenticate);
  const navigate = useNavigate();

  useEffect(() => {
    authService.logout(authenticate.accessToken)
        .then(() => {
          onLogout();
            navigate('/');
        })
        .catch(() => {
            navigate('/');
        });
},[onLogout]);

return null;
}
