var path = window.location.pathname;
if (path === '/liturgicke_texty_dnes.php') {
const apiUrl = "https://script.google.com/macros/s/AKfycbzNk-1raGf7QjjP6HulLhVX4DVjLk3SsEUN1Wn99LTGdWMT-zecCNFl7B3F4iigb2zQ/exec";
    const textyDiv = document.getElementById("textyd");

    const h3 = document.createElement("h3");
    h3.id = "googleSheetDataId"
    h3.textContent = "="
    
    let dots = 0;
  const intervalId = setInterval(() => {
    dots = (dots + 1) % 4; // 0,1,2,3,0,1,2,3...
    h3.textContent = "Aktualizuji data" + ".".repeat(dots);
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
      clearInterval(intervalId);
      const obj = JSON.parse(text);

    if ("error" in obj) {
         console.error("002");
        if (obj.error == "404-DatumNenalezeno") {
            const date = obj.date
            h3.style.color = "green";
            h3.textContent = "Pro datum " + date + " nebyl nalezen žádný záznam o mši ve Vratislavicích nad Nisou.";
        } else {
         const err = obj.error;
         h3.style.color = "orange";
         h3.textContent = "⚠️ Nepodařilo se načíst aktuální program pro dnešní den. Kontaktujte administrátora webových stránek Vratislavice Nad Nisou: " + err.message;
        }
    } else if ("massName" in obj && Array.isArray(obj.massName)) {
         console.error("003");
        const result = obj.massName.join('\n');
         h3.textContent = "Pozor, v tento den slavíme: " + result + " !!";
         h3.style.color = "red";
         textyDiv.style.opacity = "1.0"; 
    } else if ("massName" in obj && obj.massName.trim() === "") {
        console.error("004");
         h3.textContent = "Žádná změna pro tento den";
         h3.style.color = "green";
         textyDiv.style.opacity = "1.0"; 
    } else if ("massName" in obj) {
        console.error("005");
         h3.textContent = "Pozor, v tento den slavíme: " + obj.massName + " !";
         h3.style.color = "red";
         textyDiv.style.opacity = "1.0"; 
    }
    })
    .catch(err => {
      clearInterval(intervalId);
      h3.style.color = "orange";
      h3.textContent = "⚠️ Nepodařilo se načíst aktuální program pro dnešní den. Kontaktujte administrátora webových stránek Vratislavice Nad Nisou: " + err.message;
      //document.body.appendChild(h3);
      console.error("Detail chyby:", err);
      textyDiv.style.opacity = "1.0";  
    });
  
  }



