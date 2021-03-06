
window.onload = ()=>{
    document.querySelector('form').addEventListener('submit',getCity);
}

function getCity(){
    event.preventDefault();
    
    document.querySelector('.spinner-border').style.display = "block";
    document.querySelector('.cart').style.display = "none"
    
    let form = new FormData(event.target);
    let city = form.get('city')
    const key = 'ba828814d8948b4e3fee3e1b02dc4fa2'
    
    
    let xhr = new XMLHttpRequest();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    xhr.open('GET',url);
    xhr.send();
    xhr.onload = function(){
        if(this.status === 200){
            
    
            let response = JSON.parse(this.response);
            console.log(response)
            let iconId = response.weather[0].icon;
            
            document.querySelector('.city').textContent = city

            document.getElementById('weather-icon').src =  `http://openweathermap.org/img/wn/${iconId}@2x.png`
        
            document.getElementById('weather').textContent = response.weather[0].description;

            document.getElementById('temperature').textContent = (response.main.temp - 273).toFixed(2);

            document.querySelector('.pressure').textContent = `${response.main.pressure} mb`
            document.querySelector('.humidity').textContent = `${response.main.humidity} %`
            document.querySelector('.speed').textContent = `${response.wind.speed} km/h`
            renderTime(response.timezone);
        }
    }
}

function renderTime(timezone){
    var d = new Date(new Date().getTime() + (timezone * 1000));
    var hrs = d.getUTCHours();
    let imageContainer = document.querySelector('.time')
    if(hrs >=6 && hrs < 12){
        imageContainer.src = '/images/morning.jpg'
    }
    else
    if(hrs >=12 && hrs < 16)
    {
        imageContainer.src = '/images/noon.jpg'
    }
    else
    if(hrs >=16 && hrs < 19)
    {
        imageContainer.src = '/images/evening.jpg'
    }
    else{
        imageContainer.src = '/images/night.jpg'
    }
    setTimeout(function(){
        document.querySelector('.spinner-border').style.display = "none";
        document.querySelector('.cart').style.display = "block"

    },500)    
}
    

