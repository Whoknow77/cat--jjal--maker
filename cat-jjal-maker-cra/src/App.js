import React from "react";
import "./App.css";
import Title from "./components/Title";
import Form from "./components/Form";
import MainCard from "./components/MainCard";
import Favorites from "./components/Favorites";

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://http.cat";
  const response = await fetch(
    // `${OPEN_API_DOMAIN}/${text}.jpg`
    `https://dog.ceo/api/breeds/image/random`
  );
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

const App = () => {
  const CAT1 = "https://cataas.com/cat/HSENVDU4ZMqy7KQ0/says/react";
  // useState의 인자로 익명함수를 넣으면 페이지 로드 최초 1회에만 로컬 접근
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter");
  });

  const [MainCat, setMainCat] = React.useState(CAT1);

  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });

  const alreadyFavorite = favorites.includes(MainCat);

  async function setInitialCat() {
    const newCat = await fetchCat("test"); // 서버로부터 받은 고양이 이미지
    setMainCat(newCat);
  }

  // 함수를 원할때만 호출
  // []에 들어가는 값이 제어값, counter일 경우 : counter가 변할때마다 호출, 빈 값일경우, 초기에만!
  React.useEffect(() => {
    setInitialCat(); // 초기 고양이 사진 서버로부터 받아오기
  }, []);

  async function updateMainCat() {
    const newCat = await fetchCat("test"); // 서버로부터 받은 고양이 이미지
    setMainCat(newCat);

    // 생성을 여러번 눌렀을 때 딜레이 처리
    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    });
  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, MainCat];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  const counterTitle = counter === null ? "" : counter + "번째";

  return (
    <div>
      <Title>{counterTitle} 고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard
        img={MainCat}
        onHeartClick={handleHeartClick}
        alreadyFavorite={alreadyFavorite}
      />
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
