(function () {
  'use strict';

  /* configuration */
  const BOARD_ID = '';
  const TODAY_COLUMN = 0;
  const BACKLOG_COLUMN = 0;
  const CURRENT_COLUMN = TODAY_COLUMN;

  const WEEK_1 = 0;
  const WEEK_2 = 0;
  const WEEK_3 = 0;
  const CURRENT_WEEK = WEEK_1;

  const TIME_ESTIMATED = 0;
  const COLOR = '';
  const TOKEN = '';
  const ENCODED_TOKEN = encodeURIComponent(TOKEN); // some utf8 issue

  /* main */
  const titleList = [];
  const query = 'div.single-section span.instancename';
  const items = document.querySelectorAll(query);

  items.forEach((item) => {
    titleList.push(item.firstChild.data);
  });

  titleList.forEach((title) => {
    postToKen(title)
      .then((res) => {
        console.log(`success: ${res.status}`);
      })
      .catch((err) => {
        console.log(`error: ${err}`);
      });
  });

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
})();
