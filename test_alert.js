var path = window.location.pathname;
if (path === '/liturgicke_texty_dnes.php') {
const apiUrl = "https://script.google.com/macros/s/AKfycbzSOw64P3s5WTW6aWGp8BYCxmnIaLLMvMQPMAxVxZmHgrBNKKpxcoJbmKwOCCuWzH8/exec";
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
        if (obj.error == "404-DatumNenalezeno") {
            const date = obj.date
            h3.style.color = "green";
            h3.textContent = "Pro datum " + date + " nebyl nalezen žádný záznam o mši ve Vratislavicích nad Nisou.";
            textyDiv.style.opacity = "1.0"; 
        } else {
         const err = obj.error;
         h3.style.color = "orange";
         h3.textContent = "⚠️ Nepodařilo se načíst aktuální program mší pro dnešní den. Kontaktujte administrátora webových stránek Vratislavice Nad Nisou: " + err.message;
        }
    } else if ("massName" in obj && Array.isArray(obj.massName)) {
         const date = obj.date
        if (obj.massName.length === 1 && obj.massName[0].trim() === "") {
            h3.textContent = "Liturgické texty níže jsou aktuální pro dnešní bohoslužbu";
            h3.style.color = "green";
            textyDiv.style.opacity = "1.0"; 
        } else {
         const result = obj.massName.map(name => `• ${name}`).join("<br>");
         h3.innerHTML = "Pozor, v tento den " + date + " ve Vratislavicích slavíme:<br>" + result + "<br> Níže uvedené (automaticky vygenerované) liturgické texty tak nemusí být použity!!";
         h3.style.color = "red";
         textyDiv.style.opacity = "0.7"; 
        }
    } else if ("massName" in obj && obj.massName.trim() === "") {
         const date = obj.date
         h3.textContent = "Liturgické texty níže jsou aktuální pro dnešní bohoslužbu " + date;
         h3.style.color = "green";
         textyDiv.style.opacity = "1.0"; 
    } else if ("massName" in obj) {
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



