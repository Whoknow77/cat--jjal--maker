function Favorites({ favorites }) {
  return (
    <ul className="favorites">
      {favorites.map((cat) => (
        <CatItem img={cat} key={cat} />
      ))}
    </ul>
  );
}
function CatItem(props) {
  return (
    <li>
      <img src={props.img} alt="" />
    </li>
  );
}

export default Favorites;
