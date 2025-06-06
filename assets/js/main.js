let planes = [];

fetch("assets/data/planes.json")
  .then(res => res.json())
  .then(data => {
    planes = data.planes;
  });

document.getElementById("generar").addEventListener("click", () => {
  if (planes.length === 0) return;

  const index = Math.floor(Math.random() * planes.length);
  const planElegido = planes.splice(index, 1)[0]; // elimina el plan para no repetir

  document.getElementById("plan").textContent = planElegido;

  if (planes.length === 0) {
    document.getElementById("generar").disabled = true;
    document.getElementById("generar").textContent = "¡Ya viste todos!";
  }
});
