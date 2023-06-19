import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { TailwindElement } from '../../mixins/tailwind';
import style from './listing.css?inline';

type CustomFormData = FormData & {
  entries(): [string, string][];
};

@customElement('vm-listing-create')
export class VmListingCreate extends TailwindElement(style) {
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
      });
    }
  }

  #handleForm(e: Event) {
    e.stopPropagation();
    e.preventDefault();

    const listingName = this.shadowRoot?.getElementById('listingName') as HTMLInputElement;
    const listingFloorCount = this.shadowRoot?.getElementById('listingFloorCount') as HTMLInputElement;
    const listingDescription = this.shadowRoot?.getElementById('listingDescription') as HTMLInputElement;
    const address = this.shadowRoot?.getElementById('address') as HTMLInputElement;
    const city = this.shadowRoot?.getElementById('city') as HTMLInputElement;
    const state = this.shadowRoot?.getElementById('state') as HTMLInputElement;
    const zip = this.shadowRoot?.getElementById('zip') as HTMLInputElement;

    const formData = new FormData() as CustomFormData;
    formData.append('listingName', listingName.value);
    formData.append('listingFloorCount', listingFloorCount.value);
    formData.append('listingDescription', listingDescription.value);
    formData.append('address', address.value);
    formData.append('city', city.value);
    formData.append('state', state.value);
    formData.append('zip', zip.value);

    const data = Object.fromEntries(formData.entries());

    fetch(`/api/listing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` ?? '',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json()).then((data) => {
      this.requestUpdate();
      location.href = `/listing/${data.id}`;
    });
  }

  render() {
    return html`
      ${this.isAuthenticated ? html`
      <header class="flex bg-blue-500 text-white h-64 text-6xl font-bold justify-center items-center">
        <h1>Create Listing</h1>
      </header>
      <div class="w-1/3 mx-auto mt-8 p-8 shadow-lg rounded-lg">
        <form id="create_listing_form" class="grid grid-cols-2 gap-3">
          <div>
          <label for="listing_name">Name</label>
          <input class="form-input" type="text" name="listingName" id="listingName" />
          </div>
          <div>
          <label for="listing_name">Floor Count</label>
          <input class="form-input" type="text" name="listingFloorCount" id="listingFloorCount" />
          </div>
          <div class="col-span-2 grid grid-cols-1">
          <label for="listing_name">Description</label>
          <textarea class="form-input" type="text" name="listingDescription" id="listingDescription"></textarea>
          </div>
          <div>
          <label for="listing_name">Address</label>
          <input class="form-input" type="text" name="address" id="address" />
          </div>
          <div>
          <label for="listing_name">City</label>
          <input class="form-input" type="text" name="city" id="city" />
          </div>
          <div>
          <label for="listing_name">State</label>
          <input class="form-input" type="text" name="state" id="state" />
          </div>
          <div>
          <label for="listing_name">Zip</label>
          <input class="form-input" type="text" name="zip" id="zip" />
          </div>
          <button class="col-span-2 bg-blue-600 text-white p-2" type="submit" @click=${this.#handleForm}>Create</button>
        </form>
      </div>
    ` : html``}`;
  }
}
