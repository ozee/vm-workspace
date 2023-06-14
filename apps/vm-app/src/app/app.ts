import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './components/about/view';
import './components/login/view';
import './components/listing/create';
import './components/listing/list';
import './components/listing/view';
import './components/listing/public';
import { TailwindElement } from './mixins/tailwind';
import style from './app.css?inline'

@customElement('vm-app')
export class VmApp extends TailwindElement(style) {
  @state()
  private isAuthenticated = false;

  @property({ attribute: false })
  name!: string;

  connectedCallback() {
    super.connectedCallback();

    fetch('/api/auth/user', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` ?? '',
      },
    }).then((response) => response.json()).then((data) => {
      this.isAuthenticated = data?.message === 'Unauthorized' ? false : true;
      if (this.isAuthenticated) {
        this.name = data.email;
      }
      this.requestUpdate();
    });
  }

  render() {
    return html`
      <main class="block font-sans">
        <nav class="h-14 gap-4 px-4 shadow-lg flex items-center justify-end">
          <a href="/" class="text-blue-500 hover:text-blue-700">Home</a>
          ${this.isAuthenticated ? html`<a href="/listings" class="text-blue-500 hover:text-blue-700">Listings</a>` : html``}
          ${this.isAuthenticated ? html`Welcome ${this.name}` : html`<a href="/login" class="text-blue-500 hover:text-blue-700">Login</a>`}
        </nav>
        <slot></slot>
      </main>
    `;
  }
}
