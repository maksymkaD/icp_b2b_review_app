import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Review from './components/Review';
import Main from './Main';

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/embed/:id" element={<Review />} />
          {/* Other routes */}
        </Routes>
      </Router>
    );
}

export default App;
