//handles adding a new user and editing a user
$('#serverSuccessMessage, #serverErrorMessage').hide();
//creates user object
function submitUser(event) {
    event.preventDefault();
    clearErrorStates();
    var user = {
        _id: getId(),
        name: getName(),
        bar: getBar(),
        Max: getMax()
    };

    if (validate(user)) {
        //iterates through all maxes and sets the weight
        user.Max.map(function(max) {
            max.Weight = parseFloat(max.Weight);
        });
        //when you add a users stays on that page / if editing stays there and updates
        $.ajax({
            method: 'PUT',
            data: {user: JSON.stringify(user)},
            url: '/user'
        })
            .done(function(result){
                $('#serverSuccessMessage').show();
            })
            .fail(function(err){
                $('#serverErrorMessage').show();
            })
    }
    return false;
}
//changes inputs to error state and displays messages
function setErrorState(inputName, errorName) {
    $('#' + inputName + 'FormGroup').addClass('has-error');
    $('#' + inputName + 'FormGroup .' + errorName + '-message').addClass('active');
}
//checks if name is entered and valid
function validate(user) {
    var isValid = true;
    if (!isPresent(user.name)) {
        setErrorState('name', 'required');
        isValid = false;
    } else if (!validName(user.name)) {
        setErrorState('name', 'pattern');
        isValid = false;
    }
    //checks that entered maxs are present, numeric and within range
    user.Max.map(function(max) {
        var inputName = maxInputName(max);
        if (!isPresent(max.Weight)) {
            setErrorState(inputName, 'required');
            isValid = false;
        } else if (!isNumeric(max.Weight)) {
            setErrorState(inputName, 'numeric');
            isValid = false;
        } else if (!minimumLift(max.Weight)) {
            setErrorState(inputName, 'minimum');
            isValid = false;
        } else if (!maximumLift(max.Weight)) {
            setErrorState(inputName, 'maximum');
            isValid = false;
        }
    });
    return isValid;
}
//get dynamic field name
function maxInputName(max) {
    return 'max_' + max.LiftType.split(' ').join('_');
}
function isPresent(val) {
    return val !== '';
}
function isNumeric(val) {
    var numericVal = parseFloat(val);
    return val == numericVal;
}
//limited name to certain characters
function validName(val) {
    return /^[A-Za-z, -]+$/.test(val);
}
function minimumLift(val) {
    var bar = getBar();
    return parseFloat(val) >= bar;
}
function maximumLift(val) {
    return parseFloat(val) <= 500;
}
//clears out any error messages
function clearErrorStates() {
    $('.form-group').removeClass('has-error');
    $('.help-block').removeClass('active');
    $('#serverSuccessMessage').hide();
    $('#serverErrorMessage').hide();
}
//gets id of the user
function getId() {
    return $('input[name="_id"]').val();
}
function getName() {
    return $('input[name="name"]').val();
}
function getBar() {
    return $('select[name="bar"]').val();
}
//builds array of max lifts
function getMax() {
    var maxInputs = $('input[name^="max"]');
    var Max = [];
    maxInputs.each(function(index, element) {
        element = $(element);
        Max.push({
            LiftType: fromMaxInputName(element.attr('name')),
            Weight: element.val()
        });
    });
    return Max;
}
//gets name of lift type form input
function fromMaxInputName(maxInputName) {
    return maxInputName.split('_').slice(1).join(' ');
}