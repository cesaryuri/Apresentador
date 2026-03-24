# 📊 HTML Slide Presenter

Um gerenciador de apresentações leve e sem dependências que roda direto no navegador. Carregue qualquer conjunto de arquivos `.html` e apresente-os como slides — com suporte a imagens embutidas, navegação por teclado e controles interativos.

---

## ✨ Funcionalidades

- **Drag & Drop ou seleção de arquivos** — arraste seus slides diretamente para a tela
- **Escala responsiva** — os slides sempre se ajustam ao tamanho da janela mantendo proporção 16:9 (1280×720)
- **Navegação por teclado** — use `←` e `→` para navegar entre slides
- **Barra de controles auto-ocultável** — aparece ao mover o mouse e some após 3 segundos
- **Ordenação automática** — slides ordenados numericamente pelo nome do arquivo (`p1.html`, `p2.html`, ...)
- **Zero dependências externas** — nenhum servidor, nenhum build, funciona offline

---

## 📁 Estrutura do Projeto

```
/
├── index.html        # Gerenciador de apresentação (ponto de entrada)
├── styles.css        # Estilos da interface do gerenciador
├── script.js         # Lógica de carregamento, navegação e resolução de assets
└── slides/           # Exemplo de slides (opcional)
    ├── p1.html
    ├── p2.html
    ├── img/
    │   └── imagem.png
    └── ...
```

---

## 🚀 Como Usar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/html-slide-presenter.git
cd html-slide-presenter
```

### 2. Abra o gerenciador

Abra o arquivo `index.html` diretamente no navegador — **nenhum servidor é necessário**.

```bash
# Ou via linha de comando (Linux/macOS)
open index.html

# Windows
start index.html
```

### 3. Carregue seus slides

Na tela inicial, **arraste os arquivos `.html`** ou clique em **"Selecionar arquivos"**.

> ⚠️ **Atenção:** imagens referenciadas nos slides com caminhos relativos (`img/foto.png`) não serão exibidas. Consulte a seção [Melhorias Futuras](#-melhorias-futuras) para entender a limitação atual.

### 4. Navegue

| Ação | Controle |
|---|---|
| Próximo slide | `→` ou botão **Próximo** |
| Slide anterior | `←` ou botão **Anterior** |
| Ver controles | Mova o mouse |
| Nova apresentação | Clique em **"Carregar novos slides"** |

---

## 🎨 Criando Slides Compatíveis

Os slides são arquivos `.html` independentes. O gerenciador os exibe dentro de um `iframe` de 1280×720px. Qualquer HTML válido funciona.

### Template base recomendado

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Slide</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
        .slide-container {
            width: 1280px;
            height: 720px;
        }
    </style>
</head>
<body>
    <div class="slide-container">
        <!-- Seu conteúdo aqui -->
    </div>
</body>
</html>
```

---

## 🔧 Personalização

### Alterar o tempo de ocultação da barra de controles

No arquivo `script.js`, ajuste a constante no topo:

```js
const HIDE_DELAY = 3000; // milissegundos (3000 = 3 segundos)
```

### Alterar a resolução dos slides

A resolução padrão é **1280×720px**. Para alterar, edite em `styles.css`:

```css
.presentation-container {
    width: 1280px;
    height: 720px;
}
```

E em `script.js`, atualize os valores de escala:

```js
function fitSlide() {
    const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    container.style.transform = `scale(${scale})`;
}
```

---

## 🔮 Melhorias Futuras

Ideias para evoluir o projeto:

- **Suporte a pastas inteiras via File System Access API** — atualmente, imagens em subpastas (`img/foto.png`) precisam ser selecionadas manualmente junto com os HTMLs. A solução é usar `window.showDirectoryPicker()`, que permite ao usuário selecionar a pasta raiz da apresentação e ler toda a estrutura de diretórios preservando os caminhos relativos, eliminando completamente a necessidade de selecionar arquivos individualmente
- **Miniaturas de navegação** — barra lateral com preview de todos os slides para navegação rápida
- **Modo fullscreen** — botão para entrar em tela cheia nativa do navegador
- **Transições entre slides** — animações de entrada e saída configuráveis
- **Suporte a CSS e JS externos** — resolver também referências de `<link href="...">` e `<script src="...">` dentro dos slides
- **Contador de tempo** — cronômetro por slide para controle de tempo em apresentações
- **Exportar como PDF** — gerar um PDF com todos os slides via print do navegador

---

## 📄 Licença

MIT — sinta-se livre para usar, modificar e distribuir.

---

## 🤝 Contribuindo

Pull requests são bem-vindos! Para mudanças maiores, abra uma issue primeiro para discutir o que você gostaria de alterar.

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/minha-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona minha feature'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request
