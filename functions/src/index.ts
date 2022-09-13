const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data: any, context: any) => {
  // get user and add custom claim (admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user: any) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an admin`,
      };
    })
    .catch((error: any) => {
      return error;
    });
});

exports.addUserRole = functions.https.onCall((data: any, context: any) => {
  // get user and add custom claim (admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user: any) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: false,
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an user`,
      };
    })
    .catch((error: any) => {
      return error;
    });
});
