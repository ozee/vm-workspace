import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { TailwindElement } from '../../mixins/tailwind';
import { Listing } from '../../types/listing';
import style from './listing.css?inline';
import './view';

@customElement('vm-listing-list')
export class VmListingList extends TailwindElement(style) {
  @state()
  private listings: Listing[] = [];

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

        fetch('/api/listing', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` ?? '',
          }
        })
        .then((response) => response.json())
        .then((data) => {
          this.listings = data;
          this.requestUpdate();
        });
      });
    }
  }

  render() {
    return html`
      ${this.isAuthenticated ? html`
      <header class="flex bg-blue-500 text-white h-64 text-6xl font-bold justify-center items-center">
        <h1>Property Listings</h1>
      </header>
      <div class="container mx-auto mt-8">
        <ul class="grid grid-cols-4 list-none">
          ${this.listings.length > 0 ?
            this.listings?.map((listing: Listing) => html`
            <li class="p-8 shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 rounded-lg">
              <vm-listing-view .listing=${listing} canedit="false"></vm-listing-view>
              <a href="/listings/${listing.id}" class="mt-4 justify-center flex bg-blue-600 p-2 text-white">View Listing</a>
            </li>
          `) : html`<li>No listings found.</li>`}
        </ul>
        <a href="/listings/create" class="mt-4 inline-flex bg-blue-600 p-2 text-white">Create New Listing</a>
      </div>`: html``}
    `;
  }
}
