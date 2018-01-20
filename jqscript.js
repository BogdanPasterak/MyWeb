const hamburger = () => {
    const x = document.getElementsByClassName("nav_bar")[0];
    if (x.className === "nav_bar") {
        x.className += " responsive";
    } else {
        x.className = "nav_bar";
    }

};