import { Component } from '@angular/core';
import { AngularPaymentPaytmService } from './services/angular-payment-paytm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular-payment-paytm';
  public requestAttributes: {
    MID: string,
    ORDER_ID: string,
    CUST_ID: string,
    TXN_AMOUNT: string,
    CHANNEL_ID: string,
    MOBILE_NUMBER: string,
    EMAIL: string,
    WEBSITE: string,
    CHECKSUMHASH: string,
    INDUSTRY_TYPE_ID: string,
    CALLBACK_URL: string
  };
  constructor(
    public paytmPaymentService: AngularPaymentPaytmService) { }
  ngOnInit() {
    console.log("onInit");
    this.paytmPaymentService.getChecksum().subscribe((checksum: any) => {
      console.log("checksum");
      this.requestAttributes = {
        MID: 'xOpHGh95840523930721',
        ORDER_ID: 'OrderId@1234567890',
        CUST_ID: 'CustId@1234567890',
        TXN_AMOUNT: '1000',
        CHANNEL_ID: 'WEB',
        MOBILE_NUMBER: '1234567890',
        EMAIL: 'r.d@abc.com',
        WEBSITE: 'WEBSTAGING',
        CHECKSUMHASH: checksum,
        INDUSTRY_TYPE_ID: 'Retail',
        CALLBACK_URL: 'https://merchant.com/callback/'
      }
    });
  }



}
