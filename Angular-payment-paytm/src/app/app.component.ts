import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular-payment-paytm';

  RequestAttributes = {
      MID : 'xOpHGh95840523930721',
      ORDER_ID : 'OrderId@1234567890',
      CUST_ID : 'CustId@1234567890',
      TXN_AMOUNT : '1000',
      CHANNEL_ID : 'WEB',
      MOBILE_NUMBER : '1234567890',
      EMAIL : 'r.d@abc.com',
      WEBSITE : 'WEBSTAGING',
      CHECKSUMHASH : '',
      INDUSTRY_TYPE_ID : 'Retail',
      CALLBACK_URL : 'https://merchant.com/callback/'
  }
}
