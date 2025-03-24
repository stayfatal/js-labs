export class HeroSectionComponent {
  constructor(parent) {
      this.parent = parent;
  }

  render(data) {
      this.parent.innerHTML = `
    <section class="hero-section">
      <div class="container mt-5">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="text-content">
              <h1>${data.title}</h1>
              <p>${data.description}</p>
              <form class="email-form">
                <div class="form-group d-flex align-items-center">
                  <input type="email" placeholder="${data.emailFormPlaceholder}" required>
                  <button type="submit">Sign Up for Free</button>
                </div>
              </form>
              <div class="download-links">
                ${data.downloadLinks
                      .map(
                          link =>
                              `<div><img src="${link.icon}" alt="${link.label}">${link.label}</div>`
                      )
                      .join('')}
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="image-content">
              <img src="${
                                  data.downloadLinks[1].icon
                              }" alt="Postman API blocks. Illustration." loading="eager">
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  }
}