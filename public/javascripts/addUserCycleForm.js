$('form, #serverErrorMessage').hide();
function toggleForm() {
    $('#serverErrorMessage').hide();
    $('form, #formToggle').toggle();
}
function addUserCycle(event) {
    event.preventDefault();
    clearErrorStates();
    var userCycle = {
        user: getUser(),
        cycle: getCycle(),
        startDate: getStartDate()
    };
    if (validate(userCycle)) {
        $.ajax({
            method: 'PUT',
            data: {userCycle: JSON.stringify(userCycle)},
            url: '/userCycle'
        })
            .done(function(result){
                updateCycleList(userCycle, result._id);
                toggleForm();
            })
            .fail(function(err){
                $('#serverErrorMessage').toggle();
            });
    }
    return false;
}
function updateCycleList(userCycle, id) {
    var newUserCycleListItem = $(
        '<a class="btn btn-success btn-new btn-cycle" href="/user/cycle/' + id + '">' +
        '    <span class="col-sm-6">Cycle: ' + getCycleName(userCycle.cycle) + '</span>' +
        '    <span class="col-sm-6">StartDate: ' + dateFormat(userCycle.startDate) + '</span>' +
        '</a>'
    );
    $('#userCycleList').append(newUserCycleListItem);
}
function getCycleName(id) {
    return $('option:selected').text();
}
function dateFormat(date) {
    return moment(date).format('MMMM Do, YYYY');
}
function clearErrorStates() {
    $('.form-group').removeClass('has-error');
    $('.help-block').removeClass('active');
    $('#serverErrorMessage').hide();
}
function setErrorState(inputName, errorName) {
    $('#' + inputName + 'FormGroup').addClass('has-error');
    $('#' + inputName + 'FormGroup .' + errorName + '-message').addClass('active');
}
function validate(userCycle) {
    var isValid = true;
    if (!isDate(userCycle.startDate)) {
        setErrorState('startDate', 'date');
        isValid = false;
    }
    return isValid;
}
function isDate(val) {
    return moment(val, 'YYYY-MM-DD', true).isValid();
}
function getUser() {
    return $('input[name="user"]').val();
}
function getCycle() {
    return $('select[name="cycle"]').val();
}
function getStartDate() {
    return $('input[name="startDate"]').val();
}