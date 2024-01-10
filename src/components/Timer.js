// Timer.js
import React, { useEffect, useState } from 'react';

const Timer = ({ timezone }) => {
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const fetchTime = async () => {
      // try {
      //   const response = await fetch(
      //       'https://api.ipgeolocation.io/timezone?apiKey=d1ed3bab77904ebcbffdebff0ae8adb1&tz=America/Los_Angeles',
      //     {
      //     method: 'GET',
			// }
      //   );
      //   const data = await response.json();
      //   setCurrentTime(data.date_time);
      // } catch (error) {
      //   console.error('Error fetching world time:', error);
      // }
    };

    // Fetch time on component mount
    fetchTime();

    // Update time every second
    const interval = setInterval(fetchTime, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div>
      <h2>Current Time ({timezone}):</h2>
      <p>{currentTime}</p>
    </div>
  );
};

export default Timer;
