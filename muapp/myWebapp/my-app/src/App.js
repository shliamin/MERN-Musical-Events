// import React, { useState, useEffect } from "react";
// import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import * as parkDate from "./data/skateboard-parks.json";

// export default function App() {
//   const [viewport, setViewport] = useState({
//     latitude: 45.4211,
//     longitude: -75.6903,
//     width: "100vw",
//     height: "100vh",
//     zoom: 10
//   });
//   const [selectedPark, setSelectedPark] = useState(null);

//   useEffect(() => {
//     const listener = e => {
//       if (e.key === "Escape") {
//         setSelectedPark(null);
//       }
//     };
//     window.addEventListener("keydown", listener);

//     return () => {
//       window.removeEventListener("keydown", listener);
//     };
//   }, []);

//   return (
//     <div>
//       <ReactMapGL
//         {...viewport}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//         onViewportChange={viewport => {
//           setViewport(viewport);
//         }}
//       >
//         {parkDate.features.map(park => (
//           <Marker
//             key={park.properties.PARK_ID}
//             latitude={park.geometry.coordinates[1]}
//             longitude={park.geometry.coordinates[0]}
//           >
//             <button
//               className="marker-btn"
//               onClick={e => {
//                 e.preventDefault();
//                 setSelectedPark(park);
//               }}
//             >
//               <img src="/skateboarding.svg" alt="Skate Park Icon" />
//             </button>
//           </Marker>
//         ))}

//         {selectedPark ? (
//           <Popup
//             latitude={selectedPark.geometry.coordinates[1]}
//             longitude={selectedPark.geometry.coordinates[0]}
//             onClose={() => {
//               setSelectedPark(null);
//             }}
//           >
//             <div>
//               <h2>{selectedPark.properties.NAME}</h2>
//               <p>{selectedPark.properties.DESCRIPTIO}</p>
//             </div>
//           </Popup>
//         ) : null}
//       </ReactMapGL>
//     </div>
//   );
// }


import React, {useState} from 'react';
import GoalList from './Components/GoalList';
import NewGoal from './Components/NewGoal'

const App = () => {
  const [courseGoals, setCourseGoals] = useState([
    {id: 'cg1', text: 'Finish the Course'},
    {id: 'cg2', text: 'Learn all topics'},
    {id: 'cg3', text: 'Help other students'}
  ]);

  const appNewGoalHandler = (newGoal) => {
    // setCourseGoals(courseGoals.concat(newGoal));
    setCourseGoals((prevCourseGoals) => {
      return prevCourseGoals.concat(newGoal);
    });
  };
  // return React.createElement('h1', {}, 'Hi, this is React!');
  // or alternative JSX syntax:
  return <div className="course-goals">
    <h2>Course Goals</h2>
    <NewGoal onAddGoal={appNewGoalHandler}/>
    <GoalList goals={courseGoals}/>
  </div>;
};

export default App;
