var listTo = document.querySelector('.listTo');
var sendData = document.querySelector('.btn-addNew');
var data = JSON.parse(localStorage.getItem('listData')) || [];
var control = true;

sendData.addEventListener('click', addlistTo);
listTo.addEventListener('click', listDone);
listTo.addEventListener('click', listEdit);
updateList(data);

function addlistTo(e) {
  e.preventDefault();

  var text1 = document.querySelector('.event1').value;
  var text2 = document.querySelector('.event2').value;
  var text3 = document.querySelector('.event3').value;
  var todo = {
    content1: text1,
    content2: text2,
    content3: text3,
  };
  data.push(todo);
  updateList(data);
  localStorage.setItem('listData', JSON.stringify(data));
};

function updateList(items) {
  str = '';
  var len = items.length;

  for(var i =0; len > i; i++){
    str += '<li><div>' + items[i].content1 +'</div><div>'+items[i].content2+'</div><div>' +items[i].content3 + '</div><i class="fas fa-pencil-alt" data-listnum=' + i + ' ></i><i class="fas fa-trash-alt" data-listnum=' + i + ' ></i></li>';
  }
  listTo.innerHTML = str;
};

function listDone(e) {
  e.preventDefault();
  if(e.target.className !== 'fas fa-trash-alt'){return};

  var listnum = e.target.dataset.listnum;
  data.splice(listnum, 1);

  localStorage.setItem('listData', JSON.stringify(data));
  updateList(data);
};

function listEdit(e){
  e.preventDefault();
  if(e.target.tagName !== 'DIV'){return}

  var bbefore = e.target;
  bbefore.innerHTML = "<input class="+'"putSomething"'+'type="text">'
  var nnewinput = document.getElementsByClassName('putSomething')[0]

  document.querySelector('.fa-pencil-alt').onclick = function(){
    bbefore.innerText = nnewinput.value
    var text1 = e.target.parentNode.children[0].innerText;
    var text2 = e.target.parentNode.children[1].innerText;
    var text3 = e.target.parentNode.children[2].innerText;
    var todo = {
      content1: text1,
      content2: text2,
      content3: text3,
    };
    data.push(todo);
    var el = e.target.parentNode
    data.splice(el, 1);

    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));
  }
}
