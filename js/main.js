;
(function ($) {
    'use strict'

    const uri = "http://localhost:3000/schedulers";
    let campaigns = [];

    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function () {
        $(this).on('blur', function () {
            if (validate(this) == false) {
                showValidate(this)
            } else {
                $(this).parent().addClass('true-validate')
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100')

    $('.validate-form').on('submit', function () {
        var check = true

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i])
                check = false
            }
        }

        return check
    })

    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this)
            $(this).parent().removeClass('true-validate')
        })
    })

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false
            }
        } else {
            if ($(input).val().trim() == '') {
                return false
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent()

        $(thisAlert).addClass('alert-validate')

        $(thisAlert).append('<span class="btn-hide-validate">&#xf136;</span>')
        $('.btn-hide-validate').each(function () {
            $(this).on('click', function () {
                hideValidate(this)
            })
        })
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent()
        $(thisAlert).removeClass('alert-validate')
        $(thisAlert).find('.btn-hide-validate').remove()
    }

    function getCheckboxTimeValues() {
        var l0 = document.getElementById('checkbox0');
        var l1 = document.getElementById('checkbox1');
        var l2 = document.getElementById('checkbox2');
        var l3 = document.getElementById('checkbox3');
        var l4 = document.getElementById('checkbox4');
        var l5 = document.getElementById('checkbox5');
        var l6 = document.getElementById('checkbox6');
        var l7 = document.getElementById('checkbox7');
        var l8 = document.getElementById('checkbox8');
        var l9 = document.getElementById('checkbox9');
        var l10 = document.getElementById('checkbox10');
        var l11 = document.getElementById('checkbox11');
        var l12 = document.getElementById('checkbox12');
        var l13 = document.getElementById('checkbox13');
        var l14 = document.getElementById('checkbox14');
        var l15 = document.getElementById('checkbox15');
        var l16 = document.getElementById('checkbox16');
        var l17 = document.getElementById('checkbox17');
        var l18 = document.getElementById('checkbox18');
        var l19 = document.getElementById('checkbox19');
        var l20 = document.getElementById('checkbox20');
        var l21 = document.getElementById('checkbox21');
        var l22 = document.getElementById('checkbox22');
        var l23 = document.getElementById('checkbox23');
        var values = []
        if (l0.checked == true) {
            values.push(0)
        }
        if (l1.checked == true) {
            values.push(1)
        }
        if (l2.checked == true) {
            values.push(2)
        }
        if (l3.checked == true) {
            values.push(3)
        }
        if (l4.checked == true) {
            values.push(4)
        }
        if (l5.checked == true) {
            values.push(5)
        }
        if (l6.checked == true) {
            values.push(6)
        }
        if (l7.checked == true) {
            values.push(7)
        }
        if (l8.checked == true) {
            values.push(8)
        }
        if (l9.checked == true) {
            values.push(9)
        }
        if (l10.checked == true) {
            values.push(10)
        }
        if (l11.checked == true) {
            values.push(11)
        }
        if (l12.checked == true) {
            values.push(12)
        }
        if (l13.checked == true) {
            values.push(13)
        }
        if (l14.checked == true) {
            values.push(14)
        }
        if (l15.checked == true) {
            values.push(15)
        }
        if (l16.checked == true) {
            values.push(16)
        }
        if (l17.checked == true) {
            values.push(17)
        }
        if (l18.checked == true) {
            values.push(18)
        }
        if (l19.checked == true) {
            values.push(19)
        }
        if (l20.checked == true) {
            values.push(20)
        }
        if (l21.checked == true) {
            values.push(21)
        }
        if (l22.checked == true) {
            values.push(22)
        }
        if (l23.checked == true) {
            values.push(23)
        }
        return values
    }

    function addCampaign() {
        const nameInputText = document.getElementById('name')
        const urlInputText = document.getElementById('url')
        const msgIntraInputText = document.getElementById('messageIntransit')
        const msgDevInputText = document.getElementById('messageDelivered')
        const timeValues = getCheckboxTimeValues();
        const item = {
            hours: timeValues,
            message_in_transit: msgIntraInputText.value.trim(),
            message_delivered: msgDevInputText.value.trim(),
            link_url: urlInputText.value.trim(),
            name: nameInputText.value.trim(),
            account_id: 1,
            status: "START"
        }
        fetch(uri, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Origin': 'http://localhost:3000',
                    // 'Access-Control-Allow-Credentials': true,
                    // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    // 'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept'
                },
                body: JSON.stringify(item)
            })
            .then(response => response.json())
            .then(() => {
                $('.container-contact100').fadeOut(300);
                getCampaigns();
                nameInputText.value = '';
                urlInputText.value = '';
                msgIntraInputText.value = '';
                msgDevInputText.value = '';
                showMessageSuccess();
            })
            .catch(error => $('.alert-danger').alert())
    }

    function getCampaigns() {
        fetch(uri, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': false,
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept'
                }
            })
            .then(response => response.json())
            .then(data => _displayItems(data))
            .catch(error => console.error("Unable to get campaigns.", error));

        // $.ajax({
        //     url: uri, // this is the submit URL
        //     type: 'GET', // or POST
        //     // data: $('.contact100-form').serialize(),
        //     success: function (data) {
        //         console.log(data + ' sdfsffsfds')
        //         alert('successfully submitted')
        //     }
        // })
    }

    function deleteBookItem() {
        const itemId = document.getElementById('delete-id').value.trim()
        fetch(`${uri}/${itemId}`, {
                method: 'DELETE'
            })
            .then(() => getBookItems())
            .catch(error => console.error('Unable to delete Book.', error))
    }

    function _displayItems(data) {
        const tBody = document.getElementById("campaigns");
        tBody.innerHTML = "";
        // _displayCount(data.length);
        const button = document.createElement("button");

        data.forEach(item => {
            let editButton = document.createElement("a");
            editButton.href = "#editEmployeeModal";
            editButton.className = "edit";
            // editButton.setAttribute("onclick", `displayEditForm(${item.id})`);
            editButton.setAttribute("data-toggle", "modal");
            editButton.innerHTML =
                "<i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i>";

            let deleteButton = document.createElement("a");
            deleteButton.href = "#deleteCampaignModal";
            deleteButton.className = "delete";
            // deleteButton.setAttribute("onclick", `displayDeleteForm(${item.id})`);
            deleteButton.setAttribute("data-toggle", "modal");
            deleteButton.innerHTML =
                "<i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i>";

            let tr = tBody.insertRow();

            let td1 = tr.insertCell(0);
            let textTitle = document.createTextNode(item.name);

            td1.appendChild(textTitle);

            let td2 = tr.insertCell(1);
            let textAuthor = document.createTextNode(item.link_url);
            td2.appendChild(textAuthor);

            let td3 = tr.insertCell(2);
            let textPublisher = document.createTextNode(item.message_in_transit);
            td3.appendChild(textPublisher);

            let td4 = tr.insertCell(3);
            let textGenre = document.createTextNode(item.message_delivered);
            td4.appendChild(textGenre);

            let td6 = tr.insertCell(4);
            td6.appendChild(editButton);
            td6.appendChild(deleteButton);
        });

        campaigns = data;
    }

    function _displayCount(itemCount) {
        const name = itemCount === 1 ? "entry" : "entries";
        document.getElementById(
            "counter"
        ).innerHTML = `Showing <b>${itemCount}</b> ${name}`;
    }

    function showMessageSuccess() {
        $('.alert-success').fadeIn(1000);
        setTimeout(function () {
            $('.alert-success').fadeOut(1000);
        }, 3000);
    }

    function showMessageError() {
        $('.alert-danger').fadeIn(1000);
        setTimeout(function () {
            $('.alert-danger').fadeOut(1000);
        }, 3000);
    }

    /*==================================================================
    [ Show / hide contact ]*/
    $('.btn-hide-contact100').on('click', function () {
        $('.container-contact100').fadeOut(300)
    })

    $('.btn-show-contact100').on('click', function () {
        $('.container-contact100').fadeIn(300)
    })
    $('.btn-hide-contact101').on('click', function () {
        $('.container-contact101').fadeOut(300)
    })

    $('.btn-show-contact101').on('click', function () {
        $('.container-contact101').fadeIn(300)
    })
    getCampaigns();
    // Handle save model
    $('.contact100-form-btn').on('click', function (e) {
        // console.log('sdfsfs')
        e.preventDefault()
        // $.ajax({
        //     url: 'http://localhost:3000/schedulers', // this is the submit URL
        //     type: 'POST', // or POST
        //     data: $('.contact100-form').serialize(),
        //     success: function (data) {
        //         console.log(data + ' sdfsffsfds')
        //         alert('successfully submitted')
        //     }
        // })
        addCampaign();
    })
})(jQuery)