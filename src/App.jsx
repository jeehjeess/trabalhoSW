import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function App() {

  const { loginWithPopup,
    loginWithRedirect,
    logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  function chamarAPI() {
    axios.get("http://localhost:4000/")
      .then(response => console.log(response.data))
      .catch(error => console.log(error.message));

  }
  async function chamarAPIProtegida() {
    try {
      const token = await getAccessTokenSilently();
      //console.log(token);
      const response = await axios.get('http://localhost:4000/protected', {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
  }

    return (
      <div>
        <h1>Login com Auth0</h1>
        <ul>
          <li>
            <button onClick={loginWithPopup}>Login Com PopUp</button>

          </li>
          <li>
            <button onClick={loginWithRedirect}>Login Com Redirecionamento</button>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>

        <h3>Usuário {isAuthenticated ? "está logado!" : "não está logado!"}</h3>

        <ul>
          <li>
            <button onClick={chamarAPI}>Chamar Api</button>
          </li>
          <li>
            <button onClick={chamarAPIProtegida}>Chamar Api com Rota Protegida</button>
          </li>
        </ul>
        {
          isAuthenticated && (
            <pre style={{ textAlign: 'start' }}>{JSON.stringify(user, null, 2)}</pre>
          )
        }

      </div>
    );
  }


  export default App;

