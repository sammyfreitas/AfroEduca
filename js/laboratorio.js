"use strict";
const $=id=>document.getElementById(id);
const menu=$("menu-toggle"),nav=$("nav");
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Fechar menu":"Abrir menu");});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");}));
$("ano").textContent=new Date().getFullYear();
const modo=$("modo");
function updateMode(){const novo=modo.value==="criar";$("origem-wrap").hidden=novo;$("novo-wrap").hidden=!novo;}
modo.addEventListener("change",updateMode);updateMode();
for(const id of ["publico","formato"]){$(id).addEventListener("change",()=>{$(id+"-outro").hidden=$(id).value!=="outro";});}
const MAX=120000;
$("arquivo").addEventListener("change",async e=>{const f=e.target.files[0];if(!f)return;const status=$("arquivo-status");status.textContent="Lendo arquivo...";try{if(f.size>8*1024*1024)throw Error("Arquivo acima de 8 MB. Cole o trecho relevante no campo de texto.");const ext=f.name.split(".").pop().toLowerCase();let content="";
if(["txt","md"].includes(ext)){content=await f.text();}
else if(ext==="docx"){if(!window.mammoth)throw Error("Leitor DOCX indisponível. Cole o texto manualmente.");const out=await window.mammoth.extractRawText({arrayBuffer:await f.arrayBuffer()});content=out.value;}
else if(ext==="pdf"){if(!window.pdfjsLib)throw Error("Leitor PDF indisponível. Cole o texto manualmente.");window.pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";const pdf=await window.pdfjsLib.getDocument({data:await f.arrayBuffer()}).promise;const pages=[];for(let i=1;i<=Math.min(pdf.numPages,60);i++){const page=await pdf.getPage(i);const data=await page.getTextContent();pages.push(data.items.map(x=>x.str).join(" "));}content=pages.join("\n\n");if(pdf.numPages>60)status.textContent="Apenas as primeiras 60 páginas foram extraídas.";}
else throw Error("Formato não aceito.");
if(!content.trim())throw Error("Nenhum texto extraído. PDF digitalizado pode exigir OCR; cole o texto manualmente.");
$("fonte").value=content.slice(0,MAX);status.textContent="Texto carregado: "+content.length.toLocaleString("pt-BR")+" caracteres"+(content.length>MAX?" (limitado a 120 mil).":"; revise a extração.");}
catch(err){status.textContent="Não foi possível ler: "+err.message;}});
const val=id=>$(id).value.trim(),opt=id=>val(id)==="outro"?val(id+"-outro"):val(id);
$("lab-form").addEventListener("submit",e=>{e.preventDefault();$("lab-erro").textContent="";$("feedback").textContent="";
const novo=modo.value==="criar",fonte=val("fonte"),assunto=val("assunto"),publico=opt("publico"),formato=opt("formato");
if((novo&&!assunto)||(!novo&&!fonte)){$("lab-erro").textContent=novo?"Descreva o tema do novo conteúdo.":"Cole um texto ou carregue um arquivo.";return;}
if(!publico||!formato){$("lab-erro").textContent="Informe o público e o formato personalizados.";return;}
const objetivo=val("objetivo"),extra=val("instrucoes");
const prompt=[
"Você é especialista em educação, didática, história e cultura afro-brasileira e africana, com compromisso com a educação antirracista, o rigor histórico e a pluralidade das experiências negras.",
"TAREFA: "+(novo?"Criar conteúdo pedagógico original a partir do tema informado.":"Adaptar o texto fornecido, mantendo seu sentido, suas informações centrais e a atribuição de autoria."),
"PÚBLICO: "+publico,
"FORMATO: "+formato,
"ABORDAGEM: "+val("abordagem"),
"PROFUNDIDADE: "+val("extensao"),
objetivo?"OBJETIVO DE APRENDIZAGEM: "+objetivo:"",
extra?"INSTRUÇÕES DO DOCENTE: "+extra:"",
"CRITÉRIOS OBRIGATÓRIOS:",
"- Adeque vocabulário, exemplos, estrutura e complexidade cognitiva ao público indicado, sem infantilizar ou estereotipar.",
"- Preserve nuances, datas, nomes e conceitos fundamentais. Diferencie fatos, interpretações e hipóteses.",
"- Não invente citações, referências, personagens históricos, dados, leis ou trechos de obras.",
"- Não trate a África como cultura única. Identifique povos, territórios, épocas e contextos quando pertinentes.",
"- Valorize o protagonismo negro e a diversidade de perspectivas; evite exotização, generalizações e folclorização.",
"- Quando o texto original trouxer afirmações problemáticas ou sem sustentação, sinalize isso em nota ao docente em vez de reproduzir como verdade.",
"- Se faltarem informações essenciais, explicite lacunas e faça perguntas de esclarecimento ao final.",
"- Não reproduza longos trechos protegidos; prefira paráfrase transformativa e atribuição.",
$("atividades").checked?"- Inclua atividades coerentes com os objetivos e a faixa etária, com perguntas reflexivas.":"",
$("glossario").checked?"- Inclua glossário breve de termos difíceis.":"",
$("referencias").checked?"- Ao final, apresente referências efetivamente verificáveis, com autor, título e link quando houver. Se não puder verificar, identifique como referência a confirmar; nunca invente fontes.":"",
"ESTRUTURA DA RESPOSTA:",
"1. Título e objetivos.",
"2. Conteúdo adaptado ou criado.",
"3. Notas para o professor: escolhas pedagógicas, simplificações realizadas e pontos que exigem checagem.",
"4. "+($("referencias").checked?"Fontes e referências verificáveis.":"Observações sobre fontes e limitações."),
novo?"TEMA LIVRE PROPOSTO PELO DOCENTE:\n<<<TEMA>>>\n"+assunto+"\n<<<FIM DO TEMA>>>":"TEXTO ORIGINAL FORNECIDO PELO DOCENTE:\n<<<TEXTO>>>\n"+fonte.slice(0,MAX)+"\n<<<FIM DO TEXTO>>>",
"Antes de finalizar, revise coerência, precisão e adequação etária."
].filter(Boolean).join("\n\n");
$("resultado").value=prompt;$("copiar").disabled=false;$("baixar").disabled=false;$("feedback").textContent="Prompt criado. Revise e copie para a IA de sua escolha.";});
$("copiar").addEventListener("click",async()=>{try{await navigator.clipboard.writeText($("resultado").value);$("feedback").textContent="Prompt copiado."; }catch{$("resultado").focus();$("resultado").select();$("feedback").textContent="Selecione e copie o texto manualmente (Ctrl+C).";}});
$("baixar").addEventListener("click",()=>{const blob=new Blob([$("resultado").value],{type:"text/plain;charset=utf-8"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="afroeduca-prompt.txt";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
