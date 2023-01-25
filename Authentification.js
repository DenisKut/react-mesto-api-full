// const authUrl = "http://localhost:3000"

const authUrl = "https://auth.nomoreparties.co"

//const authUrl = "http://api.mesto.for.all.nomoredomains.rocks"
class Authentification{
  constructor({link, headers}) {
    this._link = link;
    this._headers = headers;
  }

  checkErrors(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(email, password) {
    return fetch(`${this._link}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
    .then(this.checkErrors)
  }

  login(email, password) {
    const res = fetch(`${this._link}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    });
    return this.checkErrors(res);
  }

  checkToken(jwt) {
    return fetch(`${this._link}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${jwt}`
      }
    })
    .then(this.checkErrors)
  }
}

export default new Authentification({
  link: authUrl,
  headers: { "Content-Type": "application/json" }
});
