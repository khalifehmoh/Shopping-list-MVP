//state object
var state = {
  items : [],
  checked: []
}

//state modification functions
var addItem = function (state, item) {
	state.items.push(item);
  state.checked.push(false)
}

var deleteItem = function (state, itemIndex) {
  state.items.splice(itemIndex, 1);
  state.checked.splice(itemIndex, 1);
}

//render functions
var renderlist = function(state,element,index){
    var itemsList = state.items.map(function(item, indexOf){
      return "<li>\n" + 
        `<span class=\"${ state.checked[indexOf] ? "shopping-item shopping-item__checked" : "shopping-item"}\">` + item +  "</span>\n" + 
        "<div class=\"shopping-item-controls\">\n" +
          "<button class=\"shopping-item-toggle\">\n" + 
            `<span class=\"button-label\">${ state.checked[indexOf] ? "uncheck" : "check"}</span>\n`+
          "</button>\n" +
          "<button class=\"shopping-item-delete\">\n" +
            "<span class=\"button-label\">delete</span>\n" +
          "</button>\n" +
        "</div>\n" +
        "</li>\n";
    });
    element.html(itemsList);
};

//event listen
function handleFormSubmit() {
$('#js-shopping-list-form').submit(function(event){
	event.preventDefault();
	addItem(state, $('#shopping-list-entry').val());
	renderlist(state, $('.shopping-list'));
  this.reset();
  })
}

function handleRemove() {
$('ul').on('click', '.shopping-item-delete' , function(event){
  var index = $(this).closest('li').index();
  deleteItem(state, index);
  renderlist(state, $('.shopping-list'));
  })
}

function handleCheck() {
$('ul').on('click', '.shopping-item-toggle' , function(event){
    var index = $(this).closest('li').index(); 
    state.checked[index] = !state.checked[index];
    renderlist(state, $('.shopping-list'), index)
  })
}



$(function() {
  handleFormSubmit();
  handleRemove();
  handleCheck()
})





