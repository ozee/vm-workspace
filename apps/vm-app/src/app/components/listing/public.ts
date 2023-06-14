import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TailwindElement } from '../../mixins/tailwind';
import type { Listing } from '../../types/listing';
import style from './listing.css?inline';

@customElement('vm-listing-public-view')
export class VmListingPublicView extends TailwindElement(style) {
  @property() listing: any = {};

  connectedCallback(): void {
    super.connectedCallback();

    if (this.listing && !this.listing.id) {
      const userId = window.location.pathname.split('/')[2];
      const id = window.location.pathname.split('/')[3];

      fetch(`/api/user/${userId}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json()).then((data) => {
        this.listing = data as Listing;
        this.requestUpdate();
      });
    }
  }

  render() {
    return html`
      <header class="flex bg-blue-500 text-white h-64 text-6xl font-bold justify-center items-center">
        <h1>Property Listing</h1>
      </header>
      <div class="w-1/3 mx-auto mt-8 prose max-w-7xl lg:prose-xl prose-img:rounded-xl prose-headings:underline prose-stone">
        <dd>
          <dl>Name: ${this.listing.listingName}</dl>
          <dl>Floor Count: ${this.listing.listingFloorCount}</dl>
          <dl>Description: ${this.listing.listingDescription ? this.listing?.listingDescription : 'N/A' }</dl>
          <dl>Address: ${this.listing.address}</dl>
          <dl>City: ${this.listing.city}</dl>
          <dl>State: ${this.listing.state}</dl>
          <dl>Zip: ${this.listing.zip}</dl>
        </dd>
      </div>
    `;
  }
}
