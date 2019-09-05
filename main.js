var imageData;
var selectedImage=null;
function validateContactDetails() {
    if (document.myForm.Name.value == "") {
        return false;
    }
    if (document.myForm.Email.value == "") {
        alert("Please provide your Email!");
        return false;
    }
    if (!document.myForm.Email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        alert("please enter valid email address");
        return false;
    }
    return true
}
$(document).ready(function () {
    $.getJSON("main.json", function (data) {
       imageData=data;
        //console.log(imageData);
        if (localStorage.getItem('images') == null) {
            localStorage.setItem('images', JSON.stringify(imageData));
        }
        else {
            imageData = JSON.parse(localStorage.getItem('images'));
        }
        $.each(imageData.images, function (index, value) {
            $(".grid").append("<img src='" + value.url + "' />");
            $("#rig").append(" <li>"+"<div class='rig-cell' >" +"<img class='rig-img' src='" + value.url + "' />"+ "<input type='button' class='rig-button' value='update' onclick='ImageClickHandler("  + index + "); unhide();' />"+
            "<input type='button' class='rig-button' value='delete' onclick='deleteImage(" + index + ");'/>"+"</div></li>");
        });
    });
})

function ImageClickHandler(imageNo) {
    selectedImage = imageNo;
    setFields();
}




function setFields() {
    images = imageData.images;
    $("#url").val(images[selectedImage]["url"]);
    $("#name").val(images[selectedImage]["name"]);
    $("#information").val(images[selectedImage]["information"]);
    $("#uploadDate").val(images[selectedImage]["uploadDate"]);
}



function unhide() {
    var setting = document.getElementById("formDisplay");
    if (setting.style.display === "none") {
        setting.style.display = "block";
    }
}


function formDis() {
    var setting = document.getElementById("formDisplay");
    if (setting.style.display == 'none')
        setting.style.display = 'block';
    else
        setting.style.display = 'none';
}
function validateImageDetails() {
  if (!document.imageForm.url.value.match(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}$/)) {
       alert("please enter valid URL");
       return false;
    }
    if (new Date(document.imageForm.uploadDate.value) > new Date(Date.now())) {
        alert("please enter valid date");
        return false;
    }

    return true;
}
function addImage() {
    if (validateImageDetails()) {
        var elements = document.getElementById("imageForm").elements;
        var obj = {};
        for (var i = 0; i < elements.length; i++) {
            var item = elements.item(i);
            obj[item.name] = item.value;
        }
        imageData.images.push(obj);
        localStorage.setItem('images', JSON.stringify(imageData));
         location.reload();
        return true;
    }
    else
        return false;

}

function editImage() {

    if (selectedImage == null) {
        alert("Please Select the image You want to edit");
        return false;
    }

    if (!validateImageDetails())
        return false;

        imageData.images[selectedImage]["url"] = $('#url').val();
        imageData.images[selectedImage]["name"] = $('#name').val();
        imageData.images[selectedImage]["information"] = $('#information').val();
        imageData.images[selectedImage]["uploadDate"] = $('#uploadDate').val();
    localStorage.setItem('images', JSON.stringify(imageData));
    location.reload();


    alert("Edit Sucessful");
}


function deleteImage(selectedImage) {

    if (selectedImage == null) {
        alert("Please click on image you want to delete first!");
        return false;
    }

    if (window.confirm("Are you sure want to delete the  image " + imageData.images[selectedImage]["name"])) {
        imageData.images.splice(selectedImage, 1);
        localStorage.setItem('images', JSON.stringify(imageData));
        selectedImage = null;
    
   location.reload();
    }
}


