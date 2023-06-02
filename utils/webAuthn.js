const {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} = require("@simplewebauthn/server");

const generateRegistration = () => {
  // (Pseudocode) Retrieve the user from the database
  // after they've logged in
  const user = {
    id: "1232",
    username: "PragyaA",
    displayName: "Pragya",
  };
  // (Pseudocode) Retrieve any of the user's previously-
  // Human-readable title for your website
  const rpName = "SimpleWebAuthn Example";
  // A unique identifier for your website
  const rpID = "localhost";
  // The URL at which registrations and authentications should occur
  const origin = `https://${rpID}`;

  const options = generateRegistrationOptions({
    rpName,
    rpID,
    userID: user.id,
    userName: user.username,
    displayName: user.displayName,
    attestationType: "none",
    // Prevent users from re-registering existing authenticators
    //   excludeCredentials: userAuthenticators.map(authenticator => ({
    //     id: authenticator.credentialID,
    //     type: 'public-key',
    //   })),
  });

  // (Pseudocode) Remember the challenge for this user
  // setUserCurrentChallenge(user, options.challenge);

  return options;
};

module.exports = { generateRegistration };
