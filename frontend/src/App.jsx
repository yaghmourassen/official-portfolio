import Home from './pages/home'; // Importe ton composant Home
// Si tu as un fichier CSS global pour App, tu peux le garder :
import './App.css'; 

function App() {
  return (
    <div className="App">
      <Home /> {/* Affiche ta page Home */}
    </div>
  );
}

export default App;