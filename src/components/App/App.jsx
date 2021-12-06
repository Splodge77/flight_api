import React from 'react';
import BpkText from 'bpk-component-text';
import FlightCard from './FlightCard';

import Header from '../Header';

import STYLES from './App.scss';

const getClassName = (className) => STYLES[className] || 'UNKNOWN';


const App = () => (
  <div className={getClassName('App')}>
    <Header />
    <main className={getClassName('App__main')}>

      <FlightCard itinerary="it_1"/>
      <FlightCard itinerary="it_2"/>
      <FlightCard itinerary="it_3"/>
    </main>
  </div>
);

export default App;
