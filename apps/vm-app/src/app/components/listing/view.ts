import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { TailwindElement } from '../../mixins/tailwind';
import type { Listing } from '../../types/listing';
import style from './listing.css?inline';

@customElement('vm-listing-view')
export class VmListingView extends TailwindElement(style) {
  @property() listing: any = {};

  @state()
  private isAuthenticated = false;

  connectedCallback(): void {
    super.connectedCallback();

    if (!localStorage.getItem('token')) {
      location.href = '/login';
    } else {
      fetch('/api/auth/user', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` ?? '',
        },
      }).then((response) => response.json()).then((data) => {
        this.isAuthenticated = data?.message === 'Unauthorized' ? false : true;
        if (!this.isAuthenticated) {
          location.href = '/login';
        }

        if (this.listing && !this.listing.id) {
          const id = window.location.pathname.split('/')[2];
          fetch(`/api/listing/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}` ?? '',
            },
          }).then((response) => response.json()).then((data) => {
            this.listing = data as Listing;
            this.requestUpdate();
          });
        }
      });
    }
  }

  render() {
    return html`
      ${this.isAuthenticated ? html`
      <div class="mt-8 prose max-w-7xl lg:prose-xl prose-img:rounded-xl prose-headings:underline prose-stone">
        <dd>
          <dl>Name: ${this.listing.listingName}</dl>
          <dl>Floor Count: ${this.listing.listingFloorCount}</dl>
          <dl>Description: ${this.listing.listingDescription ? this.listing?.listingDescription : 'N/A' }</dl>
          <dl>Address: ${this.listing.address}</dl>
          <dl>City: ${this.listing.city}</dl>
          <dl>State: ${this.listing.state}</dl>
          <dl>Zip: ${this.listing.zip}</dl>
        </dd>
        <a href="/listings/${this.listing.userId}/${this.listing.id}" class="text-blue-500 hover:text-blue-800">Open a public link</a>
      </div>` : html``}
    `;
  }
}
