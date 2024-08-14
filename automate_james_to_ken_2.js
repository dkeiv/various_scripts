(function () {
  'use strict';

  /* configuration */
  const BOARD_ID = '';
  const TODAY_COLUMN = 0;
  const BACKLOG_COLUMN = 0;
  const CURRENT_COLUMN = BACKLOG_COLUMN;

  const WEEK_1 = 0;
  const WEEK_2 = 0;
  const WEEK_3 = 0;
  const CURRENT_WEEK = WEEK_1;

  const TIME_ESTIMATED = 30;
  const COLOR = 'f2d600';

  const TOKEN = '';
  const ENCODED_TOKEN = encodeURIComponent(TOKEN); // some utf8 issue
  console.log(ENCODED_TOKEN);

  /* main */

  async function postToKen(value) {
    const url = `https://ken-backend.codegym.vn/boards/${BOARD_ID}/tasks`;

    const header = new Headers();
    header.append('Accept', 'application/json, text/plain, */*');
    header.append('Authorization', `Bearer ${ENCODED_TOKEN}`);
    header.append('Content-type', 'application/json');

    const payload = JSON.stringify({
      board_id: BOARD_ID,
      color: COLOR,
      column_id: CURRENT_COLUMN,
      description: null,
      position: 0,
      swimlane_id: CURRENT_WEEK,
      time_estimated_type: 'minutes',
      time_estimated: TIME_ESTIMATED,
      title: value,
    });

    return await fetch(url, {
      method: 'POST',
      headers: header,
      body: payload,
    });
  }

  function handleClick(section) {
    const units = section.querySelectorAll('span.instancename');
    const titleList = [];
    units.forEach((unit) => {
      const unitTitle = unit.firstChild.data;
      units.push(unitTitle);
    });

    titleList.forEach((title) => {
      postToKen(title)
        .then((res) => {
          console.log(`status: ${res.status}`);
        })
        .catch((err) => {
          console.log(`error: ${err}`);
        });
    });
  }

  function makeKenBtn(section) {
    const btn = document.createElement('button');
    btn.innerHTML = 'to Ken';
    btn.addEventListener('click', () => handleClick(section));
    return btn;
  }

  document.querySelectorAll('li.section:not(:first-child)').forEach((section) => {
    const kenBtn = makeKenBtn(section);
    node.appendChild(kenBtn);
  });
})();
