
// Récupérer les données enregistrées
function getData(type) {
    return JSON.parse(localStorage.getItem(type)) || [];
}

// Enregistrer les données
function saveData(type, data) {
    localStorage.setItem(type, JSON.stringify(data));
}

// Afficher les données
function displayData(type) {
    const list = document.getElementById(type + "List");

    if (!list) return;

    const data = getData(type);
    list.replaceChildren();

    data.forEach(function(item) {
        const li = document.createElement("li");

        li.textContent = Object.values(item).join(" - ");

        list.appendChild(li);
    });
}

// Gérer les formulaires
document.querySelectorAll("[data-form]").forEach(function(form) {

    const type = form.dataset.form;
    const message = form.querySelector(".message");

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        // Récupérer les informations
        const formData = new FormData(form);
        const newItem = Object.fromEntries(formData.entries());

        // Vérifier les champs
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const data = getData(type);

        // Vérifier les identifiants des moniteurs
        if (type === "moniteurs") {
            const existe = data.some(function(item) {
                return item.identifiant === newItem.identifiant;
            });

            if (existe) {
                message.textContent =
                    "Cet identifiant existe déjà !";
                message.style.color = "red";
                return;
            }
        }

        // Ajouter les données
        data.push(newItem);

        // Sauvegarder
        saveData(type, data);

        // Afficher le résultat
        displayData(type);

        message.textContent = "Ajout effectué avec succès !";
        message.style.color = "green";

        // Vider le formulaire
        form.reset();
    });

    // Effacer le message lors de l'annulation
    form.addEventListener("reset", function() {
        if (message) {
            message.textContent = "";
        }
    });

    // Afficher les anciennes données
    displayData(type);
});
