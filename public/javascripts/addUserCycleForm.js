//handles when a user clicks the add new cycle button
//hides form depending on what is clicked
$('form, #serverErrorMessage').hide();
function toggleForm() {
    $('#serverErrorMessage').hide();
    $('form, #formToggle').toggle();
}
//stops form from submitting to a url --uses javascript instead
//gets all info and stores it as an object
function addUserCycle(event) {
    event.preventDefault();
    clearErrorStates();
    var userCycle = {
        user: getUser(),
        cycle: getCycle(),
        startDate: getStartDate()
    };
    //ajax sends a string of the userCycle info to the backend
    if (validate(userCycle)) {
        $.ajax({
            method: 'PUT',
            data: {userCycle: JSON.stringify(userCycle)},
            url: '/userCycle'
        })
            //when done form is toggled off
            .done(function(result){
                updateCycleList(userCycle, result._id);
                toggleForm();
            })
            //shows error messages if needed
            .fail(function(err){
                $('#serverErrorMessage').toggle();
            });
    }
    return false;
}
//updates user cycle right away and makes the new one green to stand out
function updateCycleList(userCycle, id) {
    var newUserCycleListItem = $(
        '<a class="btn btn-success btn-new btn-cycle" href="/user/cycle/' + id + '">' +
        '    <span class="col-sm-6">Cycle: ' + getCycleName(userCycle.cycle) + '</span>' +
        '    <span class="col-sm-6">StartDate: ' + dateFormat(userCycle.startDate) + '</span>' +
        '</a>'
    );
    $('#userCycleList').append(newUserCycleListItem);
}
//gets the selected cycle text from combo box
function getCycleName(id) {
    return $('option:selected').text();
}
//formats the date so all dates look the same
function dateFormat(date) {
    return moment(date).format('MMMM Do, YYYY');
}
//clears out error on resubmit
function clearErrorStates() {
    $('.form-group').removeClass('has-error');
    $('.help-block').removeClass('active');
    $('#serverErrorMessage').hide();
}
//sets inputs to error state and showing error messages
function setErrorState(inputName, errorName) {
    $('#' + inputName + 'FormGroup').addClass('has-error');
    $('#' + inputName + 'FormGroup .' + errorName + '-message').addClass('active');
}
//validates the date
function validate(userCycle) {
    var isValid = true;
    if (!isDate(userCycle.startDate)) {
        setErrorState('startDate', 'date');
        isValid = false;
    }
    return isValid;
}
//validates date
function isDate(val) {
    return moment(val, 'YYYY-MM-DD', true).isValid();
}
//gets the id input for user, cycle and start date
function getUser() {
    return $('input[name="user"]').val();
}
function getCycle() {
    return $('select[name="cycle"]').val();
}
function getStartDate() {
    return $('input[name="startDate"]').val();
}