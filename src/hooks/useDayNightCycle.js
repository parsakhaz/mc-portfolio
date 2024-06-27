import { useState, useEffect, useCallback } from 'react';

export default function useDayNightCycle() {
	// Initialize with a random time
	const [time, setTime] = useState(() => {
		const randomHour = Math.floor(Math.random() * 24);
		const randomMinute = Math.floor(Math.random() * 60);
		return { hours: randomHour, minutes: randomMinute };
	});
	const [daysPassed, setDaysPassed] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime((prevTime) => {
				const newMinutes = (prevTime.minutes + 1) % 60;
				const newHours = (prevTime.hours + Math.floor((prevTime.minutes + 1) / 60)) % 24;

				if (newHours === 0 && newMinutes === 0) {
					setDaysPassed((prevDays) => prevDays + 1);
				}

				return { hours: newHours, minutes: newMinutes };
			});
		}, 833); // Update every 833 milliseconds (1 Minecraft minute)

		return () => clearInterval(interval);
	}, []);

	const getBgColor = () => {
		const totalMinutes = time.hours * 60 + time.minutes;
		if (totalMinutes >= 360 && totalMinutes < 1080) {
			return `rgb(135, 206, 235, ${1 - Math.abs(720 - totalMinutes) / 720})`;
		} else {
			return `rgb(25, 25, 112, ${Math.abs(720 - totalMinutes) / 720})`;
		}
	};

	const addMinutes = useCallback(
		(minutes) => {
			setTime((prevTime) => {
				let newMinutes = prevTime.minutes + minutes;
				let newHours = prevTime.hours + Math.floor(newMinutes / 60);
				let newDays = daysPassed + Math.floor(newHours / 24);

				newMinutes %= 60;
				newHours %= 24;

				if (newDays > daysPassed) {
					setDaysPassed(newDays);
				}

				return { hours: newHours, minutes: newMinutes };
			});
		},
		[daysPassed]
	);

	return { time, daysPassed, bgColor: getBgColor(), addMinutes };
}
