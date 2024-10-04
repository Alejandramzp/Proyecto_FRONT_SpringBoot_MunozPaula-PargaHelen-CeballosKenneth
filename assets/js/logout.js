function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "../../index.html";
}
