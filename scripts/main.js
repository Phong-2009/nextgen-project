import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const db = getFirestore();
const auth = getAuth();
document.addEventListener("DOMContentLoaded", async () => {
  const userAccount = document.getElementById("user-account"); // Ensure this element exists in your HTML

  // Wait for the auth state to be ready
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in

      try {
        // Retrieve user data from Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();

          if (userData.role === "admin") {
            // Redirect admin to admin page
            window.location.href = "./admin.html";
          }

          // Update the UI with user data
          if (userAccount) {
            userAccount.innerHTML = `
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <a id="username" class="nav-link p-2 bd-highlight custom-login-link" href="#">${userData.firstName} ${userData.lastName}</a>
                <a id="logout" class="nav-link p-2 bd-highlight custom-login-link" href="#">LOGOUT</a>
              </div>
            `;

            // Add logout functionality
            const logoutButton = document.getElementById("logout");
            if (logoutButton) {
              logoutButton.addEventListener("click", async () => {
                if (confirm("Are you sure you want to log out?")) {
                  await auth.signOut();
                  alert("You have been logged out.");
                  userAccount.innerHTML = `
                    <a id="user-account" class="nav-link p-2 bd-highlight custom-login-link" href="./login.html">LOGIN</a>
                  `; // Clear user info
                }
              });
            }
          }
        } else {
          console.log("No user data found in Firestore.");
        }
      } catch (error) {
        console.error("Error retrieving user data from Firestore:", error);
      }
    } else {
      console.log("No user is signed in");
    }
  });
});
// const API_URL = 'https://689dcab6ce755fe6978a02ea.mockapi.io/api/v1/KhoaHoc';
