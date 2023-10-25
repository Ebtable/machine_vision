
document.addEventListener('DOMContentLoaded', function(){
    const buttonGet = document.querySelector("[name=Submit]");
    var reqContainer = document.querySelector(".submit-bar");

    let websocketClient  = new WebSocket("ws://192.168.0.57:5000/show_photo");

    buttonGet.onclick = () => {
        websocketClient.send("Вызов");
    }


    function renderSubbar() {
        var newContainer = document.createElement('div');
        newContainer.innerHTML =
            '<h2>Залив!!!</h2>' +
            "<input id='submit' type='button' value='Подтвердить'>";
            newContainer.className = "submit-bar";
            newContainer.style.cssText = 'background-color: #b8b9ba; color: red; padding: 50px; max-height: 200px';
        reqContainer.parentNode.replaceChild(newContainer, reqContainer);
        const buttonSubmit = document.querySelector("#submit");

        buttonSubmit.onclick = () => {
        websocketClient.send("Подтверждено");
        reqContainer = document.createElement('div');
        reqContainer.className = "submit-bar";
        reqContainer.innerHTML = "";
        newContainer.parentNode.replaceChild(reqContainer, newContainer);
    }
    }

    function getImg() {
        websocketClient.send("Дай фото")
    };

    let timerId = setInterval(getImg, 3000);

    websocketClient.onmessage = (message) => {
        if (message.data == 'request submit') {renderSubbar()}
        else {document.getElementById("Image").src=message.data}
    }

}, false);