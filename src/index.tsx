import React from 'react';
import './index.css';
import { render } from 'react-dom';
import { App } from './App';
import { ContentProvider } from './lib/ContentContext';
render(<ContentProvider>
    <App />
  </ContentProvider>, document.getElementById('root'));