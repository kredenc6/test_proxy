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
      <button
        onClick={() => fetch("/.netlify/functions/hello")
        .then(response => response.json())
        .then(({ message }) => setParagraphs([message]))
        .catch(err => console.log(err.message))}
      >
        test lambda hello
      </button>
      <button
        onClick={() => fetch("/.netlify/functions/testAsync")
        .then(response => response.json())
        .then(({ msg }) => setParagraphs([msg]))
        .catch(err => console.log(err.message))}
      >
        test async
      </button>
    </div>
  );
}

export default App;


function getWikiHtml() {
  return fetch("/.netlify/functions/proxy/randomWiki")
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
