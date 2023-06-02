import axios from "axios";

export const registerCredential = async () => {
  const opts = {
    attestation: "none",
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      userVerification: "required",
      requireResidentKey: false,
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .post("/auth/registerRequest", opts, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(({ data }) => {
        resolve({ ...data });
      })
      .catch((err) => {
        console.log("ERRor", err);
      });
  });
};
