var path = window.location.pathname;
if (path === '/liturgicke_texty_dnes.php') {
const apiUrl = "https://script.google.com/macros/s/AKfycbyVQaK4JsR_n4b-mwwllrkR5gOhedHnhasK4YZrxe7Ul4M7FhWQBUrhZo3iFZzuwYiX/exec";
    const textyDiv = document.getElementById("textyd");

    const h3 = document.createElement("h3");
    h3.id = "googleSheetDataId"
    h3.textContent = "="
    
    let dots = 0;
  const intervalId = setInterval(() => {
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
      clearInterval(intervalId);
      const obj = JSON.parse(text);

    if ("error" in data) {
         const err = obj.error;
         h3.style.color = "orange";
         h3.textContent = "⚠️ Nepodařilo se načíst aktuální program pro dnešní den. Kontaktujte administrátora webových stránek Vratislavice Nad Nisou: " + err.message;
    } else if ("massName" in data && Array.isArray(data.massName)) {
        const result = obj.massName.join('\n');
         h3.textContent = "Pozor, v tento den slavíme: " + result;
         h3.style.color = "red";
         textyDiv.style.opacity = "1.0"; 
    } else if ("massName" in data && data.massName.trim() === "") {
         h3.textContent = "Žádná změna pro tento den";
         h3.style.color = "green";
         textyDiv.style.opacity = "1.0"; 
    } else {
         h3.style.color = "orange";
         h3.textContent = "⚠️ Nepodařilo se načíst aktuální program pro dnešní den. Kontaktujte administrátora webových stránek Vratislavice Nad Nisou: " + text;
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



