import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  cityName: string = "Sofia";
  weatherIcon!: string;
  tempeature!: number;

  http = inject(HttpClient);

  ngOnInit(): void {
    this.getWeatherData();
  }

  getWeatherData() {
    const apiKey = "d1e8b1713c616fbaae9443e5deb6f9cb";
    const ApiURL = `http://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${apiKey}&units=metric`

    this.http.get<any>(ApiURL).subscribe(
      data => {
        this.weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        this.tempeature = data.main.temp;
      }
    )
  }

}
