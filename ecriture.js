const scriptURL = 'https://script.google.com/macros/s/AKfycbzbYxa5ovhNJ6rhAsK7dz_KEr_ipxMcApTeN7sBEHZryhaIXnlTwDCnlv_-bZBnE4wi/exec'// URL de déployement


const form = document.forms['contact-form']


form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})


    // Vérifier la session à chaque chargement de page
    const sessionStart = localStorage.getItem('sessionStart');
    const sessionTimeout = 5 * 60 * 1000; // 5 minutes en millisecondes

    // Vérifier si la session existe et si elle n'est pas expirée
    if (sessionStart) {
        const currentTime = Date.now();
        if (currentTime - sessionStart > sessionTimeout) {
            // Si la session a expiré, déconnecter l'utilisateur et rediriger vers la page de connexion
            localStorage.removeItem('user');
            localStorage.removeItem('sessionStart');
            window.location.href = "connexion.html"; // Redirige vers la page de connexion
        }
    } else {
        // Si aucune session n'existe, rediriger directement vers la page de connexion
        window.location.href = "connexion.html";
    }
