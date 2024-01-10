// TimezoneSelector.js
import React from 'react';

const TimezoneSelector = ({ onSelect }) => {
  const timezones = ['PST', 'IST'];

  return (
    <div>
      <label>Select Timezone: </label>
      <select onChange={(e) => onSelect(e.target.value)}>
        {timezones.map((timezone) => (
          <option key={timezone} value={timezone}>
            {timezone}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimezoneSelector;
