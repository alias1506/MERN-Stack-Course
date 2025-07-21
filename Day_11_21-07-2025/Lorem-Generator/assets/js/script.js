let paragraphs = document.getElementById("paragraphs");
let words = document.getElementById("words");
let generate = document.getElementById("generate");
let output = document.getElementById("output");
let reset = document.getElementById("reset");
let copyTxt = document.getElementById("copy-txt");
let selectTag = document.getElementById("tags");

function generateLorem(
  paragraphsCount,
  wordsCount,
  tag = "p",
  includeHTML = true
) {
  const loremTexts = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Nunc accumsan sem ut ligula scelerisque sollicitudin.",
    "Ut at sagittis augue, vel dignissim nisi.",
    "Praesent eget semper metus, ac bibendum justo.",
    "Donec ut ex eu libero suscipit bibendum.",
    "Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
    "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    "Cras mattis consectetur purus sit amet fermentum.",
    "Aenean lacinia bibendum nulla sed consectetur.",
    "Maecenas faucibus mollis interdum.",
  ];

  const result = [];

  for (let i = 0; i < paragraphsCount; i++) {
    let paragraph = "";
    for (let j = 0; j < wordsCount; j++) {
      paragraph +=
        loremTexts[Math.floor(Math.random() * loremTexts.length)] + " ";
    }
    paragraph = paragraph.trim();

    if (includeHTML) {
      paragraph = `<${tag}>${paragraph}</${tag}>`;
    }

    result.push(paragraph);
  }

  return result;
}

generate.addEventListener("click", () => {
  const paraCount = parseInt(paragraphs.value) || 1;
  const wordCount = parseInt(words.value) || 10;
  const selectedTag = selectTag.value;
  const includeHTML = document.getElementById("includeHTML").checked;

  const content = generateLorem(paraCount, wordCount, selectedTag, includeHTML);
  output.innerHTML = includeHTML ? content.join("") : content.join("\n\n");
});

reset.addEventListener("click", () => {
  paragraphs.value = 1;
  words.value = "";
  output.innerHTML = "";
  selectTag.value = "h1";
});

copyTxt.addEventListener("click", () => {
  const copyText = document.getElementById("output").innerText;
  navigator.clipboard
    .writeText(copyText)
    .then(() => {
      alert("Copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
});
