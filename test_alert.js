var path = window.location.pathname;
if (path === '/liturgicke_texty_dnes.php') {
const apiUrl = "https://script.google.com/macros/s/AKfycbyBBNH69t_VY_fnG2WcyWRXRQol2c8YP5knewjPJoG3_sRhOop6Sr-QyLC833vdcAUo/exec";

    const textyDiv = document.getElementById("textyd");

    const h3 = document.createElement("h3");
    h3.id = "googleSheetDataId"
    h3.textContent = "="
    
    let dots = 0;
  setInterval(() => {
    dots = (dots + 1) % 4; // 0,1,2,3,0,1,2,3...
    h3.textContent = "Načítám data" + ".".repeat(dots);
  }, 300); // každých 300 ms
    
    textyDiv.parentNode.insertBefore(h3, textyDiv);
    textyDiv.style.opacity = "0.5"; 
  
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP chyba: " + response.status);
      }
      return response.text();
    })
    .then(text => {
      h3.textContent = "Odpověď: " + text;
      h3.style.color = "red";
      //document.body.appendChild(h3);
      textyDiv.style.opacity = "1.0"; 

    })
    .catch(err => {
      h3.style.color = "orange";
      h3.textContent = "⚠️ Chyba při načítání: " + err.message;
      //document.body.appendChild(h3);
      console.error("Detail chyby:", err);
      textyDiv.style.opacity = "1.0";  
    });
  
  }



