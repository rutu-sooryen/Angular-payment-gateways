import { Component } from '@angular/core';
import { AngularPaymentPaytmService } from './services/angular-payment-paytm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular-payment-paytm';
  public requestAttributes: any = {
    MID: 'xOpHGh95840523930721',
    ORDER_ID: 'OrderId@1234567890',
    CUST_ID: 'CustId@1234567890',
    TXN_AMOUNT: '001.00',
    CHANNEL_ID: 'WEB',
    WEBSITE: 'WEBSTAGING',
    INDUSTRY_TYPE_ID: 'Retail',
    CALLBACK_URL: 'http://localhost:4200/callback'
  };
  constructor(
    public paytmPaymentService: AngularPaymentPaytmService) { }
  ngOnInit() {

    this.paytmPaymentService.getChecksum().subscribe((checksum: any) => {
      console.log("checksum");
      this.requestAttributes.CHECKSUMHASH = checksum;
    });
  }
}
