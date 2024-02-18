import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExchangeRateService } from '../../services/exchange-rate.service';
import { Conversionrequest } from '../../interfaces/conversionrequest';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css'
})
export class ConverterComponent{

  currentRate: number = 1.1;
  convertedValue: number = 1.1;
  lastAmount: number = 1;
  baseCurrency: string = "EUR"
  targetCurrency: string = "USD";
  history: Conversionrequest[] = [];
  fixedRate: number | null = null;

  constructor(private exchangeRateService: ExchangeRateService) {
    exchangeRateService.exchangeRateUpdated.subscribe((rate: number) => {
      this.currentRate = rate;
      if (this.fixedRate != null) {
        this.validateRate(this.fixedRate)
      }
      this.convert();
    });
  }

  converterForm = new FormGroup({
    amount: new FormControl(1),
    baseCurrency: new FormControl('EUR')
  })

  rateForm = new FormGroup({
    rate: new FormControl(null)
  })

  validateRate(rate: number) {
    const deviation = Math.abs((rate - this.currentRate)) / this.currentRate;
    if (deviation <= 0.02) {
      this.fixedRate = rate;
    } else {
      this.fixedRate = null;
    }
  }

  updateRate() {
    const rate = this.rateForm.value.rate ?? null;
    if (rate != null) {
      this.validateRate(rate)
    }
  }

  convert() {
    this.baseCurrency = this.converterForm.value.baseCurrency ?? 'EUR';
    let rateToUse = this.currentRate;
    if (this.fixedRate != null) {
      rateToUse = this.fixedRate
    }
    if (this.baseCurrency == 'EUR') {
      this.convertedValue = this.lastAmount * rateToUse;
      this.targetCurrency = "USD"
    } else {
      this.convertedValue = this.lastAmount / rateToUse;
      this.targetCurrency = "EUR"
    }
  }

  convertAmount() {
    this.lastAmount = this.converterForm.value.amount ?? this.lastAmount;
    this.convert()
    this.addToHistory(this.lastAmount, this.convertedValue, this.baseCurrency, this.targetCurrency, this.currentRate, this.fixedRate)
  }

  private addToHistory(amount: number, convertedValue: number, baseCurrency: string, targetCurrency: string, exchangeRate: number, fixedRate: number | null) {
    const conversion: Conversionrequest = {amount, convertedValue, baseCurrency, targetCurrency, exchangeRate, fixedRate}
    this.history.unshift(conversion)
    if (this.history.length > 5) {
      this.history.pop()
    }
  }


}
