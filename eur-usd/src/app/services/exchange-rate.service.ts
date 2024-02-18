import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private exchangeRate: number = 1.1;
  exchangeRateUpdated: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.updateRate();
  }

  getExchangeRate() {
    return this.exchangeRate;
  }

  private updateRate() {
    setInterval(() => {
      const change = Math.random() >= 0.5 ? 0.05 : -0.05;
      this.exchangeRate = this.exchangeRate + change;
      this.exchangeRateUpdated.emit(this.exchangeRate);
    }, 3000);
  }
}
