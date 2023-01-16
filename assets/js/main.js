
const homeView = document.getElementById('home');
const portfolioView = document.getElementById('portfolio');
const homeButton = document.getElementById('homeButton');
const portfolioButton = document.getElementById('portfolioButton');
const contactButton = document.getElementById('contactButton');

function dynamicText(element, text){
    const textLength = text.length;
    let sliceLength = 0;
    return setInterval(()=>{
        if ( sliceLength >= textLength){
            sliceLength = 0;
            element.innerText = "*".repeat(textLength);
        }
        element.innerText = text.slice(0, sliceLength+1) + ("*".repeat((textLength - sliceLength)-1))
        sliceLength++;
        
    }, 200)
    
}
function createLoadingView(){
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

function removeLoadingView(className, intervalId){
    const boxElement = document.getElementsByClassName(className)[0];
    document.body.style.overflowY = 'scroll';
    boxElement.className = className + " loading__box--disable";
    setTimeout(()=>{
        clearInterval(intervalId);
        boxElement.remove();
    }, 2000)
}
window.onload = () => {
    const [className ,intervalId] = createLoadingView();

    setTimeout(()=> {
        removeLoadingView(className, intervalId)
    }, 3000);
    
}

homeButton.addEventListener('click', ()=> homeView.scrollIntoView({behavior: 'smooth'}))
portfolioButton.addEventListener('click', ()=> portfolioView.scrollIntoView({behavior: 'smooth'}))
contactButton.addEventListener('click', ()=> open("https://wa.link/2oeb3f"))

