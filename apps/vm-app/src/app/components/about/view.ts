import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TailwindElement } from '../../mixins/tailwind';
import style from './about.css?inline';

@customElement('vm-about')
export class VmAbout extends TailwindElement(style) {
  render() {
    return html`
      <header class="flex bg-blue-500 text-white h-64 text-6xl font-bold justify-center items-center">
        <h1>About</h1>
      </header>
      <div class="container mx-auto pt-8 prose lg:prose-xl">
        <article>
          <h2>sed sint repudiandae</h2>
          <p>Eaque labore sequi numquam dolores. Illo sit assumenda reprehenderit ut voluptatum voluptas necessitatibus. Accusamus nesciunt sit qui. Aut voluptatem officia provident cumque eveniet provident.</p>
          <p>Placeat aut nobis et tenetur aut odit repudiandae quia. Esse repellat voluptates nostrum corporis voluptatem non voluptatem ratione. Vel est veniam eum suscipit veritatis. Tempore sunt nulla amet et temporibus recusandae modi corrupti.</p>
          <p>Voluptas est ut magnam reiciendis sit assumenda sed sint voluptas. Dolores et et repudiandae dolores autem tenetur nemo molestias iusto. Repellendus facilis non sequi qui. Nostrum corporis reprehenderit quos et. Temporibus aut hic odio eligendi.</p>
        </article>
      </div>
    `;
  }
}
