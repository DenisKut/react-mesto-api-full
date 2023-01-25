class Api {
  constructor({link, headers}) {
    this._link = link;
    this._headers = headers;
  }

  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers,
    }
  }

  getInitialCards() {
    return fetch(`${this._link}/cards`, {
      method: 'GET',
      headers: this._getHeaders()
    })
      .then(this.checkErrors);
  }

  getUserInfo() {
    return fetch(`${this._link}/users/me`, {
      method: 'GET',
      headers: this._getHeaders()
    })
      .then(this.checkErrors);
  }

  setUserInfo(data) {
    return fetch(`${this._link}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then(this.checkErrors)
  }

  setAvatar(data) {
    console.log(data)
    return fetch(`${this._link}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this.checkErrors)
  }

  addCard(data) {
    return fetch(`${this._link}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this.checkErrors);
  }

  deleteCard(data) {
    return fetch(`${this._link}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    })
      .then(this.checkErrors);
  }

  addLike(data) {
    return fetch(`${this._link}/cards/${data._id}/likes`, {
      method: 'PUT',
      headers: this._getHeaders()
    })
      .then(this.checkErrors);
  }

  deleteLike(data) {
    return fetch(`${this._link}/cards/${data._id}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders()
    })
      .then(this.checkErrors);
  }

  getInitialData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._getHeaders(),
    }).then(this.checkErrors);
  };

  checkErrors(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export default new Api({
  link: 'https://mesto.nomoreparties.co/v1/cohort-51',
  headers: {
    authorization: '22bb9c92-ea2e-40eb-b13f-953212e16dcb',
    'Content-Type': 'application/json'
  }
});

// export default new Api({
//   //link: 'http://api.mesto.for.all.nomoredomains.rocks',
//   link: "http://localhost:3000",
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });
