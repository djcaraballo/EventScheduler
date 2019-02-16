export const fetchData = async (req, token) => {
  if (token) {
    try {
      const url = 'http://localhost:8000/api'
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + " " + token
        }
      });
      const result = await response.json()
      return result
    } catch (err) {
      console.log(err)
    }
  } else {
    try {
      const url = 'http://localhost:8000/api'
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json()
      return result
    } catch (err) {
      console.log(err)
    }
  }
}
