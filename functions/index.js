const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    console.log("🟡 Raw received data:", data);
    console.log("📧 data.email:", data.email);
    console.log("📏 typeof data.email:", typeof data.email);

    if (!data.email || typeof data.email !== "string") {
        console.error("❌ Email is missing or not a string.");
        throw new functions.https.HttpsError(
            "invalid-argument",
            "Email is missing or not a string."
        );
    }

    return admin.auth().getUserByEmail(data.email)
        .then((user) => {
            console.log("👤 User found:", user.uid);
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true,
            });
        })
        .then(() => {
            console.log(`✅ Admin claim successfully set for ${data.email}`);
            return {
                message: `Success! ${data.email} has been made an admin.`,
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
