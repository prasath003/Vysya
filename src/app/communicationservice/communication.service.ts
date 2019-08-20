import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient) {
  }

  saveUserData(name, address) {
    interface UserResponse {
      success: boolean;
      dataset: any;
    }

    const headerKey = {'Content-Type': 'application/json'};
    const headers = new HttpHeaders(headerKey);

    const body = JSON.stringify({
      'name': name,
      'address': address,
      'author': 'fromapp'
    });
    return new Promise(resolve => {
      this.http.post('', body, {headers: headers, observe: 'response'})
        .subscribe((response: HttpResponse<UserResponse>) => {
            if (response.status === 200) {
              resolve();
            } else {
              resolve(false);
            }
          }, error => {
            resolve(false);
          }
        );
    });
  }

  getUserData() {
    interface UserResponse {
      success: boolean;
      dataset: any;
    }

    const headerKey = {'Content-Type': 'application/json'};
    const headers = new HttpHeaders(headerKey);

    /*const body = JSON.stringify({
      'name': name,
      'address': address,
      'author': 'fromapp'
    });*/
    return new Promise(resolve => {
      this.http.get('http://192.168.43.207:8087/bank/user/prasath.muthaiyan@gmail.com/12345', {headers: headers, observe: 'response'})
        .subscribe((response: HttpResponse<UserResponse>) => {
            if (response.status === 200) {
              resolve(response.body);
            } else {
              resolve(false);
            }
          }, error => {
            resolve(false);
          }
        );
    });
  }

  authOTP(otpId, otp) {
    interface UserResponse {
      success: boolean;
      dataset: any;
    }

    const headerKey = {'Content-Type': 'application/json'};
    const headers = new HttpHeaders(headerKey);

    const body = JSON.stringify({
      'otpDTO': {'otpGenId': otp, 'otp': otpId},
      'paymentRequestDTO': localStorage.getItem('dataKey')
    });

    console.log('auth', body);
    return new Promise(resolve => {
      this.http.post('http://192.168.43.179:8087/bank/authenticate/', body, {headers: headers, observe: 'response'})
        .subscribe((response: HttpResponse<UserResponse>) => {
            if (response.status === 201) {
              resolve(response.body);
            } else {
              resolve(true);
            }
          }, error => {
            resolve(true);
          }
        );
    });
  }


  getOTP(userId) {
    const headerKey = {'Content-Type': 'application/json'};
    const headers = new HttpHeaders(headerKey);
    return new Promise(resolve => {
      this.http.get('http://192.168.43.179:8087/bank/user/' + userId + '/otp/', {headers: headers, observe: 'response'})
        .subscribe((response) => {
            if (response.status === 200) {
              resolve(response.body);
            } else {
              resolve(false);
            }
          }, error => {
            resolve(false);
          }
        );
    });
  }

  getPayeeList() {
    interface UserResponse {
      success: boolean;
      dataset: any;
    }

    const headerKey = {'Content-Type': 'application/json'};
    const headers = new HttpHeaders(headerKey);


    return new Promise(resolve => {
      this.http.get('http://192.168.43.179:8087/bank/user/1/payee', {headers: headers, observe: 'response'})
        .subscribe((response: HttpResponse<UserResponse>) => {
            if (response.status === 200) {
              resolve(response.body);
            } else {
              resolve(false);
            }
          }, error => {
            resolve(false);
          }
        );
    });
  }

  getAccountDetails(userId) {
    const headerKey = {'Content-Type': 'application/json'};
    const headers = new HttpHeaders(headerKey);

    return new Promise(resolve => {
      this.http.get('http://192.168.43.207:8087/bank/user/' + userId, {headers: headers, observe: 'response'})
        .subscribe((response) => {
            if (response.status === 200) {
              resolve(response.body);
            } else {
              resolve(false);
            }
          }, error => {
            resolve(false);
          }
        );
    });
  }

  getTransaction(userId) {
    const headerKey = {'Content-Type': 'application/json'};
    const headers = new HttpHeaders(headerKey);

    return new Promise(resolve => {
      this.http.get('http://192.168.43.207:8087/bank/user/' + userId + '/statement/', {headers: headers, observe: 'response'})
        .subscribe((response) => {
            if (response.status === 200) {
              resolve(response.body);
            } else {
              resolve(false);
            }
          }, error => {
            resolve(false);
          }
        );
    });
  }

  payProduct(cardNumber, cardCvv, cardDate, cardAmount) {
    interface UserResponse {
      success: boolean;
      dataset: any;
    }

    const headerKey = {'Content-Type': 'application/json'};
    const headers = new HttpHeaders(headerKey);

    const body = JSON.stringify({
      'creditAmount': cardAmount,
      'creditCardNumber': cardNumber,
      'cvv': cardCvv,
      'expDate': cardDate
    });

    localStorage.setItem('dataKey', body);
    console.log(body);
    return new Promise(resolve => {
      this.http.post('http://192.168.43.179:8087/bank/user/credit/', body, {headers: headers, observe: 'response'})
        .subscribe((response: HttpResponse<UserResponse>) => {
            if (response.status === 201) {
              resolve(response.body);
            } else {
              resolve(false);
            }
          }, error => {
            resolve(false);
          }
        );
    });
  }


  savePayeData(payeeName, accountNo, branchName, ifsc, email, userId) {
    interface UserResponse {
      success: boolean;
      dataset: any;
    }

    const headerKey = {'Content-Type': 'application/json'};
    const headers = new HttpHeaders(headerKey);

    const body = JSON.stringify({
      'payeeName': payeeName,
      'accountNo': accountNo,
      'branchName': branchName,
      'ifsc': ifsc,
      'email': email,
      'userId': userId
    });

    console.log(body);
    return new Promise(resolve => {
      this.http.post('http://192.168.43.179:8087/bank/user/save/', body, {headers: headers, observe: 'response'})
        .subscribe((response: HttpResponse<UserResponse>) => {
            if (response.status === 201) {
              resolve(response.body);
            } else {
              resolve(false);
            }
          }, error => {
            resolve(false);
          }
        );
    });
  }
}
