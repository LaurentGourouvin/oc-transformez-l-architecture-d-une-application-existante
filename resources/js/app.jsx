import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    return <h1>React fonctionne !</h1>;
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
