import React, { useState, useEffect } from "react";
import "./App.css";

const generateColor = () => {
  // Pour le red, green et blue on genere un nbr aléatoire entre 0 et 255 et on le transforme en base 16 (hexadecimal)
  let r = Math.floor(Math.random() * 255).toString(16);
  if (r.length === 1) r = "0" + r;
  let g = Math.floor(Math.random() * 255).toString(16);
  if (g.length === 1) g = "0" + g;
  let b = Math.floor(Math.random() * 255).toString(16);
  if (b.length === 1) b = "0" + b;
  return ("#" + r + g + b).toUpperCase();
};

function Circle(props) {
  const { circle, index, isSolution } = props;

  return (
    <div
      className="circle"
      style={{
        backgroundColor: circle.color,
        opacity: circle.isTried ? 0 : 1,
        cursor: circle.isTried ? "" : "pointer"
      }}
      onClick={() => isSolution(index)}
    ></div>
  );
}

function App() {
  const [solution, setSolution] = useState();
  const [difficulty, setDifficulty] = useState(2);
  const [circles, setCircles] = useState([]);

  const isSolution = index => {
    // On recupere la couleur du cercle a la position index
    const circle = circles[index];
    // On check si la couleur du cercle recupéré est celle de la solution
    if (circle.color === solution) setDifficulty(difficulty + 1);
    circle.isTried = true;
    setCircles([...circles]);
  };

  useEffect(() => {
    // On genere la solution
    const sol = generateColor();

    // On assigne la solution
    setSolution(sol);

    const generatedCircles = [];
    // On push dans un tableau x color
    for (let i = 0; i < difficulty; i++) {
      generatedCircles.push({ color: generateColor(), isTried: false });
    }
    // On recupere une position aléatoire dans le tableau circles
    const posSolution = Math.floor(Math.random() * (difficulty - 1));
    // On écrase la couleur stocké a la position préalablement recuperé par la couleur de la solution
    generatedCircles[posSolution].color = sol;
    // On met a jour circles via le set
    setCircles(generatedCircles);
  }, [difficulty]);

  return (
    <div className="App">
      <p>{solution}</p>
      <div className="circles">
        {circles &&
          circles.map((circle, index) => {
            return (
              <Circle
                isSolution={isSolution}
                key={`circle:${index}`}
                circle={circle}
                index={index}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
