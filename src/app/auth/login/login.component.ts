import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  salesForm: any;
  constructor(
    private router: Router,
    private loginApi: LoginService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {}
  showSales() {
    this.router.navigate(['/home']);
  }
  ngOnInit() {
    this.salesForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  loginRequest() {
    this.loading = true;
    const payload = {
      username: this.salesForm.value.username,
      password: this.salesForm.value.password,
      rememberme: false,
      financialperiod: {
        financialPeriodsFsno: 1,
        financialPeriodsStartDate: '2023-01-01T00:00:00',
        financialPeriodsEndDate: '2023-12-31T00:00:00',
      },
      location: {
        locationMasterLocationId: 10,
        locationMasterLocationName: 'Main-10',
        locationMasterLocationStatus: null,
      },
    };

    this.loginApi.loginRequest(payload).subscribe({
      next: (res: any) => {
        if (res) {
          this.router.navigate(['/dashboard/']);
          this.loading = false;
        } else {
          this.toastService.show('Invalid Credential', 'danger');
          this.loading = false;
        }
      },
      error: (err) => {
        this.loading = false;
        this.toastService.show('Something Went wrong', 'danger');
      },
    });
  }
}
