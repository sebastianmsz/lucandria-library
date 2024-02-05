document.querySelector("#year").textContent = new Date().getFullYear();

(function () {
    const addBookBtn = document.querySelector("#addBookBtn");
    const cancelButton = document.querySelector("#cancel");
    const dialog = document.querySelector("#dialog");

    addBookBtn.addEventListener("click", function () {
      dialog.showModal();
    });

    cancelButton.addEventListener("click", function () {
      dialog.close();
    });
})()