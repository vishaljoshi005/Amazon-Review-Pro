import {Component, Inject, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import { AuthService } from '@/core/services/auth/auth.service';
import {ForgotPasswordService} from '@/core/services/miscellaneous-noAuth/forgot-password.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private authenticationService: AuthService ,
              private router: Router, private snackBar: MatSnackBar,
  ) { }


  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['',  [Validators.required], [] ],
      password: ['', [Validators.required]]
    });
  }

  resetForm(form: FormGroup) {

    form.reset();

    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null) ;
    });
  }

  ngOnInit() {
    this.createForm();
    // this.loginForm = this.formBuilder.group({
    //   username: ['',  [Validators.required], [] ],
    //   password: ['', [Validators.required]]
    // });

    this.authenticationService.logout();

  }
  openSnackBar() {
    this.snackBar.open('Invalid Username or Password', 'Close', {
      duration: 2000,
      panelClass: ['style-success'],
    });
  }


   onSubmit() {
    if (this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.value).subscribe((data) => {
        console.log(data);
        if (data.success) {
          this.router.navigate(['/dashboard']); // Change this URL
        } else {
          this.openSnackBar();
          this.resetForm(this.loginForm);
        }
      }, ( err ) => {

      });

    } else {
      // Add some thing
    }

  }

     forgotDialog() {
      this.dialog.open( ForgotPasswordComponent , { disableClose: true,
        data: { name: 'austin' },
      });

      this.dialog.afterAllClosed.subscribe(result => {
        this.loginForm.reset();
      });
    }

}

@Component({
    selector: 'app-forgot-password',
    templateUrl: 'forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
  })
  export class ForgotPasswordComponent {
  submitted = false;

  private forgotData = {
    userInput: ''
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ForgotPasswordComponent>,
              private router: Router,
              private forgotPassword: ForgotPasswordService) {
    }

   onSubmitEmail(form: NgForm) {
    // console.log(form.value.emailPass);
     // Check submitted if then allow
     this.forgotData.userInput = form.value.emailPass;
     // this.submitted = true;
     this.forgotPassword.forgotPassword(this.forgotData)
       .subscribe((next) => {
         console.log('From the component');
       });

   }

   closeDialog() {
     this.router.navigateByUrl('/login').finally(() => {
       this.dialogRef.close('closed');
     });

   }

}
