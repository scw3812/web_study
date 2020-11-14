function Food({ name, picture }) {
  return (
    <div>
      <h2>I like {name}</h2>
      <img src={picture}/>
    </div>
  );
}

const foodILike = [
  {
    name: 'Kimchi',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQLZZUSXh58d9_fxQogvAbvkkB_6qEHqxmfGMpKM-ncyNE2_cMybSmAI42XhvM&usqp=CAc'
  },
  {
    name: 'Samgyeopsal',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQLZZUSXh58d9_fxQogvAbvkkB_6qEHqxmfGMpKM-ncyNE2_cMybSmAI42XhvM&usqp=CAc'
  },
  {
    name: 'Bibimbap',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQLZZUSXh58d9_fxQogvAbvkkB_6qEHqxmfGMpKM-ncyNE2_cMybSmAI42XhvM&usqp=CAc'
  }
];

function App() {
  return( 
    <div>
      {foodILike.map(dish => (<Food name={dish.name} picture={dish.image} />))}
    </div>
  );
}

export default App;