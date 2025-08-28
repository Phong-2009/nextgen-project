import { auth } from "./firebase-config.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
const db = getFirestore();

const balanceForm = document.getElementById("balance-form");

const handlePurchase = async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  try {
    if (user) {
      const balance = doc(db, "users", user.uid);
      const balanceSnapshot = await getDoc(balance);
      if (balanceSnapshot.exists()) {
        const currentBalance = Number(balanceSnapshot.data().balance) || 0;
        const updateBalanceValue = document.getElementById("update-balance").value;
        const updateBalance = Number.parseFloat(updateBalanceValue);
        if (isNaN(updateBalance)) {
          alert("Please enter a valid number to update the balance.");
          return;
        }
        const newBalance = currentBalance + updateBalance;
        await updateDoc(balance, { balance: newBalance });
        const userData = balanceSnapshot.data();
        console.log(`User ${userData.firstName} ${userData.lastName} new balance:`, newBalance.toString());

        // Cập nhật số dư hiển thị ngay lập tức
        const balanceNumber = document.querySelector(".balance-number");
        if (balanceNumber) {
          balanceNumber.textContent = newBalance.toString() + "$";
        }
        document.getElementById("update-balance").value = ""; // Reset ô nhập tiền
        const updateBalanceOutput = document.getElementById("update-balance-output");
        updateBalanceOutput.textContent = `Your balance has been updated to: ${Math.floor(newBalance)}$`;
      } else {
        console.log("No balance data found.");
      }
    }
  } catch (error) {
    console.error("Error updating balance:", error);
    alert("Error updating balance: " + error.message);
  }
};
balanceForm.addEventListener("submit", handlePurchase);
