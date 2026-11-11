
// ===============================
// EDUSPACE - JAVASCRIPT
// ===============================

// Afficher la date actuelle
const today = document.getElementById("today");

if (today) {
    today.textContent = new Date().toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

// Afficher l'année
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

// ===============================
// DARK MODE
// ===============================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    // Restaurer le thème sauvegardé
    const savedTheme = localStorage.getItem("eduTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "☀";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");

        themeToggle.textContent = isDark ? "☀" : "☾";

        localStorage.setItem(
            "eduTheme",
            isDark ? "dark" : "light"
        );
    });
}

// ===============================
// MOBILE MENU
// ===============================

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("show");
    });

    document.addEventListener("click", (event) => {
        if (
            window.innerWidth <= 700 &&
            !sidebar.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            sidebar.classList.remove("show");
        }
    });
}

// ===============================
// STATISTICS
// ===============================

function updateStatistics() {

    const moniteurs = JSON.parse(
        localStorage.getItem("moniteurs") || "[]"
    );

    const apprenants = JSON.parse(
        localStorage.getItem("apprenants") || "[]"
    );

    const seances = JSON.parse(
        localStorage.getItem("seances") || "[]"
    );

    const moniteurCount = document.getElementById("moniteurCount");
    const apprenantCount = document.getElementById("apprenantCount");
    const seanceCount = document.getElementById("seanceCount");

    if (moniteurCount) {
        moniteurCount.textContent = moniteurs.length;
    }

    if (apprenantCount) {
        apprenantCount.textContent = apprenants.length;
    }

    if (seanceCount) {
        seanceCount.textContent = seances.length;
    }
}

updateStatistics();

console.log("EduSpace est prêt !");
