var params = new URLSearchParams( window.location.search );


//jQuery references
var divUsuarios = $('#divUsuarios');


// User rendering functions

function renderUsers( persons ) {
    console.log(persons);

    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('room') + '</span></a>';
    html += '</li>';

    for (var i = 0; i<persons.length; i++ ){
        html += '<li>';
        html += '    <a data-id="' + persons[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + persons[i].name + ' <small class="text-success">online</small></span></a>';
        html += '</li>';   
    }

    divUsuarios.html(html);

}