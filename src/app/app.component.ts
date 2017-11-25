import { Component, OnInit } from '@angular/core';
import { User } from './shared/models/user.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	userToSave: User;
	registrationForm: FormGroup;

	constructor(private fb: FormBuilder) {
	}

	ngOnInit() {
		this.createForm();
	}

	createForm() {
		this.registrationForm = this.fb.group({
			userId: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(50)])],
			email: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(50),
				Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)])],
			name: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
			passwords: this.fb.group({
				password: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(6)]],
				passwordConfirmation: ''
			},
			{validator: this.checkPasswords})
		});
	}

	checkPasswords(group: FormGroup) {
		const password = <FormControl>group.get('password');
		const confirmPassword = <FormControl>group.get('passwordConfirmation');

		return password.value === confirmPassword.value ? null : { 'mismatch': true };
	}

	onSubmit() {
	}

	get userId() { return this.registrationForm.get('userId'); }
	get email() { return this.registrationForm.get('email'); }
	get name() { return this.registrationForm.get('name'); }
	get passwords() { return this.registrationForm.get('passwords'); }
	get password() { return this.passwords.get('password'); }
	get passwordConfirmation() { return this.passwords.get('passwordConfirmation'); }
}
