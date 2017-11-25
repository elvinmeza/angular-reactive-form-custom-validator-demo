import { ValidatorFn, FormControl, AbstractControl } from '@angular/forms';

export function checkPasswords(): ValidatorFn {
	return (control: AbstractControl): {[key: string]: any} => {
		const password = <FormControl>control.get('password');
		const passwordConfirmation = <FormControl>control.get('passwordConfirmation');

		return password.value === passwordConfirmation.value ? null : { 'mismatch': true };
	};
}
