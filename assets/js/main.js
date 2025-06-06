const API_URL = 'https://script.google.com/macros/s/AKfycbwJ1X2F3YEH8n3qFjN8G3Po5-8S4L47AVXMe2dP_HIM0i_sCt5whK-iS_xOu1wtgUQgcg/exec'; // <- reemplaza con tu URL

document.getElementById("generar").addEventListener("click", async () => {
  const tipo = document.getElementById("tipo").value;
  const tiempo = document.getElementById("tiempo").value;
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "<p>Generando planes con IA... ✨</p>";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ tipo, tiempo }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    const ideas = data.candidates?.[0]?.content?.parts?.[0]?.text?.split("\n").filter(i => i.trim() !== "");

    if (!ideas || ideas.length === 0) {
      resultado.innerHTML = "<p>No se pudo generar planes. Intenta nuevamente.</p>";
      return;
    }

    resultado.innerHTML = ideas.map(plan => `<div class="plan-card">${plan}</div>`).join("");
  } catch (err) {
    resultado.innerHTML = "<p>Error al conectar con el servidor IA.</p>";
    console.error(err);
  }
});
