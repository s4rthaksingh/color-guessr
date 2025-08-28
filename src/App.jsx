import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [colors, setColors] = useState({});
  const [color, setColor] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const fetchColor = async () => {
      const response = await fetch("/colors.json");
      const result = await response.json();
      setColors(Object.entries(result));
    };
    fetchColor();
  }, []);


  useEffect(() => {
    document.querySelectorAll('button').forEach(btn => {
      if(btn.textContent !== 'New Color') btn.style.backgroundColor = '';
    });
    if(!colors.length > 0) return;
    let newoptions = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      if (newoptions.includes(randomIndex)) i--;
      else newoptions[i] = randomIndex;
    }

    setOptions(newoptions);

    setSelectedOption(Math.floor(Math.random() * 3));
  }, [colors, key]);

  useEffect(() => {
    if (options.length > 0 && colors.length > 0 && selectedOption !== undefined) {
      setColor(colors[options[selectedOption]]);
    }
  }, [options, selectedOption, colors]);

  function checkAnswer(answer, button) {
    if (answer == selectedOption) {button.style.backgroundColor = '#008000'; setShowRefreshButton(true)}
    else {button.style.backgroundColor = '#ee2400'};
  }

  if (!color || Object.keys(colors).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className="w-50 h-50 mb-30"
          style={{ backgroundColor: color[1] }}
        ></div>
        <div className="flex flex-row gap-5">
          <button 
            className="w-50 h-20" 
            style={{outline: 'none', boxShadow: 'none'}}
            onClick={(e) => checkAnswer(0, e.target)}
          >
            {colors[options[0]][0]}
          </button>
          <button 
            className="w-50 h-20" 
            style={{outline: 'none', boxShadow: 'none'}}
            onClick={(e) => checkAnswer(1, e.target)}
          >
            {colors[options[1]][0]}
          </button>
          <button 
            className="w-50 h-20" 
            style={{outline: 'none', boxShadow: 'none'}}
            onClick={(e) => checkAnswer(2, e.target)}
          >
            {colors[options[2]][0]}
          </button>
          <button 
            className="w-50 h-20" 
            style={{outline: 'none', boxShadow: 'none'}}
            onClick={(e) => checkAnswer(3, e.target)}
          >
            {colors[options[3]][0]}
          </button>
        </div>
        <button className="mt-15" style={{outline: 'none', boxShadow: 'none', backgroundColor:'#4caf50', }}           onClick={() => {
            // Reset button colors first, then update state
            document.querySelectorAll('button').forEach(btn => {
              if(btn.textContent !== 'New Color') btn.style.backgroundColor = '';
            });
            setSelectedOption(Math.floor(Math.random() * 3));
            setKey(key+1);
          }}
        >
          New Color
        </button>
      </div>
    </>
  );
}

export default App;
