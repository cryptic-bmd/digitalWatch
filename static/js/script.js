window.onload = () => {
	// list of relevant icons
	const icons = {
		a01d: 'sunny', a01n: 'clear_night',
		a02: 'partly_cloudy_day', a03: 'cloud', '03n': 'cloud',
		a04: 'filter_drama', a09: 'rainy',
		a10: 'umbrella', a11: 'thunderstorm',
		a13: 'ac_unit', a50: 'foggy'
	};

	// object with methods that fetch, process
	// and manipulate weather data.
	const getWeather = {
		apiKey: 'fcd2edb074aa9dda40c24766ab635eef',
		fetchData: 
			async function (city) {
				try {
					const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`);
					const data = await response.json();
					this.showData(data);
					// console.log(data);
				} catch {
					//pass
				};
			},
		showData: data => {
			// destructure attributes 
			const { icon, main } = data.weather[0];
			const { temp, pressure, humidity } = data.main;
			const { speed } = data.wind;
			
			// gets the relevant icon
			const mainIcon = icon.slice(1,2) === '1' ? 'a' + icon:'a' + icon.slice(0,2);
			// const newIcon = mainIcon === 'undefined' ? 'block':mainIcon;
			document.getElementById('icon').innerHTML = icons[mainIcon];
			
			// update corresponding elements' values
			document.getElementById('temp').innerHTML = Math.round(temp) + '°C';
			document.getElementById('desc').innerHTML = fillLength(main);
			document.getElementById('w').innerHTML = Math.round(speed * 10) / 10;
			document.getElementById('p').innerHTML = Math.round(pressure / 10);
			document.getElementById('h').innerHTML = humidity;
		}
	};

	// adds variable number of > prefix
	// & variable number of < suffix
	const fillLength = (string) => {
		const count = 	(16 - Math.round(string.length)) / 2;
		const str1 = `${'&gt;'.repeat(count)}`;
		const str2 = `${'&lt;'.repeat(count)}`;	
		return `<span>${str1}</span>&nbsp&nbsp${string}&nbsp&nbsp;<span>${str2}</span>`;
	};

	const weekDays = {
		0: 'Sun', 1: 'Mon',
		2: 'Tue', 3: 'Wed',
		4: 'Thurs', 5: 'Fri',
		6: 'Sat'
	};

	const months = {
		0: 'January', 1: 'Febraury',
		2: 'March', 3: 'April',
		4: 'May', 5: 'June',
		6: 'July', 7: 'August',
		8: 'September', 9: 'October',
		10: 'November', 11: 'December'
	};

	let city = 'Lagos';

	const showTime = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate();
		const weekDay = date.getDay();
		
		const hr = date.getHours();
		const min = date.getMinutes();
		const sec = date.getSeconds();
		const colon = '<span>:</span>';
		const hr1 = hr%12 ? hr%12:12;
		
		const newH = hr1<10 ? '0'+hr1:hr1;
		const newM = min<10 ? '0'+min:min;
		const newS = sec<10 ? '0'+sec:sec;
		const meridiem = hr<12 ? 'am':'pm';

		document.getElementById('meridiem').innerHTML = meridiem;
		document.getElementById('sec').innerHTML = newS
		document.getElementById('real-time').innerHTML = `${newH}${colon}${newM}`
		document.getElementById('date').innerHTML = `<span>${weekDays[weekDay]}</span>, ${months[month]} ${day}, ${year}`
	};

	const changeCity = () => {
		const atmos = document.getElementsByClassName('atmosphere')[0];
		const weather = document.getElementsByClassName('weather')[0];
		const desc = document.getElementById('desc')
		
		cityName = document.getElementById('input').value;
		city = cityName != 0 ? cityName:'Lagos';
		
		atmos.style.filter = 'blur(14px)';
		desc.style.filter = 'blur(14px)';
		weather.style.filter = 'blur(14px)';
		
		setTimeout(() => {
			try {
				getWeather.fetchData(city);
				atmos.style.filter = 'none';
				desc.style.filter = 'none'
				weather.style.filter = 'none';
			} catch {
				//pass	
			}
		}, 1000);
		
	};
	
	// const windDiv = document.getElementById('wind-id');
	// const pressureDiv = document.getElementById('pres-id');

	const toggleDiv = (div, divClass) => {
		div.classList.toggle(divClass);
	}

	const choice = ['wind-id', 'pres-id']
	let index = 0;
	
	const swapDiv = () => {
		let firstDiv = document.getElementById(choice[index++]);
		
		// make use of .reduce class cause 
		// decrease position is above increase 
		let divClass = index===2 ? 'reduce':'decrease';
	   
		index = index % 2;
		let secondDiv = document.getElementById(choice[index]);

		toggleDiv(firstDiv, divClass);
		setTimeout(() => {
			toggleDiv(firstDiv, 'hide');
		}, 500);

		setTimeout(() => {
			toggleDiv(secondDiv, 'show');
		}, 500);
		setTimeout(() => {
			toggleDiv(secondDiv, 'increase');
		}, 600);
	};

	const newWeather = () => {
		getWeather.fetchData(city);
		swapDiv();
	}

	document.getElementById('input').addEventListener('input', changeCity);

	getWeather.fetchData(city);
	document.getElementById('input').select();
	showTime();

	setTimeout(() => {
		document.querySelector('body').style.filter = 'none';
	}, 1000);
	setInterval(showTime, 500);
	setInterval(newWeather, 10000);   
};
