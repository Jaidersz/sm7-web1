const formSection = document.getElementById("form-section");
const listSection = document.getElementById("list-section");
const formLink = document.getElementById("form-link");
const listLink = document.getElementById("list-link");
const studentForm = document.getElementById("student-form");
const studentList = document.getElementById("student-list");
const promedioEl = document.getElementById("promedio-general");

let estudiantes = [];

// Navegación entre secciones
formLink.addEventListener("click", () => {
  formSection.style.display = "block";
  listSection.style.display = "none";
});

listLink.addEventListener("click", () => {
  formSection.style.display = "none";
  listSection.style.display = "block";
  renderList();
});

// Guardar estudiante
studentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const nota1 = parseFloat(document.getElementById("nota1").value);
  const nota2 = parseFloat(document.getElementById("nota2").value);
  const nota3 = parseFloat(document.getElementById("nota3").value);

  const promedio = ((nota1 + nota2 + nota3) / 3).toFixed(2);

  estudiantes.push({ nombre, nota1, nota2, nota3, promedio });

  studentForm.reset();
  alert("Estudiante registrado con éxito ✅");
});

// Renderizar lista
function renderList() {
  studentList.innerHTML = "";
  let sumaPromedios = 0;

  estudiantes.forEach((est, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="info">
        <strong>${est.nombre}</strong><br>
        Notas: ${est.nota1}, ${est.nota2}, ${est.nota3}<br>
        Promedio: ${est.promedio}
      </div>
      <button class="delete-btn" data-index="${index}">❌</button>
    `;
    studentList.appendChild(li);
    sumaPromedios += parseFloat(est.promedio);
  });

  if (estudiantes.length > 0) {
    const promedioGeneral = (sumaPromedios / estudiantes.length).toFixed(2);
    promedioEl.textContent = `Promedio General: ${promedioGeneral}`;
  } else {
    promedioEl.textContent = "Promedio General: -";
  }

  // Eliminar estudiante
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = btn.getAttribute("data-index");
      estudiantes.splice(idx, 1);
      renderList();
    });
  });
}
