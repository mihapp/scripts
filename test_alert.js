var path = window.location.pathname;
if (path === '/liturgicke_texty_dnes.php') {
const apiUrl = "https://script.google.com/macros/s/AKfycbyBBNH69t_VY_fnG2WcyWRXRQol2c8YP5knewjPJoG3_sRhOop6Sr-QyLC833vdcAUo/exec";

    const textyDiv = document.getElementById("textyd");
    textyDiv.style.display = "none"; 

  
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
      //document.body.appendChild(h3);
      textyDiv.style.display = "block"; 

      textyDiv.parentNode.insertBefore(h3, textyDiv);
    })
    .catch(err => {
      const h3 = document.createElement("h3");
      h3.style.color = "red";
      h3.textContent = "⚠️ Chyba při načítání: " + err.message;
      //document.body.appendChild(h3);
      console.error("Detail chyby:", err);
      textyDiv.style.display = "block"; 
      textyDiv.parentNode.insertBefore(h3, textyDiv);

    });
  
  }

