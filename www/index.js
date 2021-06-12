dontTouchMe = async () => {
    let title = document.getElementById("title");
    title.innerHTML = "dont touch me";
    title.style.color = "red";

    await delay(0.5);
    title.innerHTML = "Rubìx's Corner";
    title.style.color = "#470949";
}

delay = async seconds => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

f = async () => {
    fetch('splash.txt').then((x) => x.text().then(s => console.log(s + `\nStop looking at my code`)))

    let dr = document.getElementById('darkreader');
    setInterval(() => {
        if (!["rgb(71, 9, 73)", "rgb(255, 0, 0)"].includes(window.getComputedStyle(document.getElementById("title")).color)) {
            dr.style.display = "block";
        }
        else if (dr.style.display = "block") {
            dr.style.display = "none";
        }
    }, 1000)

    if (document.getElementById("test_vid")) {
        hex_con = document.getElementById("hex_con");
        hex_con.innerHTML = "true";
        hex_con.style.color = "green";
    }
}

vid_error = () => {
    let vid = document.getElementById("test_vid");
    vid.remove();
    hex_con = document.getElementById("hex_con");
    hex_con.innerHTML = "false";
    hex_con.style.color = "red";
}