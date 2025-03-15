document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const sala = parseInt(urlParams.get("sala")) || 0;

    // Pobranie danych dla konkretnej sali
    const uczniowieWSali = uczniowie.filter((u) => u.sala === sala);

    // Nagłówek sali
    document.getElementById("sala-title").textContent = `SALA ${sala}`;

    // Pobranie unikalnych przedmiotów
    const przedmioty =
        [
            ...new Set(uczniowieWSali.map((u) => u.przedmiot).filter((p) => p)),
        ].join(", ") || "Brak danych";
    document.getElementById("przedmioty").textContent = przedmioty;

    // Obrazek sali
    const salaImage = document.getElementById("sala-image");
    const salaImagePath = `zdjecia sal/${sala}.jpg`;
    fetch(salaImagePath)
        .then((res) => {
            if (res.ok) {
                salaImage.innerHTML = `<img class="classroom-image" src="${salaImagePath}" alt="Sala ${sala}">`;
            }
        })
        .catch(() => {});

    // Wyświetlenie listy nauczycieli/uczniów
    const nauczycieleContainer = document.getElementById(
        "nauczyciele-container"
    );
    nauczycieleContainer.innerHTML = "";

    if (uczniowieWSali.length > 0) {
        uczniowieWSali.forEach((u) => {
            const teacherDiv = document.createElement("div");
            teacherDiv.classList.add("teacher");
            teacherDiv.innerHTML = `
                <div class="teacher-info">
                    <h3>${
                        u.imie ? `${u.imie} ${u.nazwisko}` : "Brak danych"
                    }</h3>
                    <p>${u.opis || "Brak opisu"}</p>
                </div>
                <img class="teacher-image" src="avatar.jpg" alt="avatar">
            `;
            nauczycieleContainer.appendChild(teacherDiv);
        });
    } else {
        nauczycieleContainer.innerHTML =
            "<p>Brak nauczycieli przypisanych do tej sali.</p>";
    }
});
