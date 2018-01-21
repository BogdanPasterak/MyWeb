window.onload = function() {

	window.addEventListener("resize", myResize);
	myResize();


}

const myResize = () => {

	const width = document.documentElement.clientWidth;
	//console.log(width);
	if (width > 1270) {
		const offset = ((width - 1270) / 2) + 'px';
		document.getElementsByClassName("nav_bar")[0].style = 'left: ' +  offset;
		document.getElementById("clock").style = 'right: ' + offset;
	} else {
		document.getElementsByClassName("nav_bar")[0].removeAttribute("style");
		document.getElementById("clock").removeAttribute("style");
	}

};

const hamburger = () => {
    const x = document.getElementsByClassName("nav_bar")[0];
    if (x.className === "nav_bar") {
        x.className += " responsive";
    } else {
        x.className = "nav_bar";
    }

};

const clock = () => {

};
