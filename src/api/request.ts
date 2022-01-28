export async function postRequest(url: string, data: any) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const dat = await response.json();
    return dat;
  } catch (e) {
    /* handle error */
    console.error('Utility::postRequest ', e);
    return null;
  }
}

export async function getRequest(url: any) {
  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    const data = await response.json();
    return data;
  } catch (e) {
    /* handle error */
    console.error('Utility::getRequest ', e);
    return null;
  }
}
