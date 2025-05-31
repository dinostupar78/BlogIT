const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email)
        .then((user) => {
            console.log("👤 User found:", user.uid);
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true,
            });
        }).then(() => {
            console.log(`✅ Admin claim successfully set for ${data.email}`);
            return {
                message: `Success! ${data.email} has been made an admin!`,
            };
        })
        .catch((error) => {
            console.error("🔥 Error in addAdminRole:", error);
            throw new functions.https.HttpsError(
                "internal",
                error.message || "Unknown error"
            );
        });
});
