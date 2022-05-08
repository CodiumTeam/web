import React from 'react';
import Img from '../../../../img/challenges/dev.png';

export function UserStory() {
  return (
    <div className="card modal text-left">
      <div className="wrapper">
        <img src={Img} />
      </div>
      <div className="kata-explanation">
        <h2>Leap Years Kata</h2>

        <h4>User Story</h4>
        <p>
          As a user, I want to know if a year is a leap year, So that I can plan
          for an extra day on February 29th during those years.
        </p>

        <h4>Acceptance criteria</h4>
        <ul>
          <li>
            All years divisible by 400 ARE leap years (so, for example, 2000 was
            indeed a leap year),
          </li>
          <li>
            All years divisible by 100 but not by 400 are NOT leap years (so,
            for example, 1700, 1800, and 1900 were NOT leap years, NOR will 2100
            be a leap year),
          </li>
          <li>
            All years divisible by 4 but not by 100 ARE leap years (e.g., 2008,
            2012, 2016),
          </li>
          <li>
            All years not divisible by 4 are NOT leap years (e.g. 2017, 2018,
            2019).
          </li>
        </ul>
      </div>
    </div>
  );
}
