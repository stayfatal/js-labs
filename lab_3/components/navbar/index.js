export class NavbarComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data) {
        this.parent.innerHTML = `
      <div class="navbar d-flex justify-content-between align-items-center">
        <div class="navbar-left">
          <img src="${data.leftLinks[0].icon}" alt="Postman" width="32" height="32">
          ${data.leftLinks
                        .map(
                            link =>
                                `<a href="${link.href}" class="navbar-link">${link.label}</a>`
                        )
                        .join('')}
        </div>
        <div class="navbar-right">
          <div class="btn-group" role="group">
            ${data.rightButtons
                            .map(
                                button =>
                                    `<button type="button" class="btn btn-${
                                        button.type === 'primary' ? 'primary' : 'outline-primary'
                                    }">${button.label}</button>`
                            )
                            .join('')}
          </div>
        </div>
      </div>
    `;
    }
}