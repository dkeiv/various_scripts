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
  const COLOR = '';
  const TOKEN = '';
  
  /* main */
  function clickHandle() {
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
  }

  function postToKen(value) {
    const url = `https://ken-backend.codegym.vn/boards/${BOARD_ID}/tasks`;
    const header = setHeader();
    const payload = setPayload(value);

    return fetch(url, {
      method: 'POST',
      headers: header,
      body: payload,
    });
  }

  function setHeader() {
    const header = new Headers();
    header.append('Accept', 'application/json, text/plain, */*');
    header.append('Authorization', `Bearer ${TOKEN}`);
    header.append('Content-type', 'application/json');
    return header;
  }

  function setPayload(value) {
    return JSON.stringify({
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
  }

  const css = `
  width: 50px;
  padding: 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  background-color: white;
  color: black;
  border: 2px solid #e7e7e7;`;
  const section = document.querySelector('h3.sectionname');
  const kenBtn = document.createElement('button');

  kenBtn.style.cssText = css;
  kenBtn.innerHTML = 'to Ken';
  kenBtn.addEventListener('click', () => clickHandle(kenBtn));
  section.appendChild(kenBtn);
})();
