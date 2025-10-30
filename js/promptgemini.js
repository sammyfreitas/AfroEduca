const API_KEY = "";  
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY;

document.getElementById("gerarBtn").addEventListener("click", async () => {
  const faixa = document.getElementById("faixa").value;
  const objetivo = document.getElementById("objetivo").value;
  const info = document.getElementById("info").value;
  const respostaDiv = document.getElementById("resposta");
  
  const prompt = `
Você é um educador afrocultural especializado em adaptar e criar materiais didáticos inclusivos.

Analise o conteúdo do arquivo PDF (anexo) e produza um resumo adaptado de acordo com os seguintes parâmetros:

- Faixa etária: ${faixa}
- Objetivo pedagógico: ${objetivo}
- Instruções adicionais: ${info || "nenhuma"}

Adapte o conteúdo de modo que ele promova:
- a valorização do protagonismo negro e da representatividade no ensino;
- a inclusão digital e a autonomia intelectual dos estudantes;
- a conexão entre ancestralidade, conhecimento e tecnologia.

Reescreva o material com linguagem acessível para o público-alvo, mantendo o sentido, o valor histórico e a coerência pedagógica do texto original.

Se o objetivo for didático, inclua sugestões de atividades curtas, debates ou reflexões que incentivem pensamento crítico e pertencimento cultural.

Formato de saída:
1. Título do resumo
2. Texto adaptado (máx. 500 palavras)
3. Sugestão de atividade ou reflexão (se aplicável)
`.trim();

respostaDiv.textContent = "⏳ Gerando resumo...";

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    console.log("Resposta da API:", data);

    const resposta = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ Não consegui gerar resposta.";
    respostaDiv.textContent = resposta;
  } catch (error) {
    respostaDiv.textContent = "❌ Erro ao conectar à API.";
    console.error(error);
  }

});
