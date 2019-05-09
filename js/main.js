//console.log(showdown.getDefaultOptions())

//Replaces the contents of a hidden div with styled HTML that resembles Github Markdown
function render() {
    showdown.setOption('tables', true);
    showdown.setOption('strikethrough', true);
    showdown.setOption('tasklists', true);
    showdown.setOption('emoji', true);

    editor = document.getElementById("input");
    var converter = new showdown.Converter(),
        content = editor.value,
        html = converter.makeHtml(content);

    page = document.getElementById("page");
    page.innerHTML = html;
}

//Allows the user to switch between seeing the textbox and the hidden div
function toggleView() {
    pageContainer = document.getElementById("pageOuter");
    pageContainer.classList.toggle("hide");
    editor.classList.toggle("hide");

    button = document.getElementById("preview");
    if (button.innerText == "Preview") {
        button.innerText = "Edit";
    } else {
        button.innerText = "Preview";
    }
}

//Renders the md and switches the view
function preview() {
    render();
    toggleView();
}

//Prompts the user if they want to empty out the textarea. If yes, reset the value to blank, and clear the local storage.
function clearAll() {
    var editor = document.getElementById("input");
    if (editor.value && confirm("Are you sure you want to delete your content? This cannot be undone.")) {
        editor.value = "";
    };
    if (!document.getElementById("pageOuter").classList.contains("hide")) {
        toggleView();
    }
    localStorage.clear();
}

//Renders the md, switches view to the preview mode, then opens the print dialog
function printpdf() {
    render();
    if (document.getElementById("pageOuter").classList.contains("hide")) {
        toggleView();
    }
    window.print();
}

//Saves data to local storage everytime a change is made
function saveFile() {
    var content = document.getElementById("input").value;
    localStorage.setItem('usermd', JSON.stringify(content));
    document.getElementById("input").value = document.getElementById("input").value.replace(/\\t/g, "    ")
}

//If the correct data is in local storage, load it when the page loads
function firstLoad() {
    if (localStorage.getItem('usermd')) {
        document.getElementById("input").value = JSON.parse(localStorage.getItem('usermd'))
    }
}
firstLoad();

function tabOver() {
    document.getElementById("input").value = document.getElementById("input").value.replace(/\\t/g, "    ")
}
//Event listener inside textbox. Replaces default tab behavior with an actual tab character
document.getElementById('input').onkeydown = function (e) {
    if (e.keyCode == 9) {
        e.preventDefault();
        tabOver();
    }
}