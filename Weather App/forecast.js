
window.onload = ()=>{
    document.querySelector('form').addEventListener('submit',getCity);
}

function getCity(){
    event.preventDefault();
    let form = new FormData(event.target);
    let city = form.get('city')
    const key = 'ba828814d8948b4e3fee3e1b02dc4fa2'
    
    
    let xhr = new XMLHttpRequest();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    xhr.open('GET',url);
    xhr.send();
    xhr.onload = function(){
        if(this.status === 200){
            renderTime(city);
    
            let response = JSON.parse(this.response);
            let iconId = response.weather[0].icon;
            
            document.querySelector('.city').textContent = city

            document.getElementById('weather-icon').src =  `http://openweathermap.org/img/wn/${iconId}@2x.png`
        
            document.getElementById('weather').textContent = response.weather[0].description;

            document.getElementById('temperature').textContent = (response.main.temp - 273).toFixed(2);

            
        }
    }
}

function renderTime(city){
    let xhr = new XMLHttpRequest();
    
    let url = `https://cors-anywhere.herokuapp.com/https://www.amdoren.com/api/timezone.php?api_key=jnTUT9en2HWLit7j5WYzXdg3sdsPn9&loc=${city}`;
    xhr.open('GET',url);
    xhr.send();
    xhr.onload = function(){
        if(this.status === 200){
            let response = JSON.parse(this.response);
            let time = Number(response.time.split(' ')[1].split(':')[0])
            let imageContainer = document.querySelector('.time')
            if(time >=6 && time < 12){
                imageContainer.src = 'morning.jpg'
            }
            else
            if(time >=12 && time < 16)
            {
                imageContainer.src = 'noon.jpg'
            }
            else
            if(time >=16 && time < 19)
            {
                imageContainer.src = 'evening.jpg'
            }
            else{
                imageContainer.src = 'night.jpg'
            }
        }
    }
}
