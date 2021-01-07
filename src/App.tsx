import React, { useState } from "react";
import "./global.css";

function App() {
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  const handleClick = async () => {
    const rawHtmlParagraphArr = filterInParagraphs(await getWikiHtml());
    const testArr = rawHtmlParagraphArr
      .map(rawHtmlParagraph => {
        const tempParagraphNode = new DOMParser()
          .parseFromString(rawHtmlParagraph, "text/html")
          .querySelector("p");

        return tempParagraphNode?.textContent;
      })
      .filter(paragraph => paragraph && (paragraph.length >= 25));
    setParagraphs(testArr as string[]);
  };

  const ParagraphComponents = paragraphs.map((p, i) => <p key={i}>{p}</p>);

  return (
    <div>
      {ParagraphComponents}
      <button onClick={handleClick}>test proxy</button>
    </div>
  );
}

export default App;


function getWikiHtml() {
  return fetch("/wiki/Speci%C3%A1ln%C3%AD:N%C3%A1hodn%C3%A1_str%C3%A1nka")
    .then(response => response.text())
    .then(html => html)
    .catch(err => {
      console.log(err.message);
      return "";
    });
}

function filterInParagraphs(html: string) {
  const paragraphRegExp = /<p>[\s\S]*?<\/p>/g;
  const paragraphArr = html.match(paragraphRegExp);
  if(paragraphArr !== null) {
    return paragraphArr;
  }
  return [];
}
