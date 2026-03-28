document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact__form");
  const msg = document.getElementById("form__message");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche la redirection classique

    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
        redirect: "manual",
      });

      if (res.status === 200 || res.status === 0) {
        showMessage("✅ Merci ! Votre message a bien été envoyé.", "$text-color");
        form.reset();
      } else {
        showMessage("❌ Une erreur est survenue. Veuillez réessayer.", "red");
      }
    } catch (error) {
      showMessage("❌ Erreur de réseau. Vérifiez votre connexion.", "red");
    }
  });

  // Fonction utilitaire pour afficher et cacher le message
  function showMessage(text, color) {
    msg.textContent = text;
    msg.style.color = color;
    msg.style.display = "block"; // rendre visible
    msg.classList.add("show");

    // Retirer la classe après 3 secondes (fade-out)
    setTimeout(() => {
      msg.classList.remove("show");

      // Attendre la fin de la transition CSS avant de cacher complètement
      setTimeout(() => {
        msg.style.display = "none";
        msg.textContent = "";
      }, 700); // durée identique à transition CSS
    }, 5000);
  }
});
