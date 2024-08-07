import './App.css';
import Catalog from './components/Catalog';
import Gmm from './components/Gmm';
import AddFields from './components/Catalog/AddFields';
import UpdateGmm from './components/Gmm/UpdateGmm';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { CatalogProvider } from './contexts/CatalogContext';
import { AreaProvider } from './contexts/AreaContext';
import { FaultProvider } from './contexts/FaultContext';
import { GmmProvider } from './contexts/GmmContext';
import { LocationProvider } from './contexts/LocationContext';
function App() {

  return (
    <Router>

      <LocationProvider> {/* Ana uygulama bağlamını sarmalayın */}
      <GmmProvider> {/* Ana uygulama bağlamını sarmalayın */}
      <AreaProvider> {/* Ana uygulama bağlamını sarmalayın */}
        <FaultProvider> {/* Ana uygulama bağlamını sarmalayın */}
          <CatalogProvider> {/* Ana uygulama bağlamını sarmalayın */}
            <div className="App">
              <header className="top-header">
                <nav className="top-nav">
                  <ul>
                    <li>
                      <NavLink className="nav-link" activeclassname="active" to="/">Catalog</NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" activeclassname="" to="/gmm">GMM</NavLink>
                    </li>
                  </ul>
                </nav>
              </header>
              <div id='container'>
                <div className='headerContainer'>
                  <div className='imgcontainer'>
                    <img className='img-with-shadow' src="/logo-2x.png" alt="Logo" />
                  </div>
                </div>
                <Routes>
                  <Route path="/" exact element={<Catalog />} />
                  <Route path="/gmm" exact element={<Gmm/>} />
                  <Route path="/catalog/:id" element={<AddFields />} />
                  <Route path="/gmm/:id" element={<UpdateGmm />} />
                </Routes>
              </div>
            </div> </CatalogProvider>
        </FaultProvider>
      </AreaProvider>
      </GmmProvider>
      </LocationProvider>

    </Router>
  );
}

export default App;
