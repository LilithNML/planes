// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {
  const btnGenerar = document.getElementById("generar");
  const contenedor = document.getElementById("resultado");

  btnGenerar.addEventListener("click", async () => {
    const categoria = document.getElementById("categoria").value;
    const tiempo = document.getElementById("tiempo").value;

    try {
      const res = await fetch("assets/data/planes.json");
      const data = await res.json();
      let planes = data.planes;

      // Filtrar por tiempo
      planes = planes.filter(plan => plan.tiempo === tiempo || tiempo === "todo" && plan.tiempo === "todo");

      // Filtrar por categoría si no es "todas"
      if (categoria !== "todas") {
        planes = planes.filter(plan => plan.categoria === categoria);
      }

      // Limpiar resultados previos
      contenedor.innerHTML = "";

      if (planes.length === 0) {
        contenedor.innerHTML = `<p class="plan-card">No hay planes con esos filtros. Prueba con otras opciones.</p>`;
        return;
      }

      // Si es largo o todo el día → mostrar 6 aleatorios
      const cantidad = (tiempo === "largo" || tiempo === "todo") ? 6 : 1;
      const seleccionados = seleccionarAleatorios(planes, cantidad);

      seleccionados.forEach(plan => {
        const div = document.createElement("div");
        div.className = "plan-card";
        div.textContent = plan.texto;
        contenedor.appendChild(div);
      });
    } catch (error) {
      console.error("Error cargando los planes:", error);
      contenedor.innerHTML = `<p class="plan-card">Ocurrió un error al cargar los planes.</p>`;
    }
  });

  function seleccionarAleatorios(array, cantidad) {
    const copia = [...array];
    const seleccion = [];

    while (seleccion.length < cantidad && copia.length > 0) {
      const i = Math.floor(Math.random() * copia.length);
      seleccion.push(copia.splice(i, 1)[0]);
    }

    return seleccion;
  }
});
