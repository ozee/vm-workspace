import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { TailwindElement } from '../../mixins/tailwind';
import style from './login.css?inline'

type CustomFormData = FormData & {
  entries(): [string, string][];
};

@customElement('vm-login')
export class VmLogin extends TailwindElement(style) {
  @state()
  isSignup = false;

  #handleSignUp(e: Event) {
    this.isSignup = !this.isSignup;
  }

  #handleForm(e: Event) {
    e.stopPropagation();
    e.preventDefault();

    const email = this.shadowRoot?.getElementById('email') as HTMLInputElement;
    const password = this.shadowRoot?.getElementById('password') as HTMLInputElement;

    const formData = new FormData() as CustomFormData;
    formData.append('email', email.value);
    formData.append('password', password.value);

    const data = Object.fromEntries(formData.entries());

    fetch(`/api/auth/${this.isSignup ? 'sign-up' : 'sign-in'}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      localStorage.setItem('token', data.token);
      location.href = '/';
    }).catch(err => {
      console.error(err);
    });
  }

  render() {
    return html`
      <header class="flex bg-blue-500 text-white h-64 text-6xl font-bold justify-center items-center">
        <h1>${this.isSignup ? 'Register' : 'Login'}</h1>
      </header>
      <div class="w-80 mx-auto mt-8 p-8 shadow-lg rounded-lg">
        <form id="login_form" class="flex flex-col gap-4">
          <label for="login_name">Email</label>
          <input class="form-input" type="text" name="email" id="email" />
          <label for="login_pass">Password</label>
          <input class="form-input" type="password" name="password" id="password" />
          <button class="bg-blue-600 text-white p-2" type="submit" @click=${this.#handleForm}>${this.isSignup ? 'Sign Up' : 'Login'}</button>
        </form>
        <span class="flex justify-center py-2">or</span>
        <button class="w-full bg-blue-300 text-white p-2" @click=${this.#handleSignUp}>${this.isSignup ? 'Already Registered?' : 'Register'}</button>
      </div>
        `;
  }
}
