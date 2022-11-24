let detailsObj = {
  'first': '',
  'last': '',
  'addr': ''
}
let detailsArr = []
let r = localStorage.getItem('contacts');
if (r) {
  detailsArr = JSON.parse(r)
}
getFromLocal();

btn.addEventListener('click', () => {
  checkValidity();
  let recheck = document.querySelector('.warning')
  if (recheck) {
    console.log('check')
  }
  else {
    document.querySelector('.prevContainer').style.display = 'initial';
    let ifh2 = document.querySelector('.log')
    if (ifh2) {
      ifh2.style.display = 'none';
    }
    detailsObj.first = fName.value;
    detailsObj.last = lName.value;
    detailsObj.addr = address.value;
    detailsArr.push(detailsObj);
    saveToLocal(JSON.stringify(detailsArr));
    tbldata.innerHTML = ''
    getFromLocal();
    clearInput();
  }
})

function saveToLocal(data) {
  localStorage.setItem('contacts', data)
}
function noData() {
  h2 = document.createElement('h2')
  h2.innerHTML = 'No contacts added.'
  h2.setAttribute('class', 'log')
  document.querySelector('.flex').appendChild(h2)
  document.querySelector('.prevContainer').style.display = 'none';
}
function getFromLocal() {
  let savedData = JSON.parse(localStorage.getItem('contacts'));
  if (savedData) {
    detailsArr = savedData;
    if (detailsArr.length === 0) {
      noData();
    }
    else {
      let tbl = document.createElement('table');
      tbl.setAttribute('class', '.table')
      tbl.innerHTML = `<tr>
          <th>S.N.</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Address</th>
        </tr>`
      document.querySelector('#tbldata').appendChild(tbl)
      savedData.forEach((element, index) => {
        let elem = document.createElement('tr')
        elem.innerHTML = `<td>${index + 1}</td>
          <td>${savedData[index].first}</td>
          <td>${savedData[index].last}</td>
          <td>${savedData[index].addr}</td>
          <td><svg id='${index}' onclick='remove(this.id)' clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m22 6c0-.552-.448-1-1-1h-12.628c-.437 0-.853.191-1.138.523-1.078 1.256-3.811 4.439-4.993 5.815-.16.187-.241.419-.241.651 0 .231.08.463.24.651 1.181 1.38 3.915 4.575 4.994 5.835.285.333.701.525 1.14.525h12.626c.552 0 1-.448 1-1 0-2.577 0-9.423 0-12zm-13.628.5h12.128v11h-12.126l-4.715-5.51zm5.637 4.427 1.71-1.71c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.384-.219.531l-1.711 1.711 1.728 1.728c.147.147.22.339.22.53 0 .427-.349.751-.75.751-.192 0-.384-.073-.531-.219l-1.728-1.729-1.728 1.729c-.146.146-.339.219-.531.219-.401 0-.75-.324-.75-.751 0-.191.073-.383.22-.53l1.728-1.728-1.788-1.787c-.146-.148-.219-.339-.219-.532 0-.425.346-.749.751-.749.192 0 .384.073.53.219z" fill-rule="nonzero"/></svg></td>`
        tbl.appendChild(elem)
      })
    }
  }
  else {
    noData();
  }
}

function checkValidity() {
  if (fName.value == '') {
    fName.classList.add('warning')
  }
  else {
    fName.classList.remove('warning')
  }
  if (lName.value == '') {
    lName.classList.add('warning')
  }
  else {
    lName.classList.remove('warning')
  }
  if (address.value == '') {
    address.classList.add('warning')
  }
  else {
    address.classList.remove('warning')
  }
}

function clearInput() {
  fName.value = ''
  lName.value = ''
  address.value = ''
}

function remove(id) {
  detailsArr.splice(id, 1);
  saveToLocal(JSON.stringify(detailsArr));
  tbldata.innerHTML = ''
  getFromLocal();
}