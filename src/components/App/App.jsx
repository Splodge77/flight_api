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

      <FlightCard legId="leg_1" itinerary="it_1"/>
    </main>
  </div>
);

export default App;
