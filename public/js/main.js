const form = document.querySelector("form");
const Input = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const LocationVal = Input.value;
  if (LocationVal) {
    messageOne.innerHTML = "loading...";
    messageTwo.innerHTML = "";
    fetch("http://localhost:3020/weather?address=" + LocationVal)
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          messageOne.innerHTML = "there is error here";
          return console.log("there is error here");
        }
        messageOne.innerHTML = result.location;
        messageTwo.innerHTML = result.forcast;
      });
  }
});
