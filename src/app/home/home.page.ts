import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  weatherData: any = {};
  weatherIcon: string = 'sunny';
  cityName: string = 'Manado';

  constructor(
    private weatherService: WeatherService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadWeatherData(this.cityName);
  }

  async loadWeatherData(city: string) {
    try {
      const response = await this.weatherService.getWeatherByCity(city).toPromise();
      this.weatherData = response;
      this.setWeatherIcon(this.weatherData.weather[0].icon);
    } catch (error) {
      this.presentToast('Gagal mengambil data cuaca.');
    }
  }

  setWeatherIcon(iconCode: string) {
    switch (iconCode) {
      case '01d':
        this.weatherIcon = 'sunny';
        break;
      case '02d':
        this.weatherIcon = 'partly-sunny';
        break;
      case '03d':
      case '04d':
        this.weatherIcon = 'cloudy';
        break;
      case '09d':
        this.weatherIcon = 'rainy';
        break;
      case '10d':
        this.weatherIcon = 'rainy-outline';
        break;
      case '11d':
        this.weatherIcon = 'thunderstorm';
        break;
      case '50d':
        this.weatherIcon = 'cloud';
        break;
      default:
        this.weatherIcon = 'partly-sunny';
        break;
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  searchWeather() {
    if (this.cityName) {
      this.loadWeatherData(this.cityName);
    } else {
      this.presentToast('Masukkan nama kota');
    }
  }
}
