const apiUrl = "https://script.google.com/macros/s/AKfycbyJh2mTRLzeVv98kRVeWEIXQLWyhn0M0iP9jT6PdbfvSdhHGwIMf5hgGUrrJE2mJND6/exec";

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP chyba: " + response.status);
      }
      return response.text();
    })
    .then(text => {
      const h3 = document.createElement("h3");
      h3.textContent = "Odpověď: " + text;
      document.body.appendChild(h3);
    })
    .catch(err => {
      const h3 = document.createElement("h3");
      h3.style.color = "red";
      h3.textContent = "⚠️ Chyba při načítání: " + err.message;
      document.body.appendChild(h3);
      console.error("Detail chyby:", err);
    });
