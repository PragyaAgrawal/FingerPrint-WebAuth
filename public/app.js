import React, { useEffect, useState } from "react";
import './app.style.css';
import { registerCredential } from "./client";
import { base64url } from "./base64url";

const App = (props) => {
  const [credential, setCredential] = useState({});
  useEffect(() => {
    const getCreds = async () => {
      if (Object.keys(credential).length) {
        const options = { ...credential };
        options.challenge = base64url.decode(credential.challenge);
        options.user = {
          ...options.user,
          id: base64url.decode(credential.user.id),
        };

        const cred = await navigator.credentials.create({
          publicKey: options,
        });
        console.log(cred, "cred");
      }
    };
    getCreds();
  }, [credential]);

  const registerPrint = () => {
    registerCredential().then((response) => {
      setCredential(response);
    });
  };

  return (
    <div>
      <button className="finger-btn" onClick={registerPrint}>Finger print</button>
    </div>
  );
};

export default App;
