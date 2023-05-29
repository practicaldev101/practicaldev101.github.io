const headerView = document.getElementById('header');
const homeView = document.getElementById('home');
const portfolioView = document.getElementById('portfolio');
const aboutView = document.getElementById('about');
const homeButton = document.getElementById('homeButton');
const portfolioButton = document.getElementById('portfolioButton');
const aboutButton = document.getElementById('aboutButton');
const contactButton = document.getElementById('contactButton');
const themeButton = document.getElementById('themeButton');

const staticIconPositions = [
    {
        _id: 0,
        title: "Others",
        _image: "",
        x:8,
        y:50
    },
    {
        _id: 1,
        title: "JavaScript",
        _image: "/assets/img/stack/javascript-original.svg",
        x:18,
        y:15
    },
    {
        _id: 2,
        title: "React",
        _image: "/assets/img/stack/react-original-wordmark.svg",
        x:10,
        y:30
    },
    {
        _id: 3,
        title: "Python",
        _image: "/assets/img/stack/python-original.svg",
        x:30,
        y:4
    },
    {
        _id: 4,
        title: "Java",
        _image: "/assets/img/stack/java-original-wordmark.svg",
        x:42,
        y:1
    },
    {
        _id: 5,
        title: "PHP",
        _image: "/assets/img/stack/php-original.svg",
        x:56,
        y:8
    },
    {
        _id: 6,
        title: "MaterialUI",
        _image: "/assets/img/stack/materialui-original.svg",
        x:70,
        y:15
    },
    {
        _id: 7,
        title: "MongoDB",
        _image: "/assets/img/stack/mongodb-original.svg",
        x:80,
        y:25
    },
    {
        _id: 8,
        title: "HTML5",
        _image: "/assets/img/stack/html5-original.svg",
        x:88,
        y:40
    },
    {
        _id: 9,
        title: "CSS3",
        _image: "/assets/img/stack/css3-plain-wordmark.svg",
        x:82,
        y:54
    },
    {
        _id: 10,
        title: "NodeJS",
        _image: "/assets/img/stack/nodejs-original-wordmark.svg",
        x:75,
        y:64
    },
    {
        _id: 11,
        title: "Git",
        _image: "/assets/img/stack/git-original-wordmark.svg",
        x:62,
        y:72
    },
    {
        _id: 12,
        title: "MySQL",
        _image: "/assets/img/stack/mysql-original-wordmark.svg",
        x:50,
        y:78
    },  
]

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function placeStackIcons (){
    const shapeStackElement = document.querySelector(".custom__shape--stack") 
    console.log(shapeStackElement)
    const icons = staticIconPositions.map((icon) => {
        if (icon._id != 0){
            return document.createElement("img")
        }
        return false
    })

    icons.forEach((icon, index) => {
        if (icon){
            icon.setAttribute("src", staticIconPositions[index]._image)
            icon.setAttribute("alt", staticIconPositions[index].title)
            icon.setAttribute("title", staticIconPositions[index].title)
            icon.style.setProperty("left", `${staticIconPositions[index].x}%`);
            icon.style.setProperty("top", `${staticIconPositions[index].y}%`);
            icon.setAttribute("class", "custom__shape custom__shape--icon")
            icon.setAttribute("draggable", false)
            
            shapeStackElement.appendChild(icon)
        }
        else {
            const stackOthers = document.querySelector(".custom__shape--other")
            stackOthers.style.setProperty("left", `${staticIconPositions[index].x}%`);
            stackOthers.style.setProperty("top", `${staticIconPositions[index].y}%`);
            stackOthers.setAttribute("alt", staticIconPositions[index].title)
            stackOthers.setAttribute("title", staticIconPositions[index].title)
        }   
    })
}

function dynamicText(element, text) {
    const textLength = text.length;
    let sliceLength = 0;
    return setInterval(() => {
        if (sliceLength >= textLength) {
            sliceLength = 0;
            element.innerText = "*".repeat(textLength);
        }
        element.innerText = text.slice(0, sliceLength + 1) + ("*".repeat((textLength - sliceLength) - 1))
        sliceLength++;

    }, 200)

}

function createLoadingView() {
    const parentElement = document.createElement('div');
    const frameElement = document.createElement('div');
    const imageElement = document.createElement('img');
    const textElement = document.createElement("p");

    const interval = dynamicText(textElement, 'Loading...')
    window.scroll(0, homeView.style.height)

    imageElement.src = "./assets/img/bash_max.png";
    textElement.className = "loading__text";
    imageElement.className = "loading__logo";
    frameElement.className = "loading__frame";
    parentElement.className = "loading__box";


    frameElement.appendChild(imageElement);
    frameElement.appendChild(textElement);
    parentElement.appendChild(frameElement);
    document.body.append(parentElement);
    document.body.style.overflowY = 'hidden';

    return [parentElement.className, interval];
}

function removeLoadingView(className, intervalId) {
    const boxElement = document.getElementsByClassName(className)[0];
    document.body.style.overflowY = 'scroll';
    boxElement.classList.toggle("loading__box--disable");
    setTimeout(() => {
        clearInterval(intervalId);
        boxElement.remove();
    }, 2000)
}


const fixItems = (theme) => {
    const aboutIcons = document.querySelectorAll(".list__item > a") || false;
    const educationIcons = document.querySelectorAll(" .card__header .card__image--modify") || false;
    const stackIcons = document.querySelectorAll(".custom__shape--icon") || false;
    const softSkillsIcons = document.querySelectorAll(".softSkills__icon") || false;
    const loadingIcon = document.querySelector(".loading__logo") || false;
    const splitPattern = document.querySelector(".split") || false;
    let items = [];

    items.push(loadingIcon);
    items.push(splitPattern);
    items.push(...aboutIcons);
    items.push(...educationIcons);
    items.push(...softSkillsIcons);
    items.forEach((item) => {
        if (item){
            item.classList.toggle("invert");
        }
    })
    items = [];
    items.push(...stackIcons);
    items.forEach((item) => {
        if (item){
            item.classList.toggle("invert--grayscaleHover");
        }
    })
}

const verifyTheme = () => {
    var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (storedTheme){
        document.documentElement.setAttribute('data-theme', storedTheme);
        if (storedTheme === "light"){
            fixItems(storedTheme);
        }
        else{
            setToggleButton();
        }
    }
    else{
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        setToggleButton();
    }

}

const setToggleButton = () => {
    themeButton.checked = true;
}
const toggleTheme = (event) => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    let targetTheme = "dark";
    
    if (currentTheme === "dark"){
        targetTheme = "light";
    }
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem("theme", targetTheme);
    fixItems(targetTheme);
}

function documentLoaded(){
    homeButton.addEventListener('click', () => window.scrollTo({behavior: "smooth", top: 0}))
    portfolioButton.addEventListener('click', () => portfolioView.scrollIntoView({ behavior: 'smooth' }))
    aboutButton.addEventListener('click', () => aboutView.scrollIntoView({ behavior: 'smooth'}));
    contactButton.addEventListener('click', () => open("wa.link/imxjrt"));
    themeButton.addEventListener("change", toggleTheme)
    
}


const loadStart = () => {
    const [className, intervalId] = createLoadingView();
    placeStackIcons();
    verifyTheme();
    window.onload = () => {
        documentLoaded();
        setTimeout(() => {
            removeLoadingView(className, intervalId);
        }, 3000);

    }
}

loadStart()
