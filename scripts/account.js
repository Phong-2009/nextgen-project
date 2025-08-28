import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
// const db = getFirestore();

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
                  userConfirm.innerHTML = `
                    <a id="user-confirm" class="nav-link p-2 bd-highlight custom-login-link" href="./login.html">LOGIN</a>
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


// Sidebar navigation logic
    const menuMap = {
      "menu-recharge": "recharge-content",
      "menu-history": "history-content",
      "menu-profile": "profile-content",
      "menu-password": "password-content"
    };
    document.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        Object.values(menuMap).forEach(id => document.getElementById(id).style.display = 'none');
        document.getElementById(menuMap[this.id]).style.display = 'block';
      });
    });

    // Payment method card selection effect
    document.querySelectorAll('.payment-method-card').forEach(card => {
      card.addEventListener('click', function () {
        document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        this.querySelector('input[type="radio"]').checked = true;
      });
    });

    // Demo recharge form
    document.getElementById('recharge-form').onsubmit = function (e) {
      e.preventDefault();
      document.getElementById('success-message').style.display = 'block';
      setTimeout(() => {
        document.getElementById('success-message').style.display = 'none';
        document.getElementById('recharge-form').reset();
        document.querySelectorAll('.payment-method-card').forEach((c, i) => c.classList.toggle('selected', i === 0));
      }, 2500);
    };