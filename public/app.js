import React, { useEffect, useState } from "react";
import './app.style.css';
import { registerCredential } from "./client";
import { base64url } from "./base64url";

const App = (props) => {
  const [credential, setCredential] = useState({});
  const response = {
    "challenge": "Bearer eyJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiYWxnIjoiZGlyIn0..RrjD9y2LIh7TT3N-aIgBhg.BOG6VZgJ8tl1t7J_C09uawHNEHpEAcAhoBzsMB1yuKMYNt4si9sRVBeMYfAH6k0QF03iok9uiPHDKfo3yM0aV28mrDyBOhkc1iJPQCdi5tvV78SNconD6M_bgOgkdB6PI7bJLLIpZAKXhDuRHyolxyiVylwb-8JZSU9eHE0gpCvNVu0JvrAqaF9tyg8TiOPq.0y8DEsf1l1kZ33b0SHPzAx0bMU7PP4qHSpOvFA0SgAk",
    "rp": {
      "name": "SimpleWebAuthn Example",
      "id": "localhost"
    },
    "user": {
      "id": "1232",
      "name": "PragyaA",
      "displayName": "PragyaA"
    },
    "pubKeyCredParams": [
      {
        "alg": -8,
        "type": "public-key"
      },
      {
        "alg": -7,
        "type": "public-key"
      },
      {
        "alg": -36,
        "type": "public-key"
      },
      {
        "alg": -37,
        "type": "public-key"
      },
      {
        "alg": -38,
        "type": "public-key"
      },
      {
        "alg": -39,
        "type": "public-key"
      },
      {
        "alg": -257,
        "type": "public-key"
      },
      {
        "alg": -258,
        "type": "public-key"
      },
      {
        "alg": -259,
        "type": "public-key"
      }
    ],
    "timeout": 60000,
    "attestation": "none",
    "excludeCredentials": [],
    "authenticatorSelection": {
      "requireResidentKey": false,
      "userVerification": "preferred"
    }
  };
  useEffect(() => {
    const getCreds = async () => {
      if (Object.keys(credential).length) {
        const options = { ...credential };
        options.challenge = base64url.decode(credential.challenge);
        options.user = {
          ...options.user,
          id: base64url.decode(credential.user.id),
        };

        await navigator.credentials.create({
          publicKey: options,
        }).then((newCredentialInfo) => {
          const response = newCredentialInfo.response;
          const clientExtensionsResults =
            newCredentialInfo.getClientExtensionResults();
          const hashBuffer = generateHash(response.clientDataJSON)
          console.log("clientExtensionsResults", response.clientDataJSON);
        })
      }
    };
    getCreds();
  }, [credential]);

  const generateHash = async (hashValue) => {
    const utf8 = new TextEncoder().encode(hashValue)
    const hashBuffer = await window.crypto.subtle.digest('SHA-512', utf8)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, '0')).join('')
    return hashHex
  }

  const registerPrint = () => {
    // registerCredential().then((response) => {
    //   console.log(JSON.stringify(response));
    setCredential(response);
    // });
  };

  return (
    <div>
      <button className="finger-btn" onClick={registerPrint}>Finger print</button>
    </div>
  );
};

export default App;
