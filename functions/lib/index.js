"use strict";
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.addAdminRole = functions.https.onCall((data, context) => {
    const customClaims = {
        admin: data.isAdmin,
    };
    // get user and add custom claim (admin)
    return admin
        .auth()
        .getUserByEmail(data.email)
        .then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, customClaims);
    })
        .then(() => {
        return {
            message: `Success, user ${data.email} with the role of: ${data.isAdmin ? "admin" : "user"} - has been created.`,
        };
    })
        .catch((error) => {
        return error;
    });
});
//# sourceMappingURL=index.js.map