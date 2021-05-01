// import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = `http://localhost:5000/api` + path;
    console.log(url);
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

      options.headers[`Authorization`] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  // Calls GET user function in the API
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  // Calls POST user function in the API
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  // Calls DELETE course function in the API
  async deleteCourse(emailAddress, password, courseId) {
    const response = await this.api(`/courses/` + courseId, 'DELETE', null, true, { emailAddress, password });
    return response;
  }

  // Calls POST course function in the API
  async createCourse(course, emailAddress, password) {
    const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });

    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  // Calls PUT course function in the API
  async updateCourse(course, emailAddress, password) {
    const response = await this.api('/courses/' + course.id, 'PUT', course, true, { emailAddress, password });
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}