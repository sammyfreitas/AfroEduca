# AfroEduca Hub — versão 2.0 (MVP)

Portal institucional com identidade afro-brasileira e laboratório de **geração de prompts pedagógicos**.

## Versão original preservada

Todo o conteúdo da versão anterior foi copiado integralmente para [old/versao1](old/versao1/), incluindo HTML, CSS, JS, imagens, README e LICENSE. O histórico Git também permanece disponível. Os arquivos originais continuam na raiz para compatibilidade; a nova página inicial usa css/portal.css e js/laboratorio.js.

## Laboratório

- Texto livre colado, sem catálogo fechado de assuntos;
- Importação local de TXT, Markdown, PDF textual e DOCX (PDF.js e Mammoth via CDN);
- Criação de conteúdo novo por tema livre;
- Público, formato, abordagem, profundidade, objetivos, instruções e complementos;
- Geração, cópia e download de prompt com critérios de rigor histórico, fontes e adequação etária.

**Limite atual:** não há integração com API de IA, portanto o site **não reescreve** automaticamente: prepara um prompt que pode ser usado em um modelo externo. PDF escaneado não tem OCR. O processamento do arquivo ocorre no navegador; o texto não é enviado pelo site a um servidor. Não use documentos confidenciais em ferramentas externas sem autorização. O usuário deve revisar o resultado da IA.

## Arquivos ativos

- index.html — portal novo
- css/portal.css — design responsivo e acessível
- js/laboratorio.js — laboratório de prompts
- images/ — imagens originais preservadas
- old/versao1/ — cópia exata da versão anterior

## Próximos passos

1. Testes reais em celular e desktop e auditoria de acessibilidade;
2. Testes de extração de PDFs acadêmicos e DOCX;
3. Integração opcional com provedor de IA por backend seguro, autenticação, controle de custos e privacidade;
4. Revisão pedagógica por especialistas e validação de fontes.

Lei nº 10.639/2003 (23 anos em 2026) e Lei nº 11.645/2008: consultar fontes oficiais indicadas no portal.
